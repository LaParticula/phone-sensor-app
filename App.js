import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Buttons from './src/Components/Buttons';
import TouchPad from './src/Components/TouchPad';
import dgram from 'react-native-udp';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  const socketRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [buttonMode, setButtonMode] = useState(false);
  const [touchData, setTouchData] = useState({
    x: 0,
    y: 0,
    isTouching: 0,
  });

  const SERVER_ADDRESS = '0.0.0.0'; //Localhost
  const SERVER_PORT = 5020;

  const TO_ADDRESS = '192.168.1.8';
  const TO_PORT = 5019;
  useEffect(() => {
    StatusBar.setHidden(true, 'none');
    socketRef.current = dgram.createSocket('udp4');
    const {current: socket} = socketRef;
    socket.bind(SERVER_PORT, SERVER_ADDRESS);
    setIsListening(false);
    socket.once('listening', () => {
      console.log('Listening');
      setIsListening(true);
    });
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      socketRef.current.send(
        `${`${touchData.x} ${touchData.y} ${touchData.isTouching}`} ${
          touchData.button
        }`,
        undefined,
        undefined,
        TO_PORT,
        TO_ADDRESS,
      );
    }
  }, [touchData, socketRef, isListening]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Buttons
        onButtonPress={(buttonName, state) => {
          console.log(buttonName, state);
          buttonName === 'Gyro' && state === true
            ? setButtonMode(true)
            : setButtonMode(false);
        }}
      />
      <TouchPad
        buttonMode={buttonMode}
        onChange={cordData => {
          setTouchData(cordData);
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
