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

export async function getLocation() {
    try {
        const location = await AsyncStorage.getItem('location');
        return location;
    } catch (e) {
        console.error('err in getLocation ', e);
    }
}

export async function setLocation(value) {
    try {
        await AsyncStorage.setItem('location', jsonParseIn(value));
    } catch (e) {
        console.error('err in setLocation ', e);
    }
}
