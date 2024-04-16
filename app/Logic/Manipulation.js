import AsyncStorage from '@react-native-async-storage/async-storage';

function jsonParseIn(json) {
    const jsonAsString = JSON.stringify(json);
    return jsonAsString;
}

function jsonParseOut(string) {
    const json = string ? JSON.parse(string) : null;
    return json;
}

export async function setTheme(theme) {
    try {
        await AsyncStorage.setItem('theme', jsonParseIn(theme));
    } catch (e) {
        console.error('err in setTheme ', e);
    }
}

export async function getTheme() {
    try {
        const themeAsString = await AsyncStorage.getItem('theme');
        return jsonParseOut(themeAsString);
    } catch (e) {
        console.error('err in getTheme ', e);
    }
}

export async function setUserName(name) {
    try {
        await AsyncStorage.setItem('name', name);
    } catch (e) {
        console.error('err in setUserName ', e);
    }
}

export async function getUserName() {
    try {
        const name = await AsyncStorage.getItem('name');
        return name;
    } catch (e) {
        console.error('err in getUserName', e);
    }
}

export async function resetName() {
    try {
        await AsyncStorage.removeItem('name');
    } catch (e) {
        console.error('err in resetName ', e);
    }
}

export async function setUserMessage(message) {
    try {
        await AsyncStorage.setItem('userMessage', message);
    } catch (e) {
        console.error('err in setUserMessage ', e);
    }
}

export async function getUserMessage() {
    try {
        const message = await AsyncStorage.getItem('userMessage');
        if (message === null) {
            return false;
        } else {
            return message;
        }
    } catch (e) {
        console.error('err in getUserMessage ', e);
    }
}

export async function resetUserMessage() {
    try {
        await AsyncStorage.removeItem('userMessage');
    } catch (e) {
        console.error('err in resetUserMessage ', e);
    }
}

export async function setSpeakerMessage(message) {
    try {
        await AsyncStorage.setItem('speakerMessage', message);
    } catch (e) {
        console.error('err in setSpeakerMessage ', e);
    }
}

export async function getSpeakerMessage() {
    try {
        const message = await AsyncStorage.getItem('speakerMessage');
        if (message === null) {
            return false;
        } else {
            return message;
        }
    } catch (e) {
        console.error('err in getSpeakerMessage ', e);
    }
}

export async function resetSpeakerMessage() {
    try {
        await AsyncStorage.removeItem('speakerMessage');
    } catch (e) {
        console.error('err in resetSpeakerMessage ', e);
    }
}

export async function setLocationAccess(value) {
    try {
        await AsyncStorage.setItem('locationAccess', jsonParseIn(value));
    } catch (e) {
        console.error('err in setLocationAccess ', e);
    }
}

export async function getLocationAccess() {
    try {
        const locationAccess = await AsyncStorage.getItem('locationAccess');
        return jsonParseOut(locationAccess);
    } catch (e) {
        console.error('err in getLocationAccess ', e);
    }
}
