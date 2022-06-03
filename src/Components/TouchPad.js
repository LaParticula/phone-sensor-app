import React, {useState, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useEffect} from 'react/cjs/react.production.min';
import borderRadius from '../utils/borderRadius';
const TouchPad = ({onChange}) => {
  const [sizeData, setSizeData] = useState(null);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const getCoordinates = e => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    setLocationX(x);
    setLocationY(y);
    onChange({
      x: x,
      y: y,
      isTouching: isTouching,
    });
  };

  return (
    <View
      style={styles.touch_pad}
      onLayout={e => {
        setSizeData(e.nativeEvent.layout);
      }}
      onTouchStart={() => {
        onChange({
          x: locationX,
          y: locationY,
          isTouching: 1,
        });
      }}
      onTouchEnd={() => {
        onChange({
          x: locationX,
          y: locationY,
          isTouching: 0,
        });
      }}
      onMoveShouldSetResponder={e => {
        getCoordinates(e);
      }}>
      <Text style={{color: 'white'}}>{'X: ' + locationX}</Text>
      <Text style={{color: 'white'}}>{'Y: ' + locationY}</Text>
    </View>
  );
};
export default TouchPad;

const styles = StyleSheet.create({
  touch_pad: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#242424',
    ...borderRadius([10]),
    marginLeft: 10,
    shadowColor: '#888',
    elevation: 2,
  },
});
