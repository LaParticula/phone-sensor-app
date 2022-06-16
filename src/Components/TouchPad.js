import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import borderRadius from '../utils/borderRadius';
import {PanGestureHandler} from 'react-native-gesture-handler';
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
  return (
    <PanGestureHandler
      onGestureEvent={e => {
        console.log('------');
        console.log(e.nativeEvent.absoluteX);
        console.log(e.nativeEvent.absoluteY);
      }}
      avgTouches={true}>
      <View nativeID={'uwu'} key={'uwu'} style={styles.touch_pad} />
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
  finger: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    ...borderRadius([10]),
  },
});
