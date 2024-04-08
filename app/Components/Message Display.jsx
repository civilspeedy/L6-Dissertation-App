import { useEffect, useRef, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MessageDisplay({
  send,
  setSend,
  userMessage,
  setUserInput,
}) {
  const [displayStack, setDisplayStack] = useState([]);

  useEffect(() => {
    // suggestion from claude, had bug where useEffect was being called every time user types
    if (send && userMessage.trim() !== '') {
      updateDisplayStack(
        messageBubble({ message: userMessage, source: 'user' })
      );
      setSend(false);
      setUserInput('');
      scrollToNewMessage();
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
        {displayStack.map((message, index) => (
          <View
            style={{ flex: 1 }}
            key={index}>
            {message}
          </View>
        ))}
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
    flex: 1,
  },
  scrollView: {
    marginTop: '20%',
  },
  messageText: {
    textAlign: 'center',
  },
});
