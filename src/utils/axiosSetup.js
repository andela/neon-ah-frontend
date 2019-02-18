import axios from 'axios';

const makeRequest = (url, options = { method: 'GET' }) => {
  return axios({
    baseURL: 'https://neon-ah-staging.herokuapp.com/api/v1',
    url,
    method: options.method,
    data: options.body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  }).then(response => response.data);
};

export default makeRequest;
