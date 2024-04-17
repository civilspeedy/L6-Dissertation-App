import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';
import { setLocation, setLocationAccess } from './Manipulation';

export default async function getLocationAndPerm() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Location permissions were denied');
        return null;
    } else {
        try {
            const currentPosition = await getCurrentPositionAsync({});
            setLocation(currentPosition);
        } catch (error) {
            console.error('Error getting location:', error);
            return null;
        }
    }
}
