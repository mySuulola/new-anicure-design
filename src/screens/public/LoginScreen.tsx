import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux';
import { updateUserDetail } from '../../store/actions/userAction';

import Appbar from '../../components/Appbar';
import AnicureText from '../../components/AnicureText';
import AnicureButton from '../../components/AnicureButton';
import { mobileNumberValidation, passwordValidation } from '../../utils/validation';
import { APP_GREEN } from '../../utils/constant';
import apiFetch from '../../utils/apiFetch';
import { logError } from '../../utils/helpers';

const { height, width } = Dimensions.get('screen');

const LoginScreen = ({ navigation, updateUserDetail }: any) => {

  const [mobileNumber, setMobileNumber] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleLogin = async () => {

    // navigation.push("CreateFarm", { mobileNumber: mobileNumber.value });
    // return;
    ////

    try {
      setGeneralError("");
      setIsLoading(true)

      const mobileNumberError = mobileNumberValidation(mobileNumber, setMobileNumber);
      const passwordError = passwordValidation(password, setPassword);

      if (mobileNumberError || passwordError) {
        setIsLoading(false)
        return;
      }
      // API
      const requestModel = { mobileNumber: mobileNumber.value, password: password.value }
      const requestLogin: any = await apiFetch.post("users/login/", requestModel);


      if (requestLogin.status && requestLogin.data) {
        await updateUserDetail({ userDetail: requestLogin.data });
        return;
      }
      logError(requestLogin, setGeneralError, setIsLoading);
    } catch (error) {
      try {
        if (error?.data?.data === 'notConfirmed') {
          const networkRequest: any = await apiFetch.post("users/otp/resend", { mobileNumber: mobileNumber.value });
          if (networkRequest.status === true) {
            navigation.push("VerifyPhoneNumber", { mobileNumber: mobileNumber.value });
            return;
          }
          logError(error, setGeneralError, setIsLoading);
          return;
        } else if (error?.data?.data === "noUserData") {
          navigation.push("AddProfileDetails", { mobileNumber: mobileNumber.value });
        } else if (error?.data?.data === "noFarmData") {
          navigation.push("CreateFarm", { mobileNumber: mobileNumber.value });
        }
        logError(error, setGeneralError, setIsLoading);
      } catch (error) {
        logError(error, setGeneralError, setIsLoading);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollView]}>
      <Appbar
        navigation={navigation}
        back={true}
      />
      <View style={{ width: width, alignItems: "center", paddingHorizontal: 30 }}>

        <Image
          source={require("../../assets/svg/logo.png")}
          style={{ width: 100 }}
          resizeMode="cover"
        />

        <AnicureText
          text="Login to your account"
          type="subTitle"
          otherStyles={{ fontFamily: "Roboto-Medium", width: "100%", textAlign: "left", marginTop: 40, marginBottom: 10, paddingHorizontal: 20, fontSize: 15 }}
        />

        <View style={{ minHeight: 300, width: "100%", backgroundColor: "#FFFFFF", borderRadius: 10, paddingHorizontal: 20, paddingVertical: 30, }}>
          <AnicureText
            text={generalError}
            type="error"
          />
          <FormInput
            preIcon={"user"}
            value={mobileNumber.value}
            error={mobileNumber.error}
            autoCapitalize="none"
            keyboardType="numeric"
            maxLength={11}
            placeholder="Mobile Number"
            onChangeText={(text: string) => setMobileNumber({ value: text, error: mobileNumber.error })}
          />

          <FormInput
            preIcon={"lock"}
            placeholder="Password"
            icon="password"
            value={password.value}
            error={password.error}
            secureTextEntry={true}
            onChangeText={(userPassword: string) => setPassword({ value: userPassword, error: password.error })}
          />
          {(isLoading == false) ? (
            <AnicureButton
              onPress={handleLogin}
              title="Sign In"
            />
          ) : (
              <ActivityIndicator
                size="large"
                color={APP_GREEN}
              />
            )}
        </View>

        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
          <AnicureText
            type="subTitle"
            text="Don't have an Account?"
            otherStyles={{ color: "#1F1742", opacity: 0.76, fontSize: 14 }}
          />
          <AnicureButton
            width="20%"
            textBtn={true}
            fontSize={15}
            title="Sign Up"
            otherStyles={{ width: 80 }}
            onPress={() => navigation.navigate("CreateAccount")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
  },
  scrollView: {
    // flex: 1,
    // height: height - 90,
    backgroundColor: "#F4F4F4",
    // alignItems: "flex-start"
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginHorizontal: "auto"
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


export default connect(null, { updateUserDetail })(LoginScreen);
