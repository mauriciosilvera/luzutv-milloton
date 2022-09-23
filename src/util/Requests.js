import axios from 'axios';

const token = '6329e5cc5c8fe25c8095bc6b';
const config = {
  headers: { token }
};

export const Login = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/public/login', data, config)
    .then((response) => response)
    .catch((error) => error);

export const pollPost = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/admin/poll', data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

export const allPollsPost = () =>
  axios
    .post(
      'https://luzutv-api.herokuapp.com/admin/polls',
      {
        filters: {}
      },
      config
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const getActivePoll = () =>
  axios
    .get('https://luzutv-api.herokuapp.com/public/polls', config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const deletePoll = (pollId) =>
  axios
    .delete('https://luzutv-api.herokuapp.com/admin/poll', {
      headers: {
        'Content-Type': 'application/json',
        token: '6329e5cc5c8fe25c8095bc6b'
      },
      data: [
        {
          question: {
            id: pollId
          }
        }
      ]
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });

export const getPollById = (pollId) =>
  axios
    .post(
      'https://luzutv-api.herokuapp.com/admin/poll/id',
      {
        question_id: pollId
      },
      config
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
