import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { setUserName } from '../Logic/Manipulation';

export default function NameEntry({ name, setName }) {
    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                onChangeText={setName}
            />
        </View>
    );
}

export const checkNameInput = (name) => {
    if (name == '') {
        Alert.alert(
            `Please enter a name. It doesn't have to be your real one.`
        );
        return false;
    } else if (name.length >= 32) {
        Alert.alert('Sorry but this is too long.');
        return false;
    } else {
        setUserName(name);
        return true;
    }
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderRadius: 50,
        width: '60%',
        padding: 10,
    },
});
