import axios from 'axios';

export const login = async (body) => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}user/60d0fe4f5311236168a109ca`,
    method: 'GET',
    data: body,
    headers: {
      'app-id': process.env.REACT_APP_DUMMY_API_KEY,
    },
  };
  const { data } = await axios(options);
  return data;
}