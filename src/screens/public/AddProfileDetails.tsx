import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import FormInput from '../../components/FormInput'
import { APP_GREEN } from '../../utils/constant'
import { passwordValidation, emailValidation, confirmPasswordValidation, fullNameValidation } from '../../utils/validation'
import commonStyling from '../../styles/GeneralStyling';
import apiFetch from '../../utils/apiFetch'
import { logError } from '../../utils/helpers'

const AddProfileDetails = ({ navigation, route }: any) => {

    const { mobileNumber } = route.params;

    const [fullName, setFullName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const handleRegistration = async () => {

        try {
            setIsLoading(true);

            // VALIDATIONS
            const emailError = emailValidation(email, setEmail);
            const passwordError = passwordValidation(password, setPassword);
            const confirmPasswordError = confirmPasswordValidation(password.value, confirmPassword, setConfirmPassword);
            const fullNameError = fullNameValidation(fullName, setFullName);

            if (emailError || passwordError || confirmPasswordError || fullNameError) {
                setIsLoading(false)
                return;
            }
            //TODO: API to register user and send OTP
            setIsLoading(false);

            const requestModel = {
                mobileNumber,
                email: email.value,
                password: password.value,
                fullName: fullName.value
            }
            const networkRequest: any = await apiFetch.post("users/register/user", requestModel);
            if (networkRequest.status === true) {
                navigation.push("CreateFarm", { mobileNumber });
                return;
            }
            logError(networkRequest, setGeneralError, setIsLoading);

        } catch (error) {
            logError(error, setGeneralError, setIsLoading);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar navigation={navigation} back={true} title="Step 2/3" />
            <ScrollView>
                <View style={commonStyling.registrationContainer} >
                    <AnicureImage
                        imageSource={require("../../assets/svg/profile.png")}
                        desc={"profile"}
                        margin={true}
                    />
                    <AnicureText
                        text="Add Profile Details"
                        type="subTitle"
                        otherStyles={{ color: "#1F1742", fontFamily: "Roboto-Bold", fontSize: 14 }}
                    />

                    <AnicureText
                        text="Fill in your personal details"
                        type="subTitle"
                    />

                    <View style={commonStyling.cardContainer}>
                        <View style={commonStyling.registrationWhiteSheet}>

                            <AnicureText
                                text={generalError}
                                type="error"
                            />
                            <FormInput
                                labelName="Full Name"
                                value={fullName.value}
                                error={fullName.error}
                                autoCapitalize="none"
                                onChangeText={(name: string) => setFullName({ value: name, error: fullName.error })}
                            />
                            <FormInput
                                labelName="Email Address"
                                value={email.value}
                                error={email.error}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={(name: string) => setEmail({ value: name, error: email.error })}
                            />

                            <FormInput
                                labelName="Password"
                                icon="password"
                                value={password.value}
                                error={password.error}
                                secureTextEntry={true}
                                onChangeText={(userPassword: string) => setPassword({ value: userPassword, error: password.error })}
                            />

                            <FormInput
                                labelName="Re-enter Password"
                                icon="password"
                                value={confirmPassword.value}
                                error={confirmPassword.error}
                                secureTextEntry={true}
                                onChangeText={(userPassword: string) => setConfirmPassword({ value: userPassword, error: confirmPassword.error })}
                            />

                            {(isLoading == false) ? (
                                <AnicureButton
                                    otherStyles={{ marginTop: 40 }}
                                    title="Continue"
                                    onPress={handleRegistration}
                                    width={"100%"}
                                />
                            ) : (
                                    <ActivityIndicator
                                        size="large"
                                        color={APP_GREEN}
                                    />
                                )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default AddProfileDetails

const styles = StyleSheet.create({})
