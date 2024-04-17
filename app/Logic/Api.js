import axios from 'axios';
import { getLocation, getUserName } from './Manipulation';

export const sendMessage = async (message) => {
    const name = await getUserName();
    let location = await getLocation();
    if (location == null) {
        location = 'None';
    }
    try {
        const request = `http://127.0.0.1:5000/communicate?message=${message}&name=${name}&location=${location}`;
        const response = await axios.get(request);
        return response.data;
    } catch (e) {
        if (e.response.status === 403) {
            const error_message =
                'Sorry, failed to connect to the server, please try again later.';
            return error_message;
        }
        if (e.response.status === 500) {
            const error_message = 'Something has gone wrong, please try again.';
            return error_message;
        } else {
            console.error('Err in sendMessage ', e);
        }
    }
};
