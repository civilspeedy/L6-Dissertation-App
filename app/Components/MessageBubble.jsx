import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessageBubble({ message, isSpeaker }) {
  const [messageToDisplay, setMessageToDisplay] = useState('');
  const [bgColour, setBgColour] = useState('#EB5114');

  useEffect(() => {
    setMessageToDisplay(message);
    if (isSpeaker) {
      setBgColour('#14AEEB');
    }
  }, [message]);

  return (
    <View style={[styles.container, { backgroundColor: bgColour }]}>
      <Text>{messageToDisplay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    margin: 10,
    flex: 1,
    alignSelf: 'center',
  },
});
