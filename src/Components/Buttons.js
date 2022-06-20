import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import GameButton from './GameButton';
const Buttons = ({onButtonPress}) => {
  const sendButtonData = (title, state) => {
    onButtonPress && onButtonPress(title, state);
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
          onPress={(buttonTitle, state) => {
            sendButtonData(buttonTitle, state);
          }}
        />
        <GameButton
          title="Buy"
          style="big"
          onPress={(buttonTitle, state) => {
            sendButtonData(buttonTitle, state);
          }}
        />
      </View>
      <GameButton
        title="Shoot"
        style="big"
        onPress={(buttonTitle, state) => {
          sendButtonData(buttonTitle, state);
        }}
      />
      <View style={styles.buttons_container}>
        <GameButton
          style="big"
          title="Gyro"
          onPress={(buttonTitle, state) => {
            sendButtonData(buttonTitle, state);
          }}
        />
        <GameButton
          title="+"
          onPress={(buttonTitle, state) => {
            sendButtonData(buttonTitle, state);
          }}
        />
        <GameButton
          title="-"
          onPress={(buttonTitle, state) => {
            sendButtonData(buttonTitle, state);
          }}
        />
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
