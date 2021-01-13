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

var ApplozicChat = NativeModules.ApplozicChat;

const {height, width} = Dimensions.get('screen');

const HomeScreen = ({navigation, fullName, phoneNumber, email, vaccines}) => {

  return (
    <View style={styles.container}>
     
      <ScrollView>
        <View style={styles.topHeader}>
          <View
            style={{
              flex: 1,
              paddingTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                  }}>
                  Good Afternoon,
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                  }}>
                  {fullName}
                </Text>
              </View>
              <View>
                {/* <Button
                  dark
                  compact
                  // icon="plus"
                  uppercase={false}
                  color="#228b22"
                  mode="contained"
                  onPress={() => navigation.navigate('Vaccination')}>
                  View Plans
                </Button> */}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            margin: 20,
            height: 250,
          }}>
          <ImageBackground
            style={{
              height: '100%',
            }}
            imageStyle={{borderRadius: 20}}
            source={require('../../assets/img/birds.jpeg')}>
            <View
              style={{
                // flex: 1,
                marginTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Secure your animals
                </Text>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Contact a Vet Doctor Today
                </Text>
              </View>
              {/* <Button
                dark
                icon="cart-plus"
                // icon="help-rhombus"
                compact
                uppercase={false}
                color="#ffa500"
                mode="contained"
                style={{
                  height: 40,
                }}
                onPress={() => {}}>
                Make Order
              </Button> */}
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {/* <Button
                dark={false}
                icon="doctor"
                compact
                uppercase={false}
                color="#fff"
                mode="contained"
                style={{
                  height: 40,
                }}
                onPress={() =>
                  ApplozicChat.login(
                    {
                      userId: phoneNumber,
                      password: 'anicureUser',
                      authenticationTypeId: 1,
                      email: email,
                      contactNumber: phoneNumber,
                      displayName: fullName,
                    },
                    (err, res) => {
                      console.log(res, err);
                      ApplozicChat.openChatWithUser('Anicure');
                    },
                  )
                }>
                Speak to Vet Doctor
              </Button>
              <Button
                dark={false}
                icon="account-group-outline"
                compact
                uppercase={false}
                color="#fff"
                mode="contained"
                style={{
                  height: 40,
                }}
                onPress={() =>
                  ApplozicChat.login(
                    {
                      userId: phoneNumber,
                      password: 'anicureUser',
                      authenticationTypeId: 1,
                      email: email,
                      contactNumber: phoneNumber,
                      displayName: fullName,
                    },
                    (err, res) => {
                      ApplozicChat.openChatWithClientGroupId(
                        'anicureUserChatRoom',
                        (err, res) => {
                          console.log(err);
                          console.log(res);
                        },
                      );
                    },
                  )
                }>
                Group Chat
              </Button>
             */}
            
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                }}>
                You currently have {vaccines.length} plan(s)
              </Text>
            </View>
            <View
              style={{
                marginTop: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Button
                dark
                icon="help-rhombus"
                compact
                uppercase={false}
                color="blueviolet"
                mode="contained"
                style={{
                  height: 40,
                }}
                onPress={() => navigation.navigate('Tips')}>
                Helpful Tips
              </Button> */}
            </View>
          </ImageBackground>
         
        </View>

        <View
          style={{
            padding: 20,
            paddingBottom: 30,
            marginHorizontal: 20,
            marginBottom: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(34, 139, 34, 0.7)',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
            }}>
            About Anicure
          </Text>
          <Text
            style={{
              color: '#fff',
            }}>
            Create a Vaccination/Medication Plan to cater to the need of your
            animals and get prompt reminder when vaccination is due.
          </Text>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Button
              compact
              icon="plus"
              uppercase={false}
              color="#fff"
              mode="contained"
              onPress={() => navigation.navigate('Vaccination', { screen: 'VCreate' })}>
              Create Vaccination Plan
            </Button> */}
          </View>
        </View>
      </ScrollView>
    </View>
  ); //just kind loving humble
};

const mapStateToProps = (state) => {
  const {fullName, phoneNumber, email} =  state.user.userDetail.userDetail
  const {allVaccines} =  state.vaccine
  return {
    vaccines: allVaccines,
    fullName,
    phoneNumber,
    email,
  };
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
