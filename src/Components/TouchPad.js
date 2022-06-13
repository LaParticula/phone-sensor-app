import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, PanResponder} from 'react-native';
import {} from 'react'
import borderRadius from '../utils/borderRadius';
const TouchPad = ({onChange}) => {
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
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log(gestureState.stateID, gestureState.numberActiveTouches);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        return true;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <View
      nativeID={'uwu'}
      key={'uwu'}
      style={styles.touch_pad}
      onLayout={e => {
        setSizeData(e.nativeEvent.layout);
      }}
      {...panResponder.panHandlers}
    />
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
});
