import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'
import commonStyling from '../../styles/GeneralStyling';

const VerifyPhoneNumber = ({ navigation, route }: any) => {

    const { phoneNumber, OTPValue } = route.params;
    const [OTP, setOTP] = useState("");

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
                        text={phoneNumber}
                        type="subTitle"
                    />
                    <View style={commonStyling.cardContainer}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={commonStyling.registrationWhiteSheet}>
                            <AnicureTextInput
                                fieldValue={OTP}
                                setFieldState={setOTP}
                                rules={{ type: "match", minLength: 5, value: OTPValue }}
                                validation={true}
                                width={"100%"}
                                maxLength={6}
                                keyboardType="numeric"
                                decoratorIcon="cellphone-message"
                                placeholder="OTP"
                                autoFocus={true}
                            />
                            <AnicureButton
                                otherStyles={commonStyling.continueButton}
                                title="Continue"
                                onPress={() => navigation.navigate("AddProfileDetails")}
                                width={250}
                            />
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
