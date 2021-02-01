import React, { useState } from 'react'
import { KeyboardAvoidingView, Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'

const { width, height } = Dimensions.get("screen")

const RegisterPhoneNumber = ({ navigation }: any) => {

    const [phoneNumber, setPhoneNumber] = useState("")

    return (
        <View style={{ 
            flex: 1, 
            alignItems: "center"
             }}>
            <Appbar navigation={navigation} back={true} title="Step 1/3" />
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
                otherStyles={{ fontWeight: "normal", paddingHorizontal: 40 }}
            />
            <View style={{
                flex: 1,
                width: "80%",
                alignItems: "center",
                marginHorizontal: 40,
                marginTop: 20
            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ 
                        width: "100%", 
                        // alignItems: "center", 
                        backgroundColor: "#fff", 
                        paddingVertical: 40, 
                        paddingHorizontal: 10, 
                        borderRadius: 10
                         }}>
                    <AnicureTextInput
                        fieldValue={phoneNumber}
                        setFieldState={setPhoneNumber}
                        rules={{ type: "number", maxLength: 12, minLength: 10 }}
                        validation={true}
                        maxLength={11}
                        keyboardType="phone-pad"
                        decoratorIcon="cellphone-basic"
                        placeholder="Phone Number"
                        autoFocus={true}
                    />
                    <AnicureButton
                        otherStyles={{ marginTop: 30, width: '100%' }}
                        title="Continue"
                        onPress={() => navigation.push("VerifyPhoneNumber", {phoneNumber})}
                    />
                </KeyboardAvoidingView>
            </View>

        </View>
    )
}

export default RegisterPhoneNumber

const styles = StyleSheet.create({})
