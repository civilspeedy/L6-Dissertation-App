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
import Markdown from 'react-native-markdown-display';

//needs scroll to animation

export default function MessageDisplay({
  send,
  setSend,
  userMessage,
  setUserInput,
  name,
}) {
  const [displayStack, setDisplayStack] = useState([]);
  const scrollRef = useRef(null);

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
    scrollRef.current.scrollToEnd({ animated: true });
    setDisplayStack((prevStack) => [...prevStack, item]);
    scrollRef.current.scrollToEnd({ animated: true });
  };

  const messageBubble = (message) => {
    const source = message.source;
    const text = message.message;
    let colour = '#F3470C';
    let messageText = null;

    console.log(text);
    console.log(source);

    if (source == 'user') {
      colour = '#0CB8F3';
      messageText = <Text style={styles.messageText}>{text}</Text>;
    } else {
      messageText = (
        <View style={{ padding: 10 }}>
          <Markdown>{text}</Markdown>
        </View>
      );
    }

    return (
      <View style={[styles.messageContainer, { backgroundColor: colour }]}>
        {messageText}
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
    padding: 20,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
    maxWidth: '70%',
    margin: 10,
  },
  scrollView: {
    marginTop: '25%',
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
