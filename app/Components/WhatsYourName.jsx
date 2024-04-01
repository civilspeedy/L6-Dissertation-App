import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

export default function WhatsYourName({ activeTheme }) {
  const [name, setName] = useState(null);
  const [state, setState] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Modal
        transparent={true}
        visible={state}
        animationType='slide'
        onRequestClose={() => setState(true)}
        style={[
          styles.container,
          { backgroundColor: activeTheme.modalColour },
        ]}>
        <View></View>
      </Modal>
      <Pressable
        style={{ backgroundColor: 'blue', flex: 1 }}
        onPress={() => {
          setState(true);
          console.log('pressed!');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
