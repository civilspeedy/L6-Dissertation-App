import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import CustomTextInput from './Text Input';
import { BlurView } from 'expo-blur';
import { getUserName, setUserName } from '../Database/Manipulation';

export default function WhatsYourName({
  activeTheme,
  state,
  setState,
  outsideSetName,
}) {
  const [name, setName] = useState('');
  const [displayState, setDisplayState] = useState(false);

  const checkNameInput = () => {
    console.log('button pressed');
    if (name == '') {
      Alert.alert(`Please enter a name. It doesn't have to be your real one.`);
    } else if (name.length >= 32) {
      Alert.alert('Sorry but this is too long.');
    } else {
      console.log('in else statement');
      setUserName(name);
      setDisplayState(true);
      setTimeout(() => {
        setState(false);
      }, 700);
      getUserName(outsideSetName);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={state}
      animationType='fade'
      style={[styles.modalContainer]}>
      <BlurView
        style={styles.blurView}
        tint='systemThinMaterial'
        intensity={80}>
        <View
          style={[
            styles.modalItself,
            { backgroundColor: activeTheme.modalColour },
          ]}>
          {displayState ? (
            <View>
              <Text style={{ fontSize: 30 }}>Hello {name}!</Text>
            </View>
          ) : (
            <View style={styles.subContainer}>
              <Text style={styles.titleText}>Before we start...</Text>
              <Text style={styles.questionText}>
                Why don't you tell me your name?
              </Text>

              <View style={styles.inputContainer}>
                <CustomTextInput
                  activeTheme={activeTheme}
                  userInput={name}
                  setUserInput={setName}
                />
              </View>

              <Text style={styles.smallText}>
                Use of your name is purley to provide a more natural dialogue
                and is not used to identify you in any way.
              </Text>
              <Pressable
                style={styles.submitButton}
                onPress={() => checkNameInput()}>
                <Text>Submit Name</Text>
              </Pressable>
            </View>
          )}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalItself: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    marginTop: '50%',
    borderRadius: 50,
  },
  submitButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderRadius: 50,
    borderWidth: 3,
    flex: 0.1,
    width: '75%',
    height: 10,
    backgroundColor: 'magenta',
  },
  blurView: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'auto',
    position: 'absolute',
    top: 20,
    backgroundColor: 'yellow',
  },
  questionText: {
    backgroundColor: 'orange',
    margin: 10,
    fontSize: 20,
  },
  smallText: {
    backgroundColor: 'red',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  subContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
