import axios from 'axios';

export const fetchAllUser = async (page, limit) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user`,
    method: 'GET',
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
    params: { page: page, limit: limit }
  };
  const { data } = await axios(options);
  return data;
}

export const addUser = async (body) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user/create`,
    method: 'POST',
    data: body,
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
    body: body
  };
  const { data } = await axios(options);
  return data;
}

export const editUser = async (body) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user/${body.id}`,
    method: 'PUT',
    data: body,
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
    body: body
  };
  const { data } = await axios(options);
  return data;
}

export const detailUser = async (id) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user/${id}`,
    method: 'GET',
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
  };
  const { data } = await axios(options);
  return data;
}

export const deleteUser = async (id) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user/${id}`,
    method: 'DELETE',
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
  };
  const { data } = await axios(options);
  return data;
}