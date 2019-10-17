import React, { useContext } from 'react';
import Track from './Track';
import './PlaylistDetails.css';
import {default as UserContext} from './Contexts/UserContext';
import { popPlaylist } from './Contexts/UserActions';
import RecentlyPlayed from './RecentlyPlayed'
import closeIcon from './assets/close-icon.png'

function PlaylistDetails() {
  let {state, dispatch } = useContext(UserContext);

  if (state.playlists === undefined) return (<RecentlyPlayed/>);
  if (state.playlists && state.playlists.length < 1) return(<RecentlyPlayed/>);

  const currentPlaylist = state.playlists[state.playlists.length - 1];
  var tracks = currentPlaylist.tracks.items.map((item, index) => <Track track={item.track} playlist={currentPlaylist} key={index} offset={index} withImage={false}/> );
  return(
    <React.Fragment>
      <div className="details-container" >
        <span onClick={ () => popPlaylist({}, dispatch) }> <img src={closeIcon} className="icon" alt="close"/></span>
        <div className="details-header">
          <div className="details-image-container">
            <img className="details-image" src={currentPlaylist.images[0].url || "null"} alt={`playlist for ${currentPlaylist.name}`}/>
          </div>
          <div className="Playlist-description" style={{float: 'none'}}>
            <h3> {currentPlaylist.name} </h3>
            {`${currentPlaylist.tracks.total} Tracks`}
          </div>
        </div>
        <div className="tracklist-container"> {tracks ? tracks : ''} </div>
      </div>
    </React.Fragment>
  );
}
export default PlaylistDetails;
