/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  ScrollView,
  NativeModules,
} from 'react-native';
import {connect} from 'react-redux';


const {height, width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text>hi</Text>
    </View>
  ); //just kind loving humble
};

const mapStateToProps = (state) => {
  console.log(state);
  // const {fullName, phoneNumber, email} =  state.user.userDetail.userDetail
  return {}
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 3,
    paddingBottom: 20,
    width: '100%',
  },

  topHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'red',
  },
});
