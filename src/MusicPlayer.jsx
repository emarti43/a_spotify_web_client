import React, { useEffect, useContext } from 'react';
import './MusicPlayer.css';
import genericRequest from './ApiRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faRedo} from '@fortawesome/free-solid-svg-icons';

import { default as UserContext } from './Contexts/UserContext';
import { setCurrentlyPlaying } from './Contexts/UserActions';
import DeviceList from './DeviceList';
function MusicPlayer(props) {
  const { state, dispatch } = useContext(UserContext);
  const currentlyPlaying = state.currentlyPlaying ? state.currentlyPlaying.item : undefined;
  const urlParams = new URLSearchParams(window.location.search);

  useEffect( () => {
    setCurrentlyPlaying(dispatch);
  }, []);

  const renderAction = (icon, clickAction, actionType) =>
  <button className='action-button' onClick={() => clickAction(actionType)} ><FontAwesomeIcon color="white" size="lg"icon={icon}></FontAwesomeIcon></button>;

  const togglePlayState = async () =>  {
    let endpoint = '/me/player/play';
    if (state.currentlyPlaying.is_playing) endpoint = '/me/player/pause';
    try {
      await genericRequest('put', endpoint, urlParams.get('access_token'))
    } catch (error) {
      console.log(error);
    }
    setCurrentlyPlaying(dispatch);
  }

  const changeTrack = async (action) => {
    await genericRequest('post', '/me/player/' + action, urlParams.get('access_token'));
    setCurrentlyPlaying(dispatch);
  }

  const toggleRepeat = async () => {
    await genericRequest('post', '/me/player/repeat', urlParams.get('access_token'));
    setCurrentlyPlaying(dispatch);
  }

  const PlayerActions = ({isPlaying}) => {
    const playAction = isPlaying ? renderAction(faPause, togglePlayState) : renderAction(faPlay, togglePlayState);
    return <div className='player-actions'>
      {renderAction(faRedo, toggleRepeat)}
      {renderAction(faStepBackward, changeTrack, 'previous')}
      {playAction}
      {renderAction(faStepForward, changeTrack, 'next')}
      
    </div>
  }

  return(
    <div className='music-player'>
      <div className='currently-playing'>
       {currentlyPlaying ?
         <React.Fragment>
           <div className='currently-playing-image'>
             <img src={currentlyPlaying.album.images[0].url} alt='currently playing'className='player-image'/>
           </div>
           <div className='currently-playing-info'>
             <div className='currently-playing-track'>{currentlyPlaying.name}</div>
             <div className='currently-playing-artist'> {currentlyPlaying.artists[0].name}</div>
           </div>
         </React.Fragment>
         : ''}
      </div>
        <PlayerActions isPlaying={state.currentlyPlaying && state.currentlyPlaying.is_playing}/>
        <DeviceList/>
    </div>
  );
}
export default MusicPlayer;
