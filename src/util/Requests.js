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

export const allPollsPost = () =>
  axios
    .post('https://luzutv-api.herokuapp.com/admin/polls', {
      filters: {}
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const getActivePoll = () =>
  axios
    .get('https://luzutv-api.herokuapp.com/public/polls')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const deleteQuestion = () =>
  axios
    .delete('https://luzutv-api.herokuapp.com/admin/poll', [
      {
        question: {
          id: '632ce1c70e362a0a202d62c4'
        }
      }
    ])
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
