import axios from 'axios';

const testMessage = 'hello to you too';

export const sendMessage = async (message, name) => {
  try {
    /*
    const request = `http://127.0.0.1:5000/communicate?message=${message}&name=${name}`;
    print(request);
    const response = await axios.get(request);
    return response.data; */
    console.log('inside:', testMessage);
    return testMessage;
  } catch (e) {
    console.error('Err in sendMessage ', e);
  }
};
