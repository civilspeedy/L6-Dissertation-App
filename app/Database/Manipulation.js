import * as db from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const file = db.openDatabase('data.db');

// refactor for async

export async function setTheme(theme) {
  try {
    const themeAsString = JSON.stringify(theme);
    console.log('theme has been set to:', themeAsString);
    await AsyncStorage.setItem('theme', themeAsString);
  } catch (e) {
    console.error('err in setTheme ', e);
  }
}

export async function getTheme() {
  try {
    const themeAsString = await AsyncStorage.getItem('theme');
    const theme = themeAsString ? JSON.parse(themeAsString) : null;
    return theme;
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
  } catch (error) {
    console.error('err in getUserName', error);
  }
}

export async function resetName() {
  try {
    await AsyncStorage.removeItem('name');
  } catch (e) {
    console.error('err in resetName ', e);
  }
}
