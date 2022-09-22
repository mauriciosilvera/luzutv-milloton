import axios from 'axios';

export const pollPost = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/admin/poll', data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

export const Polltest = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/admin/poll', data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
