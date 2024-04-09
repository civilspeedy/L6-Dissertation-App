import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import CustomTextInput from './Components/Text Input';
import {
  getLocationAccess,
  getTheme,
  getUserName,
  setLocationAccess,
  setTheme,
} from './Logic/Manipulation';
import { impactAsync } from 'expo-haptics';
import WhatsYourName from './Components/WhatsYourName';
import MessageDisplay from './Components/Message Display';
import Settings from './Components/Settings';

export default function App() {
  const colourJson = require('./assets/json/theme.json');

  const [userInput, setInput] = useState('');
  const [send, setSend] = useState(false);
  const [themeSate, setThemeState] = useState(true);
  const [activeTheme, setActiveTheme] = useState(colourJson.darkColours);
  const [askName, setAskName] = useState(false);
  const [name, setName] = useState(null);
  const [locationAccess, setAccess] = useState(false);

  useEffect(() => {
    setLocationAccess(locationAccess);
    console.log('location access:', locationAccess);
  }, [locationAccess]);

  useEffect(() => {
    const fetchTheme = async () => {
      const fetchedTheme = await getTheme();
      setThemeState(fetchedTheme);
    };

    const fetchLocationAccess = async () => {
      const fetchedAccess = await getLocationAccess();
      setAccess(fetchedAccess);
      console.log(fetchedAccess);
    };

    const fetchUserName = async () => {
      const fetchedName = await getUserName();
      setName(fetchedName);
      if (fetchedName === null) {
        setAskName(true);
      } else {
        setAskName(false);
      }
    };

    fetchUserName();
    fetchLocationAccess();
    fetchTheme();
  }, []);

  useEffect(() => {
    if (themeSate) {
      setActiveTheme(colourJson.darkColours);
    } else {
      setActiveTheme(colourJson.lightColours);
    }
  }, [themeSate]);

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
      <MessageDisplay
        send={send}
        setSend={setSend}
        userMessage={userInput}
        setUserInput={setInput}
        name={name}
      />
      <View style={styles.topArea}>
        <Settings
          activeTheme={activeTheme}
          setAccess={setAccess}
          locationAccess={locationAccess}
          name={name}
          setName={setName}
        />
        <Pressable
          onPress={() => {
            const newState = !themeSate;
            setThemeState(newState);
            setTheme(newState);
          }}
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
            size={35}
            color={activeTheme.primary}
          />
        </Pressable>
      </View>
      <WhatsYourName
        activeTheme={activeTheme}
        state={askName}
        setState={setAskName}
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
    width: 45,
    height: 45,
    alignContent: 'center',
    justifyContent: 'center',
  },
  topArea: {
    flex: 0.1,
    marginTop: 10,
    width: '100%',
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
  },
});
