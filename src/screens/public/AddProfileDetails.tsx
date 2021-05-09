import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator, ToastAndroid } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import FormInput from '../../components/FormInput'
import { APP_GREEN } from '../../utils/constant'
import { passwordValidation, emailValidation, confirmPasswordValidation, fullNameValidation, generalTextFieldValidation } from '../../utils/validation'
import commonStyling from '../../styles/GeneralStyling';
import apiFetch from '../../utils/apiFetch'
import { logError } from '../../utils/helpers'

const AddProfileDetails = ({ navigation, route }: any) => {

    const { mobileNumber } = route.params;

    const [fullName, setFullName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [referral, setReferral] = useState({ value: "", error: "" });
    const [selectedClinic, setSelectedClinic] = useState({ value: "", error: "" });
    const [clinicCode, setClinicCode] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const [allClinics, setAllClinics] = useState<Array<{ name: string, value: string }>>([])

    const handleRegistration = async () => {

        try {
            // VALIDATIONS
            const emailError = emailValidation(email, setEmail);
            const passwordError = passwordValidation(password, setPassword);
            const confirmPasswordError = confirmPasswordValidation(password.value, confirmPassword, setConfirmPassword);
            const fullNameError = fullNameValidation(fullName, setFullName);
            const affiliatedError = generalTextFieldValidation(selectedClinic, setSelectedClinic);

            if (emailError || passwordError || affiliatedError || confirmPasswordError || fullNameError) {
                return;
            }
            //TODO: API to register user and send OTP
            const clinicObject = allClinics.filter(item => item.value === selectedClinic.value)[0];

            if (clinicObject.value !== "others" && (clinicObject.value.toLowerCase() !== clinicCode.value.toLowerCase())) {
                setClinicCode(oldState => ({ ...oldState, error: "Incorrect Vet Clinic code" }));
                return;
            }
            setClinicCode(oldState => ({ ...oldState, error: "" }));  
            setIsLoading(true);
            const requestModel = {
                mobileNumber,
                email: email.value,
                password: password.value,
                fullName: fullName.value,
                affiliatedClinic: clinicObject,
                referralPhoneNumber: referral.value
            }
            const networkRequest: any = await apiFetch.post("users/register/user", requestModel);
            if (networkRequest.status === true) {
                setIsLoading(false)
                navigation.push("CreateFarm", { mobileNumber });
                return;
            }
            setIsLoading(false)
            logError(networkRequest, setGeneralError, setIsLoading);

        } catch (error) {
            setIsLoading(false)
            logError(error, setGeneralError, setIsLoading);
        }
    };

    const fetchClinics = async () => {
        try {
            const networkRequest: any = await apiFetch.get("report/clinic");
            if (networkRequest.status === true && networkRequest.data) {
                let formattedClinics: Array<{ name: string, value: string }> = [{ name: "Select One", value: "" }];
                networkRequest.data.map((item: { clinicName: string, clinicCode: string }) => (
                    formattedClinics.push({ name: item.clinicName, value: item.clinicCode })
                ))
                formattedClinics.push({ name: "None of the above", value: "others" })
                formattedClinics.push({ name: "Others", value: "others" })
                setAllClinics(formattedClinics);
                return;
            }
            ToastAndroid.show(networkRequest?.message ?? "Clinic Data not fetched", ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show(error?.message ?? "Clinic Data not fetched", ToastAndroid.LONG);
        }
    }

    useEffect(() => {
        fetchClinics()
    }, [])

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
                                type="dropdown"
                                options={allClinics}
                                labelName="Affiliated Vet Clinic"
                                selectedValue={selectedClinic.value}
                                error={selectedClinic.error}
                                onValueChange={(text: string) => setSelectedClinic({ value: text, error: selectedClinic.error })}
                            />

                            <FormInput
                                labelName="Affiliated Vet Clinic Code"
                                value={clinicCode.value}
                                error={clinicCode.error}
                                onChangeText={(text: string) => setClinicCode({ value: text, error: clinicCode.error })}
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
                            <FormInput
                                labelName="Referral Phone Number(Optional)"
                                value={referral.value}
                                keyboardType="numeric"
                                error={referral.error}
                                autoCapitalize="none"
                                onChangeText={(text: string) => setReferral({ value: text, error: referral.error })}
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
