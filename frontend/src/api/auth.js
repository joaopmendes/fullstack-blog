import axios from 'axios';

export const getUserData = (token) => {
  const headers = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return axios
    .get('/api/user', headers)
    .then((res) => {
      console.log('[AUTH API] Get user info');
      return res.data.data;
    })
    .catch(() => {
      throw new Error('[Auth API] Could not get user info');
    });
};

export const registerUser = (user) => {
  const data = new FormData();
  data.append('name', user.name);
  data.append('email', user.email);
  data.append('password', user.password);
  data.append('profile_image', user.avatar);

  const headers = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios
    .post('/api/register', data, headers)
    .then((res) => {
      return {
        data: res.data,
        hasError: false,
        errorMessage: '',
      };
    })
    .catch((err) => {
      return {
        data: err.response.data,
        hasError: true,
        errorMessage: err.response.data.errorMessage || "Couldn't create user.",
      };
    });
};
