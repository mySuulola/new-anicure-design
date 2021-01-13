/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateUser} from '../../store/actions/userAction';
import {connect} from 'react-redux';
import PaystackWebView from 'react-native-paystack-webview';

const billings = [
  {
    key: 'basic',
    name: 'Basic',
    cost: 'N0/month',
    features: [
      {description: 'Unlimited Vaccination Plan', availability: true},
      {description: 'Vaccination Tracker', availability: true},
      {description: 'Forum Discussion', availability: true},
      {
        description: 'Access to a personal vet doctor',
        availability: false,
      },
      {description: 'Monthly farm visit by Vet doctor', availability: false},
      {description: 'Vaccination Plan Backup', availability: false},
    ],
  },
  {
    key: 'standard',
    name: 'Standard',
    amount: 5000,
    cost: 'N5,000/month',
    features: [
      {description: 'Unlimited Vaccination Plan', availability: true},
      {description: 'Vaccination Tracker', availability: true},
      {description: 'Forum Discussion', availability: true},
      {
        description: 'Access to a personal vet doctor',
        availability: true,
      },
      {description: 'Monthly farm visit by Vet doctor', availability: false},
      {description: 'Vaccination Plan Backup', availability: false},
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    amount: 10000,
    cost: 'N10,000/month',
    features: [
      {description: 'Unlimited Vaccination Plan', availability: true},
      {description: 'Vaccination Tracker', availability: true},
      {description: 'Forum Discussion', availability: true},
      {
        description: 'Access to a personal vet doctor',
        availability: true,
      },
      {description: 'Monthly farm visit by Vet doctor', availability: true},
      {description: 'Vaccination Plan Backup', availability: true},
    ],
  },
];

const BillingScreen = ({updateUser, plan, navigation, uid}) => {
  return (
    <View style={styles.container}>
      {/* <Appbar.Header
        style={{
          backgroundColor: '#228b22',
        }}>
        <Appbar.Content title="Billings" />
      </Appbar.Header> */}
      <ScrollView horizontal={true}>
        {billings.map((item) => (
          <View
            style={{
              //    justifyContent: 'center',
              marginTop: 30,
            }}
            key={item.key}>
            <View
              style={{
                backgroundColor: '#fff',
                maxHeight: 500,
                margin: 20,
                marginHorizontal: 10,
                alignItems: 'center',
                paddingBottom: 50,
              }}>
              {item.key === plan && (
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    textShadowColor: 'green',
                    textShadowRadius: 3,
                  }}>
                  Current Plan
                </Text>
              )}
              <Text>{item.name}</Text>
              <Text>{item.cost}</Text>
              <View>
                {item.features.map((sub) => (
                  <View
                    key={sub.description}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 10,
                      paddingHorizontal: 4,
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: 20,
                      }}>
                      {sub.description}
                    </Text>
                    {sub.availability ? (
                      <Icon name="check" size={30} color="green" />
                    ) : (
                      <Icon name="close" size={30} color="red" />
                    )}
                  </View>
                ))}
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  {item.key !== 'basic' &&
                    item.key !== plan &&
                    plan !== 'premium' && (
                      <PaystackWebView
                        buttonText="Subscribe"
                        showPayButton={true}
                        paystackKey="pk_live_e668ccf16b42a2e7c5d8ff80b0312db1402cc219"
                        amount={item.amount}
                        billingEmail="evetafrica@gmail.com"
                        billingMobile="07086479300"
                        refNumber={Date.now()}
                        billingName="Evet Africa"
                        ActivityIndicatorColor="green"
                        onSuccess={async (tranRef) => {
                          await updateUser(uid, item.key);
                          navigation.navigate('Home');
                        }}
                        onCancel={async () => {
                          console.log('Something went wrong');
                          // console.log(item.key, 'user plans', uid);
                          // await updateUser(uid, item.key);
                          // navigation.navigate('Home');
                        }}
                        renderButton={(onPress) => (
                          <Text>hi</Text>
                          // <Button
                          //   compact
                          //   icon="cash"
                          //   color="#228b22"
                          //   uppercase={false}
                          //   mode="contained"
                          //   onPress={onPress}>
                          //   Subscribe
                          // </Button>
                        )}
                      />
                    )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {plan, uid} = state.user.userDetail.userDetail;

  console.log(state.user.userDetail);
  return {
    plan: plan,
    uid,
  };
};

export default connect(mapStateToProps, {updateUser})(BillingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
