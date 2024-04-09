import axios from 'axios';

export const sendMessage = async (message, name) => {
  try {
    const request = `http://127.0.0.1:5000/communicate?message=${message}&name=${name}`;
    const response = await axios.get(request);
    return response.data;
  } catch (e) {
    console.error('Err in sendMessage ', e);
  }
};
