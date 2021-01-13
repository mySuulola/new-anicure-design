import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {connect} from 'react-redux';
import {userLogin, clearError} from '../../store/actions/userAction';

import TextButton from '../../components/TextButton';

const {height, width} = Dimensions.get('screen');

const LoginScreen = ({userLogin,clearError, navigation, error}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  


  const handleLogin = async () => {
    if(email === "" || password === "") {
      error = "Enter a valid email and password"
      return;
    }
    setIsLoading(true)
    await clearError();
    await userLogin({email, password});
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollView]}>
      <View
        style={{
          flex: 1,
          // borderWidth: 2,
          // borderColor: 'red',
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <Image
          style={styles.image}
          source={require('../../assets/img/login.png')}
        />

        <View
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            maxHeight: 60,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: 'rgba(170, 170, 170, 0.9)',
              paddingVertical: 0,
              marginVertical: 0,
              textAlign: 'center'
            }}>
            Sign in to continue!
          </Text>
          <Text
          style={{
            color: 'red',
            paddingVertical: 0,
            marginVertical: 0,
            fontSize: 10,
            textAlign: 'center'
          }}
          >{error}</Text>

        </View>
        <FormInput
          labelName="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
          labelName="6 Digit PIN"
          maxLength={6} 
          value={password}
          secureTextEntry={true}
          keyboardType="numeric"
          onChangeText={(userPassword) => setPassword(userPassword)}
        />
        {( isLoading == false) ? (
          <FormButton
            title="Login"
            modeValue="contained"
            
            onPress={handleLogin}
            labelStyle={styles.loginButtonLabel}
          />
        ) : (
          <ActivityIndicator size="large" color="#228b22" />
        )}
        
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FormButton
          title="New user? Join here"
          modeValue="text"
          uppercase={false}
          onPress={() => navigation.navigate('Signup')}
          labelStyle={styles.navButtonText}
        />
        <TextButton
          onPress={() => navigation.navigate('Tips')}
          text="Click here to get Helpful Tips to protect your birds.."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    //flex: 1,
    minHeight: height - 90,

    alignItems: 'center',
    justifyContent: 'space-between',
    //    borderWidth: 1,
    //  borderColor: 'red'
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  titleText: {
    fontSize: 17,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 20,
  },
  navButtonText: {
    fontSize: 13,
  },
});

const mapStateToProps = (state) => {
  console.log(state.error.authError)
  console.log('=============')
  return ({
  error: state.error.authError,
})};

export default connect(mapStateToProps, {clearError, userLogin})(LoginScreen);
