import axios from 'axios';

export const sendMessage = async (message) => {
  try {
    const request = `http://127.0.0.1:5000/api/userMessage?message=${message}`;
    print(request);
    const response = await axios.get(request);
    console.log('connected to api');
    console.log(response.data);
  } catch (e) {
    console.error('Err in sendMessage ', e);
  }
};
