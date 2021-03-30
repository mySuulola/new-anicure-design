import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'
import commonStyling from '../../styles/GeneralStyling';
import apiFetch from '../../utils/apiFetch'
import { APP_GREEN } from '../../utils/constant'

const VerifyPhoneNumber = ({ navigation, route }: any) => {

    const { mobileNumber } = route.params;

    const [OTP, setOTP] = useState("");
    const [isAPIOperation, setIsAPIOperation] = useState({ loading: false, error: "" });


    const handleVerifyOTP = async () => {
        try {
            setIsAPIOperation({ loading: true, error: "" });
            if (!OTP || OTP.length !== 6) {
                setIsAPIOperation({ loading: false, error: "Invalid OTP" });
                return;
            }
            const requestModel = { code: OTP, mobileNumber }
            
            const networkRequest: any = await apiFetch.post("users/register/confirm/otp", requestModel);

            if (networkRequest.status) {
                setIsAPIOperation({ loading: false, error: "" });
                navigation.push("AddProfileDetails", { mobileNumber });
            } else {
                setIsAPIOperation({ loading: false, error: networkRequest?.message ?? "Network Error" });
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
                        text="Verify Your Phone Number"
                        type="subTitle"
                    />

                    <AnicureText
                        text="Enter the 6 Digit OTP that was sent to"
                        type="subTitle"
                        otherStyles={{ fontWeight: "normal", paddingHorizontal: 40 }}
                    />
                    <AnicureText
                        text={mobileNumber}
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
                                fieldValue={OTP}
                                setFieldState={setOTP}
                                rules={{ type: "number", maxLength: 6, minLength: 5 }}
                                validation={true}
                                width={"100%"}
                                maxLength={6}
                                keyboardType="numeric"
                                decoratorIcon="cellphone-message"
                                placeholder="OTP"
                                autoFocus={true}
                            />
                            {isAPIOperation.loading ? <ActivityIndicator
                                size="large"
                                color={APP_GREEN}
                            /> : <AnicureButton
                                    otherStyles={commonStyling.continueButton}
                                    title="Continue"
                                    onPress={handleVerifyOTP}
                                    width={250}
                                />}
                        </KeyboardAvoidingView>
                        <AnicureText
                            text={"Resend Code in 0:20"}
                            type="subTitle"
                            otherStyles={{ marginTop: 20, color: "#1F1742", fontFamily: "Roboto-Medium" }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default VerifyPhoneNumber

const styles = StyleSheet.create({})
