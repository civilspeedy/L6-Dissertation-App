/**
 * @file Contains logic pertaining to http api requests with the webserver
 * @module Api
 */
import { getLocation, getUserName } from './Manipulation';

/**
 * Used for context.
 */
let isNewChat = true;

/**
 * An asynchronous function that sends a http request to the webserver on local-host and returns the response.
 * @param {string} message the user's message
 * @returns {string} the response from the webserver or an error message should a failure occur.
 */
export const sendMessage = async (message) => {
    const name = await getUserName();
    console.log(name);
    let location = await getLocation();
    if (location == null) {
        location = 'None';
    }
    try {
        const request = `http://127.0.0.1:5000/communicate?message=${message}&name=${name}&location=${location}&chatStatus=${isNewChat}`;
        const response = await axios.get(request);
        isNewChat = false;
        return response.data;
    } catch {
        return 'Something has gone wrong, please try again.';
    }
};
