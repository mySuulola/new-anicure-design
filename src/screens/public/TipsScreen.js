import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('screen');


const TipsScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
    <Text>Hello</Text>
    </View>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    minHeight: height - 90,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    width: 200,
    height: 170,
  },

  marginTopText: {
    marginTop: 200,
  },
});
