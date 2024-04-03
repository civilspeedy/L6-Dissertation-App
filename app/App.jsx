import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Messages from './Components/Messages';
import CustomTextInput from './Components/Text Input';
import {
  createThemeTable,
  firstLaunch,
  getUserName,
  readTheme,
} from './Database/Manipulation';
import { impactAsync } from 'expo-haptics';
import Location from './Components/Location';
import WhatsYourName from './Components/WhatsYourName';

createThemeTable();
firstLaunch();

export default function App() {
  const colourJson = require('./assets/json/theme.json');

  const [userInput, setInput] = useState('');
  const [send, setSend] = useState(false);
  const [themeSate, setThemeState] = useState(true);
  const [activeTheme, setActiveTheme] = useState(colourJson.darkColours);
  const [state, setState] = useState(false);
  const [name, setName] = useState('');

  Location();

  const getTheme = async () => {
    try {
      const gottenTheme = await readTheme();
      setThemeState(gottenTheme);
    } catch (e) {
      console.error('err in getTheme', e);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    if (themeSate) {
      setActiveTheme(colourJson.darkColours);
    } else {
      setActiveTheme(colourJson.lightColours);
    }
  }, [themeSate]);

  useEffect(() => {
    const fetchUserName = async () => {
      const fetchedName = await getUserName();
      setName(fetchedName);
    };
    fetchUserName();
  }, []);

  const handleMessageSend = () => {
    impactAsync();
    if (userInput.trim() == '') {
      Alert.alert('Message is blank.');
    } else if (userInput.length >= 256) {
      Alert.alert('Message is too long.');
    } else {
      console.log('characters: ', userInput.length);
      setSend(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.primary }]}>
      <StatusBar style='auto' />
      <View style={styles.topArea}>
        <Pressable
          onPress={() => setThemeState(!themeSate)}
          style={[
            styles.themeButton,
            { backgroundColor: activeTheme.secondary },
          ]}>
          {themeSate ? (
            <View>
              <Feather
                name='sun'
                color={activeTheme.primary}
                size={50}
              />
            </View>
          ) : (
            <View>
              <Feather
                name='moon'
                color={activeTheme.primary}
                size={50}
              />
            </View>
          )}
        </Pressable>
      </View>
      <Pressable
        onPress={() => setState(!state)}
        style={{ backgroundColor: 'blue', width: 10, height: 10 }}
      />
      <Messages
        send={send}
        setSend={setSend}
        currentUserMessage={userInput}
        setUserInput={setInput}
        activeTheme={activeTheme}
      />
      <View style={[styles.inputArea, { borderColor: activeTheme.secondary }]}>
        <CustomTextInput
          setUserInput={setInput}
          userInput={userInput}
          activeTheme={activeTheme}
        />

        <Pressable
          style={[
            styles.sendButton,
            { backgroundColor: activeTheme.secondary },
          ]}
          onPress={() => handleMessageSend()}>
          <Feather
            name='send'
            size={45}
            color={activeTheme.primary}
          />
        </Pressable>
      </View>
      <WhatsYourName
        activeTheme={activeTheme}
        state={state}
        setState={setState}
        setName={setName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    margin: 20,
  },
  inputArea: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 50,
    padding: 10,
    width: '80%',
  },
  sendButton: {
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  topArea: {
    flex: 0.1,
    marginTop: 10,
    width: '100%',
  },
});
