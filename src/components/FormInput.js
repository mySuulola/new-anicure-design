import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
// import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const FormInput = ({labelName, full, textarea, ...rest}) => {
  return (
    <Text>hi</Text>
    // <TextInput
    //   label={labelName}
    //   style={[styles.input, {
    //       width: full ? width - 20 : width / 1.5,
          
    //   },
    //   textarea && {height:100, marginBottom: 20, backgroundColor: '#fff'}
    
    // ]}
    //   numberOfLines={1}
    //   multiline = {textarea}
    //   {...rest}
    // />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: height / 15,
    backgroundColor: '#fff',
    elevation: 5
  },
});

export default FormInput;
