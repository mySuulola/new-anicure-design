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
import { stateAndLocalGovt } from '../../utils/nigeria_state'

const CreateFarm = ({ navigation, route, updateUserDetail }: any) => {

    const { mobileNumber } = route.params;

    const [farmName, setFarmName] = useState({ value: "", error: "" });
    const [farmAddress, setFarmAddress] = useState({ value: "", error: "" });
    const [localGovernment, setLocalGovernment] = useState({ value: "", error: "" });
    const [stateProvince, setStateProvince] = useState({ value: "", error: "" });
    const [userCategory, setUserCategory] = useState({ value: "", error: "" });

    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState({ value: false, payload: "" })
    const [generalError, setGeneralError] = useState("");

    const handleCreateFarm = async () => {
        try {
            setIsLoading(true);

            // VALIDATIONS
            const farmNameError = farmNameValidation(farmName, setFarmName);
            const userCategoryError = farmNameValidation(userCategory, setUserCategory);
            const farmAddressError = farmAddressValidation(farmAddress, setFarmAddress);
            const localGovernmentError = farmNameValidation(localGovernment, setLocalGovernment);
            const stateError = farmNameValidation(stateProvince, setStateProvince);

            if (userCategoryError || farmNameError || farmAddressError || localGovernmentError || stateError) {
                setIsLoading(false)
                return;
            }
            //TODO: API to register user and send OTP
            const requestModel = {
                mobileNumber,
                name: farmName.value,
                userCategory: userCategory.value,
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
    const [localGovtOptions, setLocalGovtOptions] = useState<Array<any>>([])

    const getLocalGovernment = (state: string) => {

        setStateProvince({ value: state, error: stateProvince.error })
        let arr: Array<any> = [{ name: "Select Local Government of Residence", value: "" }];
        const userState = stateAndLocalGovt.filter(
            (item: any) => item.value === state,
        );
        if (userState.length > 0) {
            for (let item of userState[0].lgas) {
                arr.push({ name: item, value: item });
            }
        }
        setLocalGovtOptions(arr);
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar navigation={navigation} back={true} title="Step 3/3" />
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
                                type="dropdown"
                                options={[
                                    { name: "Select One- Farmer or Pet Owner", value: "" },
                                    { name: "Farmer", value: "farm" },
                                    { name: "Pet Owner", value: "pet" },
                                ]}
                                labelName="User Category"
                                selectedValue={userCategory.value}
                                error={userCategory.error}
                                onValueChange={(text: string) => setUserCategory({ value: text, error: userCategory.error })}
                            />

                            {
                                userCategory.value === "farm" ?
                                    <>
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
                                    </>
                                    :
                                    userCategory.value === "pet" ?
                                        <>
                                            <FormInput
                                                labelName="Pet Type"
                                                placeholder="Ex. Dog, Cat etc"
                                                value={farmName.value}
                                                error={farmName.error}
                                                autoCapitalize="none"
                                                onChangeText={(name: string) => setFarmName({ value: name, error: farmName.error })}
                                            />
                                            <FormInput
                                                labelName="Breed of Pet"
                                                value={farmAddress.value}
                                                error={farmAddress.error}
                                                autoCapitalize="none"
                                                onChangeText={(name: string) => setFarmAddress({ value: name, error: farmAddress.error })}
                                            />
                                        </>
                                        : null
                            }

                            <FormInput
                                type="dropdown"
                                options={stateAndLocalGovt}
                                labelName="State of Residence"
                                selectedValue={stateProvince.value}
                                error={stateProvince.error}
                                onValueChange={(text: string) => getLocalGovernment(text)}
                            />

                            <FormInput
                                type="dropdown"
                                options={localGovtOptions}
                                labelName="Local Government"
                                selectedValue={localGovernment.value}
                                error={localGovernment.error}
                                onValueChange={(text: string) => setLocalGovernment({ value: text, error: localGovernment.error })}
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
