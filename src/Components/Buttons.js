import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import GameButton from './GameButton';
const Buttons = ({onButtonPress}) => {
  const sendButtonData = (buttonName, type) => {
    onButtonPress && onButtonPress(buttonName, type);
  };
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={e => true}
      onMoveShouldSetResponder={e => true}>
      <View style={styles.buttons_container}>
        <GameButton
          style="big"
          title="R"
          onPress={type => {
            sendButtonData('R', type);
          }}
        />
      </View>
      <View style={styles.buttons_container}>
        <GameButton
          style="big"
          title="Gyro"
          onPress={type => {
            sendButtonData('Gyro', type);
          }}
        />
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
