import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export default function Location() {
  const [locNonJson, setLocNonJson] = useState(null);
  // set up an await for location for http request

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location perms were denied');
        return;
      }

      try {
        const currentPosition = await getCurrentPositionAsync({});
        setLocNonJson(currentPosition);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  const returnLocation = () => {
    if (locNonJson) {
      return locNonJson;
    } else {
      return false;
    }
  };
}
