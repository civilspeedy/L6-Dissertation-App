import { StyleSheet, TextInput } from 'react-native';

export default function CustomTextInput({
  userInput,
  setUserInput,
  activeTheme,
}) {
  return (
    <TextInput
      style={[styles.input, { color: activeTheme.secondary }]}
      value={userInput}
      onChangeText={setUserInput}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '75%',
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
});
