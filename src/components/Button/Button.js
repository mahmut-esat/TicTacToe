import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Button.styles';

export default function MyButton({onPress, title, color = 'coral', textColor="#fff"}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor:color}]}>
      <Text style={[styles.text, {color:textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}
