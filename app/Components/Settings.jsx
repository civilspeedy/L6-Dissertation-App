import { useState } from 'react';
import { Modal, Pressable, View, Text, StyleSheet, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import NameEntry from './Name Entry';

export default function Settings({
  activeTheme,
  name,
  setName,
  locationAccess,
  setAccess,
}) {
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
            <Text style={{ marginBottom: 10 }}>Change Name: </Text>
            <NameEntry
              name={name}
              setName={setName}
            />
            <View style={styles.locationView}>
              <Text>Allow Location Services: </Text>
              <Switch
                trackColor={{ true: 'lightgreen' }}
                onValueChange={setAccess}
                value={locationAccess}
                style={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.buttonsView}>
              <Pressable
                style={[styles.closeButtons, { backgroundColor: '#0CB8F3' }]}>
                <Text style={{ textAlign: 'center' }}>Confirm and Close</Text>
              </Pressable>
              <Pressable
                style={[styles.closeButtons, { backgroundColor: 'lightgrey' }]}
                onPress={() => setState(false)}>
                <Text style={{ textAlign: 'center' }}>
                  Close Without Saving
                </Text>
              </Pressable>
            </View>
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
  closeButtons: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 10,
    borderRadius: 50,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    marginVertical: '60%',
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
    margin: 10,
    alignItems: 'center',
  },
  buttonsView: {
    margin: 10,
  },
});
