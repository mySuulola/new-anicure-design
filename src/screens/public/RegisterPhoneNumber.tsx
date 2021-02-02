import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'
import commonStyling from '../../styles/GeneralStyling'

const { width, height } = Dimensions.get("screen")

const RegisterPhoneNumber = ({ navigation }: any) => {

    const [phoneNumber, setPhoneNumber] = useState("")

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
                            <AnicureTextInput
                                fieldValue={phoneNumber}
                                setFieldState={setPhoneNumber}
                                width={"100%"}
                                rules={{ type: "number", maxLength: 12, minLength: 10 }}
                                validation={true}
                                maxLength={11}
                                keyboardType="phone-pad"
                                decoratorIcon="cellphone-basic"
                                placeholder="Phone Number"
                                autoFocus={true}
                            />
                            <AnicureButton
                                otherStyles={commonStyling.continueButton}
                                title="Continue"
                                onPress={() => navigation.push("VerifyPhoneNumber", { phoneNumber })}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default RegisterPhoneNumber

const styles = StyleSheet.create({})
