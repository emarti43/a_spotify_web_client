import React from 'react';
import Track from './Track';
import './PlaylistDetails.css';

function PlaylistDetails({playlist}) {
  if (playlist === undefined) return (
    <div className="details-container" >
      <div className="details-header">
        <div className="Playlist-description" style={{float: 'none'}}>
          <h3> Playlists will appear here</h3>
        </div>
      </div>
    </div>
  );
  var tracks = playlist.tracks.items.map((item, index) => <Track track={item.track} key={index} withImage={false}/> );
  return(
  <React.Fragment>
    <div className="details-container" >
      <div className="details-header">
        <div className="details-image-container">
          <img className="details-image" src={playlist.images[0].url || "null"} alt={`playlist for ${playlist.name}`}/>
        </div>
        <div className="Playlist-description" style={{float: 'none'}}>
          <h3> {playlist.name} </h3>
          {`${playlist.tracks.total} Tracks`}
        </div>
      </div>
      <div className="tracklist-container"> {tracks ? tracks : ''} </div>
    </div>
  </React.Fragment>
  );
}
export default PlaylistDetails;
