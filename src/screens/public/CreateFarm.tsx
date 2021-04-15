import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import FormInput from '../../components/FormInput'
import { APP_GREEN } from '../../utils/constant'
import { farmNameValidation, farmAddressValidation } from '../../utils/validation'
import commonStyling from '../../styles/GeneralStyling';
import SuccessModal from '../../components/SuccessModal'
import { updateUserDetail } from '../../store/actions/userAction'
import { connect } from 'react-redux';
import apiFetch from '../../utils/apiFetch'
import { logError } from '../../utils/helpers'



const CreateFarm = ({ navigation, route, updateUserDetail }: any) => {

    const { mobileNumber } = route.params;

    const [farmName, setFarmName] = useState({ value: "", error: "" });
    const [farmAddress, setFarmAddress] = useState({ value: "", error: "" });
    const [localGovernment, setLocalGovernment] = useState({ value: "", error: "" });
    const [stateProvince, setStateProvince] = useState({ value: "", error: "" });

    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState({ value: false, payload: "" })
    const [generalError, setGeneralError] = useState("");

    const handleCreateFarm = async () => {
        try {
            setIsLoading(true);

            // VALIDATIONS
            const farmNameError = farmNameValidation(farmName, setFarmName);
            const farmAddressError = farmAddressValidation(farmAddress, setFarmAddress);
            const localGovernmentError = farmNameValidation(localGovernment, setLocalGovernment);
            const stateError = farmNameValidation(stateProvince, setStateProvince);

            if (farmNameError || farmAddressError || localGovernmentError || stateError) {
                setIsLoading(false)
                return;
            }
            //TODO: API to register user and send OTP
            const requestModel = {
                mobileNumber,
                name: farmName.value,
                address: farmAddress.value,
                state: stateProvince.value,
                localGovernment: localGovernment.value
            }
            const networkRequest: any = await apiFetch.post("users/register/farm", requestModel);
            if (networkRequest.status === true) {
                setIsLoading(false)
                setIsModalOpen({ value: true, payload: networkRequest.data });
                return;
            }
            logError(networkRequest, setGeneralError, setIsLoading);
        } catch (error) {
            logError(error, setGeneralError, setIsLoading);
        }
    };

    const navigateToDashboard = async () => {
        await updateUserDetail({ userDetail: isModalOpen.payload });
    }


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
                        text="Create Your Farm"
                        type="subTitle"
                        otherStyles={{ color: "#1F1742", fontFamily: "Roboto-Bold", fontSize: 14 }}
                    />

                    <AnicureText
                        text="Fill in your farm details"
                        type="subTitle"
                    />

                    <View style={commonStyling.cardContainer}>
                        <View style={commonStyling.registrationWhiteSheet}>

                            <AnicureText
                                text={generalError}
                                type="error"
                            />

                            <FormInput
                                labelName="Farm Name"
                                value={farmName.value}
                                error={farmName.error}
                                autoCapitalize="none"
                                onChangeText={(name: string) => setFarmName({ value: name, error: farmName.error })}
                            />
                            <FormInput
                                labelName="Farm Address"
                                value={farmAddress.value}
                                error={farmAddress.error}
                                autoCapitalize="none"
                                onChangeText={(name: string) => setFarmAddress({ value: name, error: farmAddress.error })}
                            />

                            <FormInput
                                labelName="State of Residence"
                                value={stateProvince.value}
                                error={stateProvince.error}
                                onChangeText={(text: string) => setStateProvince({ value: text, error: stateProvince.error })}
                            />

                            <FormInput
                                labelName="Local Government"
                                value={localGovernment.value}
                                error={localGovernment.error}
                                onChangeText={(text: string) => setLocalGovernment({ value: text, error: localGovernment.error })}
                            />

                            {(isLoading == false) ? (
                                <AnicureButton
                                    otherStyles={{ marginTop: 40 }}
                                    title="Continue"
                                    onPress={handleCreateFarm}
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
                    <SuccessModal
                        title="Successful"
                        description="Farm Created Successfully"
                        onClose={navigateToDashboard}
                        actionPress={navigateToDashboard}
                        modalState={isModalOpen.value}
                        actionText="Go To Dashboard"
                        operationType="rejoice"
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default connect(null, { updateUserDetail })(CreateFarm)

const styles = StyleSheet.create({

})
