import React, { useState, useContext } from 'react';
import Track from './Track';
import './PlaylistDetails.css';
import {default as PlaylistDetailsContext} from './PlaylistDetailsContext';
import {popPlaylist, pushPlaylist} from './PlaylistDetailsActions'

function PlaylistDetails() {
  let {state, dispatch } = useContext(PlaylistDetailsContext);

  const placeholder = <div className="details-container" >
    <div className="details-header">
      <div className="Playlist-description" style={{float: 'none'}}>
        <h3> Playlists will appear here</h3>
      </div>
    </div>
  </div>

  if (state.playlists === undefined) return (placeholder);
  if (state.playlists && state.playlists.length < 1) return(placeholder);

  const currentPlaylist = state.playlists[state.playlists.length - 1];
  console.log(currentPlaylist, state.playlists);
  var tracks = currentPlaylist.tracks.items.map((item, index) => <Track track={item.track} key={index} withImage={false}/> );
  return(
    <React.Fragment>
      <div className="details-container" >
        <span onClick={ () => popPlaylist({}, dispatch) }> x</span>
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
