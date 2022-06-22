import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, StatusBar, LogBox} from 'react-native';
import {
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
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
    isGyro: 0,
  });
  const SERVER_ADDRESS = '0.0.0.0'; //Localhost
  const SERVER_PORT = 5020;

  const TO_ADDRESS = '192.168.1.8';
  const TO_PORT = 5019;
  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 20);
    StatusBar.setHidden(true, 'none');
    LogBox.ignoreLogs(['new NativeEventEmitter']);
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

  const sendData = useCallback(
    buttonData => {
      if (isListening) {
        socketRef.current.send(
          `${touchData.x} ${touchData.y} ${touchData.isTouching} ${
            buttonData?.title
          } ${buttonData?.state} ${touchData.isGyro || 0}`,
          undefined,
          undefined,
          TO_PORT,
          TO_ADDRESS,
        );
      }
    },
    [touchData, isListening],
  );

  useEffect(() => {
    sendData();
  }, [sendData]);

  //Gyroscope Handler
  useEffect(() => {
    const gyro = gyroscope.subscribe(data => {
      if (buttonMode) {
        setTouchData({
          x: data.x * 1.5,
          y: data.y * 1.5,
          isTouching: 'moving',
          isGyro: 1,
        });
      }
    });
    return () => {
      setTouchData({x: 0, y: 0, isTouching: 0, isGyro: 0});
      gyro.unsubscribe();
    };
  }, [buttonMode]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Buttons
        onButtonPress={(buttonTitle, state) => {
          /*  if (buttonTitle === 'Gyro') {
            state === true ? setButtonMode(true) : setButtonMode(false);
          } */
          console.log(buttonTitle, state);
          sendData({title: buttonTitle, state});
        }}
      />
      <TouchPad
        buttonMode={buttonMode}
        onButtonPress={(buttonTitle, state) => {
          sendData({title: buttonTitle, state});
        }}
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
