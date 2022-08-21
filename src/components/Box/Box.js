import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './Box.styles';

export default function Box({value, onPress, disabled, painted}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {backgroundColor: painted ? 'powderblue' : '#bdbdbd'},
      ]}>
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
}
