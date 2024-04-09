import { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { sendMessage } from '../Logic/Api';

export default function MessageDisplay({
  send,
  setSend,
  userMessage,
  setUserInput,
  name,
}) {
  const [displayStack, setDisplayStack] = useState([]);

  useEffect(() => {
    const fetchSpeakerMessage = async () => {
      const fetchedMsg = await sendMessage(userMessage, name);
      console.log('outside:', fetchedMsg);
      updateDisplayStack(
        messageBubble({ message: fetchedMsg[0].response, source: 'speaker' })
      );
    };

    if (send && userMessage.trim() !== '') {
      updateDisplayStack(
        messageBubble({ message: userMessage, source: 'user' })
      );
      fetchSpeakerMessage();
      setSend(false);
      setUserInput('');
    }
  }, [send, userMessage, setSend, setUserInput]);

  const updateDisplayStack = (item) => {
    setDisplayStack((prevStack) => [...prevStack, item]);
  };

  const messageBubble = (message) => {
    const source = message.source;
    const text = message.message;
    let colour = '#F3470C';

    console.log(text);
    console.log(source);

    if (source == 'user') {
      colour = '#0CB8F3';
    }

    return (
      <View style={[styles.messageContainer, { backgroundColor: colour }]}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    );
  };

  LayoutAnimation.spring();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {displayStack.map((message, index) => (
            <View
              style={{ flex: 1 }}
              key={index}>
              {message}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
    maxWidth: '80%',
  },
  scrollView: {
    marginTop: '20%',
    width: '100%',
  },
  innerView: {
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
