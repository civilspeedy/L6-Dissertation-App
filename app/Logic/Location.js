import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export default async function getLocation() {
  let { status } = await requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Location permissions were denied');
    return null;
  }

  try {
    const currentPosition = await getCurrentPositionAsync({});
    return currentPosition;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
}
