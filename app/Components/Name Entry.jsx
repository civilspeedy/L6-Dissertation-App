import { StyleSheet, TextInput, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 50,
    width: '60%',
    padding: 10,
  },
});
