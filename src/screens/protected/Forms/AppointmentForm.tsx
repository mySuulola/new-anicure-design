import React, { useState } from 'react'
import { ScrollView, Alert, StyleSheet, View, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux';
import AnicureButton from '../../../components/AnicureButton';
import AnicureImage from '../../../components/AnicureImage';
import AnicureText from '../../../components/AnicureText';
import Appbar from '../../../components/Appbar';
import FormInput from '../../../components/FormInput';
import Paystack from '../../../components/Paystack';
import SuccessModal from '../../../components/SuccessModal';
import commonStyling from '../../../styles/GeneralStyling';
import apiFetch from '../../../utils/apiFetch';
import { APP_GREEN } from '../../../utils/constant';
import { logError, minuteSecond, monthDayYear } from '../../../utils/helpers';
import { farmNameValidation, farmAddressValidation, generalTextFieldValidation } from '../../../utils/validation';
import { updateUserDetail } from '../../../store/actions/userAction';

const AppointmentForm = ({ navigation, user, route, updateUserDetail }: any) => {

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState({ value: false, message: "", title: "", type: "" });

    const [farmName, setFarmName] = useState({ value: user.farmDetails.name, error: "" });
    const [farmAddress, setFarmAddress] = useState({ value: user.farmDetails.address, error: "" });
    const [animalCategory, setAnimalCategory] = useState({ value: "", error: "" });
    const [age, setAge] = useState({ value: "", error: "" });
    const [stockSize, setStockSize] = useState({ value: "", error: "" });
    const [affectedSize, setAffectedSize] = useState({ value: "", error: "" });
    const [symptoms, setSymptoms] = useState({ value: "", error: "" });

    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState({ status: false, value: "" });

    const [generalError, setGeneralError] = useState("");

    const { selectedPeriod, doctor, transaction } = route?.params.payload;
    const { time, date } = selectedPeriod;


    const handleSubmitForm = async () => {
        try {
            setIsLoading(true);
            setGeneralError("")
            // VALIDATIONS
            const farmNameError = farmNameValidation(farmName, setFarmName);
            const farmAddressError = farmAddressValidation(farmAddress, setFarmAddress);
            const animalCategoryError = generalTextFieldValidation(animalCategory, setAnimalCategory);
            const ageError = generalTextFieldValidation(age, setAge);
            const stockSizeError = generalTextFieldValidation(stockSize, setStockSize);
            const symptomsError = generalTextFieldValidation(symptoms, setSymptoms);
            const affectedError = generalTextFieldValidation(affectedSize, setAffectedSize);

            if (farmNameError || farmAddressError ||
                animalCategoryError || ageError ||
                stockSizeError || symptomsError
                || affectedError
            ) {
                ToastAndroid.show("Form Data missing", ToastAndroid.LONG);
                setIsLoading(false)
                return false;
            }
            const requestModel = {
                doctor: doctor.mobileNumber,
                user: user.mobileNumber,
                farmerName: user.fullName,
                type: transaction.type,
                amount: `${transaction.amount}`,
                farmName: farmName.value,
                farmAddress: farmAddress.value,
                animalCategory: animalCategory.value,
                age: age.value,
                stockSize: stockSize.value,
                symptoms: symptoms.value,
                time,
                day: date,
            }

            const networkRequest: any = await apiFetch.post("call/schedule/create", requestModel);

            if (networkRequest.status === true) {
                setIsFormSubmitted({ status: true, value: networkRequest?.data?.id })
            } else {
                logError(networkRequest, setGeneralError, setIsLoading);
            }
        } catch (error) {
            logError(error, setGeneralError, setIsLoading);
        }
    };

    const handleSuccessfulPayment = async (tranRef: string) => {
        try {
            console.log(tranRef)
            const requestModel = {
                user: user.mobileNumber,
                doctor: doctor.mobileNumber,
                amount: `${transaction.amount}`,
                service: transaction.type,
                paymentId: tranRef,
                scheduleId: isFormSubmitted.value
            }
            const networkRequest = await apiFetch.post("payment/create", requestModel);

            if (networkRequest.status) {
                //UPDATE USER OBJECT
                await updateUserDetail({ userDetail: networkRequest.data });
                if (transaction.type === "chat") {
                    setIsSuccessModalOpen({ value: true, message: "You can chat up any of the vet doctors with your questions now", title: "Chat Subscription Successful", type: "chat" });
                } else {
                    setIsSuccessModalOpen({ value: true, message: "Booking Successful", title: "Successful", type: "booking" });
                }
                return;
            }
            ToastAndroid.show(networkRequest?.message ?? "Error completing payment", ToastAndroid.LONG);
            setIsSuccessModalOpen({ value: true, message: "An error occurred while processing your transaction. Please contact support on 07061972413 via phone, chat or SMS to get this resolved", title: "Contact Support", type: "error" });
        } catch (error) {
            ToastAndroid.show(error?.message ?? "Error completing payment", ToastAndroid.LONG);
            setIsSuccessModalOpen({ value: true, message: "An error occurred while processing your transaction. Please contact support on 07061972413 via phone, chat or SMS to get this resolved", title: "Contact Support", type: "error" });
        }


    }

    const handleCancelPayment = () => {
        ToastAndroid.show("Payment Cancelled. Appointment will not be processed until payment is made", ToastAndroid.LONG);
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Appbar navigation={navigation} back={true} title="Complete Booking Process" />
                <ScrollView keyboardShouldPersistTaps="always" >
                    <View style={commonStyling.registrationContainer} >
                        <AnicureImage
                            imageSource={require("../../../assets/images/doctor_thumbnail.png")}
                            desc={"profile"}
                            margin={true}
                        />
                        <AnicureText
                            text={`Schedule Appointment with ${doctor.fullName}`}
                            type="subTitle"
                            otherStyles={{ color: "#1F1742", fontFamily: "Roboto-Bold", fontSize: 14 }}
                        />

                        <AnicureText
                            text="Fill in the necessary information"
                            type="subTitle"
                        />
                        {/* minuteSecond(), date: monthDayYear() */}
                        <AnicureText
                            text={`You have selected ${minuteSecond(time)} on ${monthDayYear(date)}`}
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
                                    textarea
                                    labelName="Farm Address"
                                    value={farmAddress.value}
                                    error={farmAddress.error}
                                    autoCapitalize="none"
                                    onChangeText={(name: string) => setFarmAddress({ value: name, error: farmAddress.error })}
                                />

                                <FormInput
                                    type="dropdown"
                                    options={[
                                        { name: "Select Category", value: "" },
                                        { name: "Layers", value: "Layers" },
                                        { name: "Broilers", value: "Broilers" },
                                        { name: "Turkey", value: "Turkey" },
                                        { name: "Catfish", value: "Catfish" },
                                        { name: "Tilapia", value: "Tilapia" },
                                        { name: "Cattle", value: "Cattle" },
                                        { name: "Pets", value: "Pets" },
                                        { name: "Goat/Sheep", value: "Goat/Sheep" },
                                        { name: "Pig", value: "Pig" },
                                        { name: "Others", value: "Others" },
                                    ]}
                                    labelName="Animal Category"
                                    selectedValue={animalCategory.value}
                                    error={animalCategory.error}
                                    onValueChange={(text: string) => setAnimalCategory({ value: text, error: animalCategory.error })}
                                />
                                <FormInput
                                    labelName="Age of Animals(Weeks)"
                                    value={age.value}
                                    error={age.error}
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => setAge({ value: text, error: age.error })}
                                />

                                <FormInput
                                    labelName="Total Stock Size"
                                    value={stockSize.value}
                                    error={stockSize.error}
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => setStockSize({ value: text, error: stockSize.error })}
                                />

                                <FormInput
                                    labelName="Number of Mortality"
                                    value={affectedSize.value}
                                    error={affectedSize.error}
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => setAffectedSize({ value: text, error: affectedSize.error })}
                                />

                                <FormInput
                                    textarea
                                    labelName="Signs Observed / Complaints"
                                    value={symptoms.value}
                                    error={symptoms.error}
                                    onChangeText={(text: string) => setSymptoms({ value: text, error: symptoms.error })}
                                />

                                {(isLoading == false) ? (
                                    <View>
                                        { isFormSubmitted.status === false && <AnicureButton otherStyles={{ marginVertical: 20 }} title="Submit" onPress={handleSubmitForm} />}
                                        { isFormSubmitted.status === true &&
                                            <Paystack
                                                onSuccess={async (tranRef: any) => handleSuccessfulPayment(tranRef)}
                                                amount={2}//{transaction.amount}
                                                actionText={"Make Payment to complete booking"}
                                                handleFirstOperation={handleSubmitForm}
                                                width={"100%"}
                                                onCancel={handleCancelPayment}
                                            />}
                                    </View>
                                ) : (
                                    <ActivityIndicator
                                        size="large"
                                        color={APP_GREEN}
                                    />
                                )}
                            </View>
                        </View>
                        <SuccessModal
                            title={isSuccessModalOpen.title}
                            description={isSuccessModalOpen.message}
                            operationType={isSuccessModalOpen.type}
                            onClose={() => {
                                if (isSuccessModalOpen.type === "booking") {
                                    navigation.navigate("Appointment");
                                    return;
                                }
                                setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                            }}
                            actionPress={() => {
                                setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                                if (isSuccessModalOpen.type === "booking") {
                                    navigation.navigate("Appointment");
                                } else if (isSuccessModalOpen.type === "chat") {
                                    setIsSuccessModalOpen({ value: true, message: "Subscription Successful", title: "Successful", type: "chatSuccess" });
                                } else if (isSuccessModalOpen.type === "chatSuccess") {
                                    navigation.navigate("Search")
                                    // navigation.navigate("ChatScreen", { payload: { name: 'payload.name', sender: "08130943146", recipient: "07061972413" } })
                                } else {
                                    setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                                }
                            }}
                            //{ value: false, message: "", title: "", type: "" }
                            modalState={isSuccessModalOpen.value}
                            actionText={isSuccessModalOpen.type === "chatSuccess" ? "Go to Message" : isSuccessModalOpen.type === "call" ? "Okay" : isSuccessModalOpen.type === 'booking' ? "Go To Appointment" : isSuccessModalOpen.type === 'chat' ? 'Subscribe(N1000)' : 'Okay'}
                        />
                    </View>
                </ScrollView>

            </View>
        </>
    )

}

const mapStateToProps = (state: any) => ({
    user: state.user.userDetail
});

export default connect(mapStateToProps, { updateUserDetail })(AppointmentForm);

const styles = StyleSheet.create({

})
