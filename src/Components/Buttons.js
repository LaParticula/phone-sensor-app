import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import GameButton from './GameButton';
const Buttons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons_container}>
        <GameButton style="big" title="R" />
      </View>
      <View style={styles.buttons_container}>
        <GameButton style="big" title="Gyro" />
        <GameButton title="+" />
        <GameButton title="-" />
      </View>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    height: '100%',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  buttons_container: {
    width: '100%',
    flexDirection: 'row',
  },
});
