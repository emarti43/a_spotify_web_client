import React from 'react';
import './UserPlaylists.css';

export default class UserPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTracks: false
    };
  }
  render() {
    return (
    <React.Fragment>
      <div className="Playlist-container" >
        <div className="playlist-header" onClick={() => this.props.renderDetails(this.props.playlist.id)}>
          <div className="Playlist-image-container">
            <img className="Playlist-image" src={this.props.playlist.images[0].url || "null"} alt={`playlist for ${this.props.playlist.name}`}/>
          </div>
          <div className="Playlist-description">
            <h4> {this.props.playlist.name} </h4>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}
