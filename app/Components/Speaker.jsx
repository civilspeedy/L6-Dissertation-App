import axios from 'axios';

const testMessages = require('../assets/json/chatTestMessages.json')[0];

export const sendMessage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/');
    console.log('connected to api');
    console.log(response.data);
  } catch (e) {
    console.error('Err in sendMessage ', e);
  }
};
