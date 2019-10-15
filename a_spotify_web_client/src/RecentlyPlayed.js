import React, { useState, useEffect } from 'react';
import genericRequest from './ApiRequests';
import UserPlaylist from './UserPlaylist';

function RecentlyPlayed() {
  const [browse, setBrowse ] = useState(undefined);
  useEffect(() => {
   if (browse === undefined ) {
     let urlParams = new URLSearchParams(window.location.search);
     genericRequest('get', '/browse/featured-playlists', urlParams.get('access_token')).then( response => {
       setBrowse(response.data);
     }).catch(error => {
       console.log(error)
     })
   }
  })
  const items = browse ? browse.playlists.items.map((playlist, index) => <UserPlaylist playlist={playlist} key={index} index={index}/>) : undefined;
  return (
    <div className="details-container" >
      <div className="details-header">
        <div className="Playlist-description" style={{float: 'none'}}>
          <h3>{ browse === undefined ? "Playlists will appear here" : browse.message }</h3>
        </div>
        {items}
      </div>
    </div>
  );
}
export default RecentlyPlayed;
