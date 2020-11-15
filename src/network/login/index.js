import axios from 'axios';
const baseURL = 'http://localhost:3000/login';

const loginRequest = (email, password) => {
  return axios({
    method: 'POST',
    url: baseURL,
    data: {
      email,
      password,
    },
  });
};

export default loginRequest;
