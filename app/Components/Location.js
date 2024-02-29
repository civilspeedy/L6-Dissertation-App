import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export default function Location() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location perms were denied');
        return;
      }

      try {
        const currentPosition = await getCurrentPositionAsync({});
        setLocation(JSON.stringify(currentPosition));
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);
}
