import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const TextButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={{
        marginTop: 7
    }} onPress={onPress}>
      <Text
        style={{
          color: 'rgba(40, 21, 206, 0.9)',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
