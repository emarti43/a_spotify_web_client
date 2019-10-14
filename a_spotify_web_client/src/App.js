import React, {useState, useEffect, useReducer} from 'react';
import logo from './spotify-icon.png';
import './App.css';
import UserProfile from './UserProfile';
import UserPlaylists from './UserPlaylists';
import loadingIcon from './loading-icon.svg';
import MusicPlayer from './MusicPlayer';
import PlaylistDetails from './PlaylistDetails';
import PlaylistDetailsContext from './PlaylistDetailsContext';
import PlaylistDetailsReducer from './PlaylistDetailsReducer';
const axios = require('axios');

export default function App() {

  const [userInfo, setUserInfo] = useState();
  const [userPlaylists, setPlaylists] = useState();
  let initialUserState = PlaylistDetailsContext;
  let [state, dispatch] = useReducer(PlaylistDetailsReducer, initialUserState);

  const fetchUserInformation = () =>  {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
      }
      axios(params)
      .then( response => {
        setUserInfo(response.data);
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  const fetchUserPlaylists = () => {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists',
      }
      axios(params)
      .then( response => {
        setPlaylists(response.data.items)
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    fetchUserInformation();
    fetchUserPlaylists();
  }, [])

  function LoginContent(props) {
    return(
      <div className="center-text">
        <h2 className="login-content">
          Please Login <a className="login-button" href="/login"> Here</a>
        </h2>
      </div>
    );
  }
  let content =
  <div>
    {userInfo ? <UserProfile userInfo={userInfo}/> : <LoginContent/>}
    {userPlaylists ? <UserPlaylists userPlaylists={userPlaylists} /> : userInfo ? <img src={loadingIcon} alt='loading Icon'/> : ''}
  </div>;
  return (
    <PlaylistDetailsContext.Provider value={{state, dispatch}}>
      <div className="App">
        <div className={userInfo ? "main-body": 'main-login'}>
          {content}
        </div>
        {userInfo ?
        <React.Fragment>
          <MusicPlayer/>
          <PlaylistDetails/>
        </React.Fragment>

        : ''}
      </div>
    </PlaylistDetailsContext.Provider>
  );
}
