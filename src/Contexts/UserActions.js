import genericRequest from '../ApiRequests';

const axios = require('axios');

const getDetails = async (id) => {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('access_token')) {
    let params = {
      headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
      json: true,
      method: 'get',
      url: 'https://api.spotify.com/v1/playlists/' + id,
    }
    return await axios(params)
  }
}

const getCurrentlyPlaying = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  return genericRequest('get', '/me/player/currently-playing', urlParams.get('access_token'))
}

export const popPlaylist = (state, dispatch) => {
  try {
    dispatch({ type: 'PLAYLIST_POP' })
  } catch(error) {
    dispatch(state, error);
  };
}

export const pushPlaylist = async (state, dispatch) => {
  let playlist = await getDetails(state.playlist.id);
  try {
    dispatch({ type: 'PLAYLIST_PUSH', data: playlist.data });
  } catch(error) {
    dispatch(state, error);
  }
}

export const setCurrentlyPlaying = async (dispatch) => {
  let currentlyPlaying = await getCurrentlyPlaying();
  try {
    dispatch({ type: 'UPDATE_TRACK', data: currentlyPlaying.data });
  } catch(error) {
    dispatch(error);
  }
}
