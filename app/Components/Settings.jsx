import { useEffect, useState } from 'react';
import { Modal, Pressable, View, Text, StyleSheet, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import NameEntry from './Name Entry';
import { getLocationAccess, setLocationAccess } from '../Logic/Manipulation';

export default function Settings({ activeTheme, setName }) {
  const [state, setState] = useState(false);
  const [newName, setNewName] = useState('');
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const fetchLocationAcc = async () => {
      const fetchedLocation = await getLocationAccess();
      setAccess(fetchedLocation);
    };
    fetchLocationAcc();
  }, []);

  useEffect(() => {
    console.log(access);
    setLocationAccess(access);
  }, [access]);

  const handleClose = (save) => {
    console.log(1);
    if (save) {
      console.log(2);
      if (newName.trim() !== '') {
        setName(newName);
      }
      setNewName('');
    } else {
      console.log(3);
      setNewName('');
    }
    setState(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={state}
        animationType='fade'>
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
              name={newName}
              setName={setNewName}
            />
            <View style={styles.locationView}>
              <Text>Allow Location Services: </Text>
              <Switch
                trackColor={{ true: 'lightgreen' }}
                onValueChange={setAccess}
                value={access}
                style={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.buttonsView}>
              <Pressable
                onPress={() => handleClose(true)}
                style={[styles.closeButtons, { backgroundColor: '#0CB8F3' }]}>
                <Text style={{ textAlign: 'center' }}>Confirm and Close</Text>
              </Pressable>

              <Pressable
                style={[styles.closeButtons, { backgroundColor: 'lightgrey' }]}
                onPress={() => handleClose(false)}>
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
        onPress={() => setState(true)}>
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
