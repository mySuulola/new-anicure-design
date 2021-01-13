import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'

const VerifyPhoneNumber = ({ navigation, route }: any) => {

    const { phoneNumber, OTPValue } = route.params;
    const [OTP, setOTP] = useState("");
    // const [milli, setmilli] = useState(initialState)

    // useEffect(() => {
    //     setTimeout()
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Appbar navigation={navigation} back={true} title="Step 1/3" />
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
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ width: "100%", alignItems: "center", backgroundColor: "#fff", paddingVertical: 40, paddingHorizontal: 10, borderRadius: 10 }}>
                    <AnicureTextInput
                        fieldValue={OTP}
                        setFieldState={setOTP}
                        rules={{ type: "match", minLength: 6, value: OTPValue }}
                        validation={true}
                        maxLength={6}
                        keyboardType="numeric"
                        decoratorIcon="cellphone-message"
                        placeholder="OTP"
                        autoFocus={true}
                    />
                    <AnicureButton
                        otherStyles={{ marginTop: 30 }}
                        title="Continue"
                        onPress={() => navigation.navigate("AddProfileDetails")}
                        width={250}
                    />
                </KeyboardAvoidingView>
                <AnicureText
                    text={"Resend Code in 5:00"}
                    type="subTitle"
                    otherStyles={{marginTop: 20}}
                />
            </View>

        </View>
    )
}

export default VerifyPhoneNumber

const styles = StyleSheet.create({})
