import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { setUserName } from '../Logic/Manipulation';
import NameEntry from './Name Entry';

export default function StarterPage({ activeTheme, state, setState }) {
    const [name, setName] = useState('');
    const [displayState, setDisplayState] = useState(false);

    const checkNameInput = () => {
        console.log('button pressed');
        console.log(name);
        if (name == '') {
            Alert.alert(
                `Please enter a name. It doesn't have to be your real one.`
            );
        } else if (name.length >= 32) {
            Alert.alert('Sorry but this is too long.');
        } else {
            console.log('in else statement');
            setUserName(name);
            setDisplayState(true);
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
                            <Text style={{ fontSize: 30, alignSelf: 'center' }}>
                                Hello {name}!
                            </Text>
                            <Text style={styles.smallText}>
                                This service utilises language model technology,
                                this technology has a random nature which could
                                lead to unexpected answers. This language model
                                is designed for weather information primarily
                                but does have some outside conversational
                                ability but for the best results it is advised
                                to focus conversations on weather information.
                            </Text>
                            <Pressable
                                onPress={() => setState(false)}
                                style={styles.submitButton}>
                                <Text>I understand</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.subContainer}>
                            <Text style={styles.titleText}>
                                Before we start...
                            </Text>
                            <Text style={styles.questionText}>
                                Why don't you tell me your name?
                            </Text>

                            <NameEntry
                                name={name}
                                setName={setName}
                            />

                            <Text style={styles.smallText}>
                                Use of your name is purley to provide a more
                                natural dialogue and is not used to identify you
                                in any way.
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
        marginTop: '30%',
        width: '80%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 50,
    },
    submitButton: {
        alignSelf: 'center',
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
        fontSize: 20,
    },
    smallText: {
        fontSize: 20,
        margin: 10,
    },
    subContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
        alignSelf: 'center',
        backgroundColor: 'lightGreen',
        padding: 10,
    },
});
