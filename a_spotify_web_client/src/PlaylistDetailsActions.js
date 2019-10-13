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
export const popPlaylist = (state, dispatch) => {
  try {
    dispatch({ type: 'POP' })
  } catch(error) {
    dispatch(state, error);
  };
}

export const pushPlaylist = async (state, dispatch) => {
  let playlist = await getDetails(state.playlist.id);
  try {
    dispatch({ type: 'PUSH', data: playlist.data });
  } catch(error) {
    dispatch(state, error);
  }
}
