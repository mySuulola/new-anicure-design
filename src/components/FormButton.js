import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
// import {Button} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const FormButton = ({title, modeValue, ...rest}) => {
  return (
    <Text>hi</Text>
    // <Button
    //   mode={modeValue} // text, outlined, contained
    //   {...rest}
    //   style={[styles.button, { backgroundColor: modeValue !== 'text' ? '#228b22' : 'transparent'}]}
    //   contentStyle={styles.buttonContainer}>
    //   {title}
    // </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    // backgroundColor: "#228b22",
    width: width / 1.5,
    height: height / 15,
  },
});

export default FormButton;
