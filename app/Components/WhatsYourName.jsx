import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomTextInput from './Text Input';
import { BlurView } from 'expo-blur';

export default function WhatsYourName({ activeTheme, state, setState }) {
  const [name, setName] = useState('');

  return (
    <Modal
      transparent={true}
      visible={state}
      animationType='fade'
      onRequestClose={() => setState(false)}
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
          <Text style={styles.titleText}>Before we start...</Text>
          <Text style={styles.questionText}>
            Why don't you tell me your name?
          </Text>
          <View style={styles.inputContainer}>
            <CustomTextInput activeTheme={activeTheme} />
          </View>
          {/*Needs disclaimer here*/}
          <Pressable
            style={styles.closeButton}
            onPress={() => setState(!state)}>
            <Text>Close Modal</Text>
          </Pressable>
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
    height: '50%',
    alignSelf: 'center',
    marginTop: '50%',
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: 'red',
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
  },
  blurView: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'auto',
    position: 'absolute',
    top: 20,
  },
  questionText: {
    margin: 10,
  },
});
