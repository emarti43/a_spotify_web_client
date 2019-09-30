import React, { useState } from 'react';
import './MusicPlayer.css';
import playButton from './play-button.png';
import prevButton from './prev-button.png';
import pauseButton from './pause-button.png';
import skipButton from './skip-button.png';
function MusicPlayer(props) {
  const [isPlaying, setPlayState] = useState(false);
  const renderAction = (image, alt, clickAction) => <button className='action-button' onClick={clickAction} ><img src={image} alt={alt}/></button>
  const toggleState = e => setPlayState(!isPlaying)
  return(
    <div className='music-player'>
      <div className='player-actions'>
        {renderAction(prevButton, 'skip to previous')}
        { isPlaying ?
          renderAction(pauseButton, 'pause', toggleState)
          :
          renderAction(playButton, 'play', toggleState)
        }
        {renderAction(skipButton, 'skip')}
      </div>
    </div>
  );
}
export default MusicPlayer;
