const axios = require('axios');

class RequestTemplate {
  static genericRequest(method, endpoint, data={}) {
    let config = {
      method: method,
      url: process.env.API_ROOT + endpoint,
      data: data,
    }
    return axios(config);
  }
}
export default RequestTemplate;
