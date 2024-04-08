import { useState } from 'react';
import { Modal, Pressable, View, Text, StyleSheet, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import CustomTextInput from './Text Input';

export default function Settings({ activeTheme, name, setName }) {
  const [state, setState] = useState(false);
  return (
    <View>
      <Modal
        transparent={true}
        visible={state}
        animationType='fade'
        onRequestClose={() => setState(false)}>
        <BlurView
          style={styles.blurView}
          tint='systemThinMaterial'
          intensity={80}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: activeTheme.modalColour },
            ]}>
            <Text>Change Name: </Text>
            <View style={styles.textInput}>
              <CustomTextInput
                setUserInput={setName}
                userInput={name}
                activeTheme={activeTheme}
              />
            </View>
            <View style={styles.locationView}>
              <Text>Allow Location Services: </Text>
              <Switch />
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setState(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
      <Pressable
        style={[styles.button, { backgroundColor: activeTheme.secondary }]}
        onPress={() => setState(!state)}>
        <Feather
          name='settings'
          size={50}
          color={activeTheme.primary}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurView: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
    borderRadius: 50,
    margin: 20,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    marginVertical: '50%',
    borderRadius: 50,
  },
  textInput: {
    borderWidth: 3,
    borderRadius: 50,
    width: '80%',
    height: '10%',
  },
  locationView: {
    flexDirection: 'row',
  },
});
