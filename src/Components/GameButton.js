import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import borderRadius from '../utils/borderRadius';

const GameButton = ({onPress, title, style}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sendPressData = useCallback(() => {
    onPress && onPress(title, isPressed);
  }, [onPress, title, isPressed]);

  useEffect(() => {
    sendPressData();
  }, [sendPressData]);
  return (
    <TapGestureHandler
      maxDurationMs={36000000}
      onBegan={() => {
        setIsPressed(true);
      }}
      onEnded={() => {
        setIsPressed(false);
      }}>
      <View
        style={[
          style === 'big' ? styles.big_button : styles.button,
          isPressed && styles.pressed,
        ]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TapGestureHandler>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'white',
  },
  big_button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dda629',
    width: '25%',
    marginRight: 6,
    aspectRatio: 1,
    ...borderRadius([50]),
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
    width: '17%',
    marginTop: 'auto',
    marginLeft: 5,
    marginRight: 5,
    aspectRatio: 1,
    ...borderRadius([50]),
  },
  pressed: {
    backgroundColor: '#dda62999',
  },
});
