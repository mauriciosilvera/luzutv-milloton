import axios from 'axios';
import { auth } from './auth';

export const Login = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/public/login', data)
    .then((response) => response)
    .catch((error) => error);

export const pollPost = (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  return axios
    .post('https://luzutv-api.herokuapp.com/admin/poll', data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const allPollsPost = () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  return axios
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
};

export const getActivePoll = () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  axios
    .get('https://luzutv-api.herokuapp.com/public/polls', config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const deletePoll = (pollId) => {
  const token = auth.getData();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: [
      {
        question: {
          id: pollId
        }
      }
    ]
  };

  return axios
    .delete('https://luzutv-api.herokuapp.com/admin/poll', config)
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });
};

export const getPollById = (pollId) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  return axios
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
};
