import React from 'react';
import './UserProfile.css'

export default class UserProfile extends React.Component {
  render() {
    return(
      <div className="UserProfile-container">
        <img src={this.props.userInfo.images[0].url} className="UserProfile-image" alt="A profile"/>
        <h4>
          {this.props.userInfo.display_name} : {this.props.userInfo.email}
        </h4>
        <a href={this.props.userInfo.external_urls.spotify}>
          Link to Profile
        </a>
      </div>
    );
  }
}
