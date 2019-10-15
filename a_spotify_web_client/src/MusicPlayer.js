import React, { useState, useEffect, useContext } from 'react';
import './MusicPlayer.css';
import genericRequest from './ApiRequests';
import playButton from './play-button.png';
import prevButton from './prev-button.png';
import pauseButton from './pause-button.png';
import skipButton from './skip-button.png';
import { default as UserContext } from './Contexts/UserContext';
import { setCurrentlyPlaying } from './Contexts/UserActions';
function MusicPlayer(props) {
  const { state, dispatch } = useContext(UserContext);
  const [isPlaying, setPlayState] = useState(state.currentlyPlaying === undefined ? true : false);
  const [devices, setDevices] = useState(undefined); // might use this later to display devices
  const [currentDevice, setCurrentDevice] = useState(undefined);
  const currentlyPlaying = state.currentlyPlaying;

  const urlParams = new URLSearchParams(window.location.search);


  const renderAction = (image, alt, clickAction) => <button className='action-button' onClick={clickAction} ><img src={image} alt={alt}/></button>;


  useEffect( () => {
    setCurrentlyPlaying(dispatch);
    genericRequest('get', '/me/player/devices', urlParams.get('access_token')).then(response => {
      setDevices(response.data.devices);
      setCurrentDevice(response.data.devices.filter( e => e.is_active)[0]);
    });
  }, []);

  const toggleState = e =>  {
    const urlParams = new URLSearchParams(window.location.search);
    if (isPlaying) {
      genericRequest('put', '/me/player/play', urlParams.get('access_token')).then( response => {
        console.log(response);
      }).catch( error => console.log(error));
    } else {
      genericRequest('put', '/me/player/pause').then()
    }
    setPlayState(!isPlaying);
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

  return(
    <div className='music-player'>
      <div className='currently-playing'>
       {currentlyPlaying ?
         <React.Fragment>
           <div className='currently-playing-image'>
           <img src={currentlyPlaying.album.images[0].url} alt='currently playing'className='player-image'/>
           </div>
           <div className='currently-playing-info'>
             <div><b>{currentlyPlaying.name}</b></div>
             <div><span>{currentlyPlaying.artists[0].name}</span></div>
           </div>
         </React.Fragment>
         : ''}
      </div>
      <div className='player-actions'>
        {renderAction(prevButton, 'skip to previous', prevTrack)}
        { isPlaying ?
          renderAction(pauseButton, 'pause', toggleState)
          :
          renderAction(playButton, 'play', toggleState)
        }
        {renderAction(skipButton, 'skip', skipTrack)}
      </div>
      <div className='current-device'>
        { currentDevice ? <span>Playing on <b>{currentDevice.name}</b></span>: '' }
      </div>
    </div>
  );
}
export default MusicPlayer;
