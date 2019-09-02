import React from 'react';
import './UserPlaylists.css'

export default class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.loadInformation = this.loadInformation.bind(this);
  }

  loadInformation(event) {
    event.preventDefault(event);
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
      }
    }
  }

  render() {
    let playlists = this.props.userPlaylists.map((playlist) =>
    <React.Fragment>
      <div className="Playlist-container container">
        <div className="Playlist-image-container">
          <img className="Playlist-image" src={playlist.images[0].url || "null"} alt={`playlist for ${playlist.name}`}/>
        </div>
        <div className="Playlist-content">
          <h5> {playlist.name}</h5>
        </div>
      </div>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </React.Fragment>
    );
    return(
      <div className="Playlists-container">
      {playlists}
      </div>
    );
  }
}
