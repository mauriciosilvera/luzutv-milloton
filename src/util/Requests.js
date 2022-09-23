import axios from 'axios';

const token = '6329e5cc5c8fe25c8095bc6b';
const config = {
  headers: { token }
};

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

export const deletePoll = () =>
  axios
    .delete(
      'https://luzutv-api.herokuapp.com/admin/poll',
      [
        {
          question: {
            id: '632cdeb2fc19dfb206f8fa58'
          }
        }
      ],
      config
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const getPollById = (pollId) =>
  axios
    .post('https://luzutv-api.herokuapp.com/admin/poll/id', {
      question_id: pollId
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
