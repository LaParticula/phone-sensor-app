import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import borderRadius from '../utils/borderRadius';

const GameButton = ({onPress, title, style}) => {
  return (
    <TouchableOpacity
      onPressIn={() => {
        onPress && onPress(true);
      }}
      onPressOut={() => {
        onPress && onPress(false);
      }}
      style={style === 'big' ? styles.big_button : styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
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
    shadowColor: '#888',
    elevation: 2,
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
});
