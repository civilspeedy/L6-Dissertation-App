import { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { sendMessage } from '../Logic/Api';
import { useRef } from 'react';

//needs scroll to animation

export default function MessageDisplay({
  send,
  setSend,
  userMessage,
  setUserInput,
  name,
}) {
  const [displayStack, setDisplayStack] = useState([]);
  const scrollRef = useRef();

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
    scrollRef.current.scrollToEnd({ animated: true });
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
      <ScrollView
        style={styles.scrollView}
        ref={scrollRef}>
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
    maxWidth: '63%',
    margin: 10,
  },
  scrollView: {
    marginTop: '21%',
    marginBottom: '23%',
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
