import React, { useContext } from 'react';
import './UserPlaylists.css';
import playButton from './play-button.png';
import genericRequest from './ApiRequests';
import UserContext from './Contexts/UserContext';
import { setCurrentlyPlaying } from './Contexts/UserActions';
function Track({track, playlist, offset}) {
  const { dispatch } = useContext(UserContext);
  const playTrack = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await genericRequest('put','/me/player/play', urlParams.get('access_token'), {
      context_uri: playlist.external_urls.spotify,
      offset: {position: offset}
    });
    setCurrentlyPlaying(dispatch);
  }
  return (
    <div className='track-container'>
      <div className='track-content'>
        <h3 className='track-title'>{track.name}</h3>
        <div className='track-artists'>
          {track.artists[0].name}
        </div>
      </div>
      <div className="play-button" onClick={() => playTrack()}>
        <img src={playButton} alt="play button"/>
      </div>
    </div>
  );
}
export default Track;
