import React, { useState, useEffect, useContext } from 'react';
import './MusicPlayer.css';
import genericRequest from './ApiRequests';
import playButton from './assets/play-button.png';
import prevButton from './assets/prev-button.png';
import pauseButton from './assets/pause-button.png';
import skipButton from './assets/skip-button.png';

import { default as UserContext } from './Contexts/UserContext';
import { setCurrentlyPlaying } from './Contexts/UserActions';
import DeviceList from './DeviceList'
function MusicPlayer(props) {
  const { state, dispatch } = useContext(UserContext);
  const currentlyPlaying = state.currentlyPlaying ? state.currentlyPlaying.item : undefined;

  useEffect( () => {
    setCurrentlyPlaying(dispatch);
  }, []);

  const renderAction = (image, alt, clickAction) => <button className='action-button' onClick={clickAction} ><img src={image} alt={alt}/></button>;

  const  toggleState = async () =>  {
    const urlParams = new URLSearchParams(window.location.search);
    let endpoint = '/me/player/play';
    if (state.currentlyPlaying.is_playing) endpoint = '/me/player/pause';
    try {
      await genericRequest('put', endpoint, urlParams.get('access_token'))
    } catch (error) {
      console.log(error);
    }
    setCurrentlyPlaying(dispatch);
  }

  const skipTrack  = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await genericRequest('post', '/me/player/next', urlParams.get('access_token'));
    setCurrentlyPlaying(dispatch);
  }

  const prevTrack = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await genericRequest('post', '/me/player/previous', urlParams.get('access_token'));
    setCurrentlyPlaying(dispatch);
  }
  const PlayerActions = ({isPlaying}) => {
    const playAction = isPlaying ? renderAction(pauseButton, 'pause', toggleState) : renderAction(playButton, 'play', toggleState);
    return <div className='player-actions'>
      {renderAction(prevButton, 'skip to previous', prevTrack)}
      {playAction}
      {renderAction(skipButton, 'skip', skipTrack)}
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
             <div className='currently-playing-artist'><b>{currentlyPlaying.name}</b></div>
             <div className='currently-playing-track'> {currentlyPlaying.artists[0].name}</div>
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
