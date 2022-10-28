import axios from 'axios';
import { auth } from './auth';

export const Login = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/public/login`, data)
    .then((response) => response)
    .catch((error) => error);

export const pollPost = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/poll`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const pollPut = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/poll`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const pollPostExtraOption = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/poll/answer`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const allPollsPost = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/polls`,
      {
        filters: {}
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActivePoll = async (ip) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/public/active-polls`,
      {
        ip_address: ip
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const adminActivePoll = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/active-polls`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGroups = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/groups`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePoll = async (reqData) => {
  const token = auth.getData();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: reqData
  };

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/admin/poll`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOption = async (optionId) => {
  const token = auth.getData();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: [
      {
        answers: {
          id: optionId
        }
      }
    ]
  };

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/admin/poll`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPollById = async (pollId) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/poll/id`,
      {
        question_id: pollId
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const vote = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/public/vote`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const calculateVotes = async (questions) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/calculate-votes`,
      questions,
      config
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (body) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/upload-images`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const allPollsPostWithoutGroups = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/all-polls`,
      {
        filters: {}
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getImages = async (image) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/public/get-image/${image}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getIPAddress = async () => {
  try {
    const response = await axios.get(`https://geolocation-db.com/json/`);
    return response.data.IPv4;
  } catch (error) {
    console.error(error);
  }
};
