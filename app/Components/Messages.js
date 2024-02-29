import { useEffect, useRef, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MessageBubble from './MessageBubble';
import { giveTestMessage } from './Speaker';

export default function Messages({
  currentUserMessage,
  send,
  setSend,
  setUserInput,
  activeTheme,
}) {
  const [userMessage, setUserMsg] = useState('');
  const [speakerMessage, setSpeakerMsg] = useState('');
  const [bubblesList, setBubblesList] = useState([]);
  const [whoSpokeLast, setWhoSpokeLast] = useState(null);

  const userMessagesArray = [];
  const speakerMessagesArray = [];

  const scrollRef = useRef(null);

  const scrollToNewMessage = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (send) {
      addUserMessageToList(currentUserMessage);
      setSend(false);
    }
  }, [send]);

  const addUserMessageToList = (message) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    userMessagesArray.pop(message);
    setBubblesList(
      bubblesList.concat(
        //had string error here, google gemini suggested using .concat()
        <MessageBubble
          message={message}
          isSpeaker={false}
          key={bubblesList.length + 1}
        />
      )
    );
    setUserInput('');
    setWhoSpokeLast(true);
    scrollToNewMessage();
    console.log(bubblesList);
  };

  //need to a way to know when a message has been added otherwise async causes overlap
  const addSpeakerMessageToList = (message) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    speakerMessagesArray.pop(message);
    setBubblesList(
      bubblesList.concat(
        <MessageBubble
          message={message}
          isSpeaker={true}
          key={bubblesList.length + 1}
        />
      )
    );
    setWhoSpokeLast(false);
    console.log(bubblesList);
    scrollToNewMessage();
  };
  const clearMessagesList = () => setBubblesList([]);
  () => clearMessagesList();

  return (
    <View style={styles.container}>
      <Pressable
        style={{ backgroundColor: 'red', padding: 10 }}
        onPress={() => addSpeakerMessageToList('test')}
      />
      <ScrollView
        style={styles.scroll}
        ref={scrollRef}
        onContentSizeChange={scrollToNewMessage}>
        {bubblesList}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginBottom: 80,
    marginTop: 20,
  },
  scroll: {
    alignSelf: 'center',
    flex: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
});
