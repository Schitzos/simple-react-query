import axios from 'axios';

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