import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import borderRadius from '../utils/borderRadius';
const TouchPad = () => {
  const [sizeData, setSizeData] = useState(null);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const getCoordinates = e => {
    setLocationX(e.nativeEvent.locationX - sizeData.width / 2);
    setLocationY((e.nativeEvent.locationY - sizeData.height / 2) * -1);
  };

  return (
    <View
      style={styles.touch_pad}
      onLayout={e => {
        setSizeData(e.nativeEvent.layout);
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
