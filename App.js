import React from 'react';
import {View, StyleSheet} from 'react-native';
import Buttons from './src/Components/Buttons';
import TouchPad from './src/Components/TouchPad';
import dgram from 'react-native-udp';

export default function App() {
  const SERVER_ADDRESS = '0.0.0.0'; //Localhost
  const SERVER_PORT = 5020;

  const socket = dgram.createSocket('udp4');
  socket.bind(SERVER_PORT, SERVER_ADDRESS);
  socket.once('listening', function () {
    socket.send(
      'Hola',
      undefined,
      undefined,
      5019,
      '127.0.0.1',
      function (err) {
        if (err) throw err;
        console.log('Message sent!');
      },
    );
  });
  socket.on('message', function (msg, rinfo) {
    console.log('Message received', msg);
  });

  return (
    <View style={styles.container}>
      <Buttons />
      <TouchPad />
    </View>
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
