import axios from 'axios';
import {
  setAsyncStorage,
  getAsyncStorage,
  clearAsyncStorage,
} from '../../asyncStorage';
const baseURL = 'http://localhost:3000/';

export const AddPost = (UserId, title, thumbnail_url, caption) => {
  return axios({
    method: 'POST',
    url: baseURL,
    headers: getAsyncStorage('token'),
    data: {
      UserId,
      title,
      thumbnail_url,
      caption,
    },
  });
};

export const DeletePost = (PostId) => {
  return axios({
    method: 'DELETE',
    url: baseURL + `${PostId}`,
    headers: getAsyncStorage('token'),
  });
};
