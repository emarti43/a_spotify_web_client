import React, { useState, useEffect } from 'react';
import './MusicPlayer.css';
import genericRequest from './ApiRequests';
import playButton from './play-button.png';
import prevButton from './prev-button.png';
import pauseButton from './pause-button.png';
import skipButton from './skip-button.png';
function MusicPlayer(props) {
  const [isPlaying, setPlayState] = useState(false);
  const renderAction = (image, alt, clickAction) => <button className='action-button' onClick={clickAction} ><img src={image} alt={alt}/></button>;
  const urlParams = new URLSearchParams(window.location.search);
  const [currentlyPlaying, setPlayingState] = useState();
  const getPlayingState = () => {
    genericRequest('get', '/me/player/currently-playing', urlParams.get('access_token')).then(response => {
      setPlayingState(response.data.item);
    }).catch( error => console.log(error));
  }

  useEffect( () => {
    genericRequest('get', '/me/player/currently-playing', urlParams.get('access_token')).then(response => {
      setPlayingState(response.data.item);
    }).catch( error => console.log(error));
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

  const skipTrack = () => {
    const urlParams = new URLSearchParams(window.location.search);
    genericRequest('post', '/me/player/next', urlParams.get('access_token')).then( response => {
      getPlayingState();
    }).catch( error => console.log(error));
  }

  const prevTrack = () => {
    const urlParams = new URLSearchParams(window.location.search);
    genericRequest('post', '/me/player/previous', urlParams.get('access_token')).then( response => {
      getPlayingState();
    }).catch( error => console.log(error));

  }

  return(
    <div className='music-player'>
      <div className='currently-playing'>
       {currentlyPlaying ?
         <React.Fragment>
           <img src={currentlyPlaying.album.images[0].url} className='player-image'/>
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
    </div>
  );
}
export default MusicPlayer;
