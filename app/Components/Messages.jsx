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
import { sendMessage } from './Api';

export default function Messages({
  currentUserMessage,
  send,
  setSend,
  setUserInput,
  name,
}) {
  const [bubblesList, setBubblesList] = useState([]);

  const userMessagesArray = [];
  const speakerMessagesArray = [];

  const scrollRef = useRef(null);

  const scrollToNewMessage = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const getSpeakerMessage = async () => {
      const fetchedSpeakerMessage = await sendMessage(currentUserMessage, name);
      const filtered_message = fetchedSpeakerMessage[0].response;
      console.log('filtered message: ', filtered_message);

      // something is going wrong here
      addUserMessageToList(currentUserMessage);

      addSpeakerMessageToList(filtered_message);

      setSend(false);
    };

    if (send) {
      getSpeakerMessage();
    }
  }, [send, currentUserMessage, name]);

  const addUserMessageToList = (message) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    userMessagesArray.pop(message);
    setBubblesList([
      ...bubblesList,
      <MessageBubble
        message={message}
        isSpeaker={false}
        key={bubblesList.length + 1}
      />,
    ]);
    setUserInput('');
    scrollToNewMessage();
    console.log(bubblesList);
  };

  const addSpeakerMessageToList = (message) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    speakerMessagesArray.pop(message);
    setBubblesList([
      ...bubblesList,
      <MessageBubble
        message={message}
        isSpeaker={true}
        key={bubblesList.length + 1}
      />,
    ]);
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
