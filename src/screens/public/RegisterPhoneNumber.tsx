import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, ToastAndroid, Dimensions, Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'
import commonStyling from '../../styles/GeneralStyling'
import apiFetch from '../../utils/apiFetch'
import { APP_GREEN } from '../../utils/constant'

const { width, height } = Dimensions.get("screen")

const RegisterPhoneNumber = ({ navigation }: any) => {

    const [mobileNumber, setMobileNumber] = useState("");
    const [isAPIOperation, setIsAPIOperation] = useState({ loading: false, error: "" });

    const handlePhoneRegistration = async () => {

        try {
            setIsAPIOperation({ loading: true, error: "" });
            if (!mobileNumber || mobileNumber.length !== 11) {
                setIsAPIOperation({ loading: false, error: "Invalid Phone Number" });
                return;
            }
            const requestModel = { mobileNumber: mobileNumber }
            const networkRequest: any = await apiFetch.post("users/register/phone", requestModel);

            if (networkRequest.status) {
                setIsAPIOperation({ loading: false, error: "" });
                navigation.push("VerifyPhoneNumber", { mobileNumber });
            } else {
                ToastAndroid.show(networkRequest.message ?? "", ToastAndroid.LONG);
                navigation.push("VerifyPhoneNumber", { mobileNumber });
                setIsAPIOperation({ loading: false, error: "" });
            }
        } catch (error) {
            console.log("Catch error", error.data);
            setIsAPIOperation({ loading: false, error: error?.data?.message ?? "Network Error" });
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar navigation={navigation} back={true} title="Step 1/3" />
            <ScrollView>
                <View style={commonStyling.registrationContainer}>
                    <AnicureImage
                        imageSource={require("../../assets/svg/verification.png")}
                        desc={"verification"}
                        margin={true}
                    />
                    <AnicureText
                        text="Register Your Phone Number"
                        type="subTitle"
                    />
                    <AnicureText
                        text="Enter the phone number that will receive the 6 digit OTP"
                        type="subTitle"
                    />
                    <View style={commonStyling.cardContainer}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={commonStyling.registrationWhiteSheet}>

                            <AnicureText
                                left
                                text={isAPIOperation.error}
                                type="error"
                            />
                            <AnicureTextInput
                                fieldValue={mobileNumber}
                                setFieldState={setMobileNumber}
                                width={"100%"}
                                rules={{ type: "number", maxLength: 12, minLength: 10 }}
                                validation={true}
                                maxLength={11}
                                keyboardType="phone-pad"
                                imageSource={require("../../assets/images/nigeria_flag.png")}
                                // decoratorIcon="cellphone-basic"
                                placeholder="Phone Number"
                                autoFocus={true}
                            />
                            {isAPIOperation.loading ? <ActivityIndicator
                                size="large"
                                color={APP_GREEN}
                            /> : <AnicureButton
                                    otherStyles={commonStyling.continueButton}
                                    title="Continue"
                                    onPress={handlePhoneRegistration}
                                />}
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
                    <AnicureText
                        type="subTitle"
                        text="Already have an Account?"
                        otherStyles={{ color: "#1F1742", opacity: 0.76, fontSize: 14 }}
                    />
                    <AnicureButton
                        width="20%"
                        textBtn={true}
                        fontSize={15}
                        title="Login"
                        otherStyles={{ width: 45 }}
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
            </ScrollView>
        </View>

    )
}

export default RegisterPhoneNumber

const styles = StyleSheet.create({})
