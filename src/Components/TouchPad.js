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
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);

  const getCoordinates = e => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    setLocationX(x);
    setLocationY(y);
    onChange({
      x: x,
      y: y,
      isTouching: 'moving',
    });
  };
  if (buttonMode) {
    return (
      <View style={[styles.touch_pad]}>
        <GameButton
          title="Pium"
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
      onGestureEvent={e => {
        console.log('------');
        console.log(e.nativeEvent.absoluteX);
        console.log(e.nativeEvent.absoluteY);
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
