const axios = require('axios');

function genericRequest(method, endpoint, access_token) {
  let params = {
    headers: {'Authorization': 'Bearer ' + access_token},
    json: true,
    method: method,
    url: 'https://api.spotify.com/v1' + endpoint,
  }
  return axios(params)
}

export default genericRequest;
