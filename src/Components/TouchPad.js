import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import borderRadius from '../utils/borderRadius';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import GameButton from './GameButton';
const TouchPad = ({onChange, buttonMode, onButtonPress}) => {
  const [sizeData, setSizeData] = useState(null);
  if (buttonMode) {
    return (
      <View style={[styles.touch_pad]}>
        <GameButton
          title="Shoot"
          style="big"
          onPress={(buttonTitle, state) => {
            onButtonPress && onButtonPress(buttonTitle, state);
          }}
        />
      </View>
    );
  }
  return (
    <PanGestureHandler
      onEnded={() => {
        onChange({
          x: 0,
          y: 0,
          isTouching: '0',
        });
      }}
      onGestureEvent={e => {
        const x = e.nativeEvent.absoluteX;
        const y = e.nativeEvent.absoluteY;
        onChange({
          x: x,
          y: y,
          isTouching: 'moving',
        });
      }}
      avgTouches={true}>
      <View style={styles.touch_pad} />
    </PanGestureHandler>
  );
};
export default TouchPad;

const styles = StyleSheet.create({
  touch_pad: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '55%',
    backgroundColor: '#242424',
    ...borderRadius([10]),
    marginLeft: 10,
    shadowColor: '#888',
    elevation: 2,
  },
  button: {
    backgroundColor: '#dda629',
  },
});
