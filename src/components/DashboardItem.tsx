import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';

const DashboardItem = ({text, backgroundColor, onPress, icon, time}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor}]}>
      <Text style={[styles.text, ]}>{text} </Text>
      <Text style={[styles.text, {fontWeight: '700', textTransform: 'uppercase', textShadowColor: 'yellow', textShadowRadius: 10}]}>{time} </Text>
    </TouchableOpacity>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    // height: 350,
    maxHeight: 200,
    minHeight: 100,
    paddingHorizontal: 20,
    // padding: 20,
    elevation: 5, // height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff'
  },
});
