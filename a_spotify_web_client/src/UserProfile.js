import React from 'react';
import './UserProfile.css'

export default class UserProfile extends React.Component {
  render() {
    return(
      <div className="UserProfile-container">
        <img src={this.props.userInfo.profileImage} className="UserProfile-image" alt="A profile"/>
        <h4>
          {this.props.userInfo.username} : {this.props.userInfo.email}
        </h4>
        <a href={this.props.userInfo.link}>
          Link to Profile
        </a>
      </div>
    );
  }
}
