import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './UserProfile';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.authorizeSignIn = this.authorizeSignIn.bind(this);
  }

  authorizeSignIn() {
  }

  render () {
    let userInfo = {
      username: "Edgar Martinez",
      email: "emarti43@ucsc.edu",
      link: "https://open.spotify.com/user/1268639461?si=5e_U90HbTReAD6JzTELnng",
      profileImage: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <UserProfile userInfo={userInfo}/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="http://edgar-marti.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </header>
      </div>
    );
  }
}
