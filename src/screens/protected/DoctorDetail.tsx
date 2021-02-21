import React, { useState } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, View, ScrollView, Image, Platform, Alert } from 'react-native'
import AnicureButton from '../../components/AnicureButton';
import AnicureText from '../../components/AnicureText';
import Appbar from '../../components/Appbar'
import BookingDetailCard from '../../components/BookingDetailCard';
import CustomModal from '../../components/CustomModal';
import Divider from '../../components/Divider';
import { ImageTextRow } from '../../components/ImageTextRow';
import TopDoctorDetails from '../../components/TopDoctorDetails';
import { APP_GREEN } from '../../utils/constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageButton from '../../components/ImageButton';
import PaystackWebView from "react-native-paystack-webview";
import SuccessModal from '../../components/SuccessModal';

const { height, width } = Dimensions.get('screen');



const bookingOptions = [
    {
        title: "One Off Appointment",
        width: 150,
        amount: 500,
        frequency: "Day",
    },
    {
        title: "Farm Call Service",
        width: 130,
        amount: 1000,
        frequency: "One Time",

    },
    {
        title: "Subscription Plan",
        width: 130,
        amount: 1000,
        frequency: "Month",

    },
]

type StatusTypes = "up" | "down";

const DoctorDetail = ({ navigation, route }: any) => {

    const { payload } = route.params;

    let formattedConsultationTime = "";

    if(payload.consultationTime.length) {
        payload.consultationTime.map((item: { day: string, time: string }) => (
            formattedConsultationTime += `${item.day} - ${item.time ? item.time : "Unavailable"}\n`
        ))
    }


    console.log('object', formattedConsultationTime)

    const [dropDown, setDropDown] = useState<StatusTypes>('down')
    const [modalState, setModalState] = useState({ value: false, name: "", amount: 0 })

    const [selectedPeriod, setSelectedPeriod] = useState({ date: new Date(), time: new Date() });
    const [mode, setMode] = useState<any>('date');
    const [show, setShow] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState({ value: false, message: "", title: "", type: "" });

    const handleOpenChat = () => {
        setIsSuccessModalOpen({ value: true, message: "Sorry, You do not have permission to use this feature. Kindly subscribe to a plan to continue", title: "Subscribe to Chat", type: "chat" })
    }
    const handleOpenCall = () => {
        setIsSuccessModalOpen({ value: true, message: "You currently do not have an appointment with this doctor at this time. Kindly book an appointment and try at that time", title: "Book an appointment", type: "call" })
    }
    const onChange = (event: any, selectedDate: any) => {
        setShow(false);

        const timestamp = event.nativeEvent.timestamp;

        if (mode === "date") {
            const currentDate = new Date(timestamp) || selectedDate.date;
            setSelectedPeriod({ date: currentDate, time: selectedPeriod.time })
        } else {
            const currentDate = new Date(timestamp) || selectedDate.time;
            setSelectedPeriod({ date: selectedPeriod.date, time: currentDate })
        }
    };

    const showMode = (currentMode: any) => {
        console.log('heyyyyy')
        setShow(true);
        setMode(currentMode);
    };


    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/svg/profile.png")}
                // resizeMode="contain"
                style={{ width: "100%", height: height / 2.5, justifyContent: "space-between" }}>
                <Appbar
                    back={true}
                    navigation={navigation}
                    trailingIcon="ios-notifications"
                />
                <TopDoctorDetails
                    name={payload.name}
                    title={payload.title}
                    rating={payload.rating}
                    reviewCount={payload.reviewCount}
                    bio={payload.bio}
                />
            </ImageBackground>
            <View style={{ flex: 1 }}>
                <View style={{
                    paddingBottom: 20,
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    borderBottomEndRadius: 20,
                    borderBottomStartRadius: 20,
                    // marginBottom: 20, 
                    paddingTop: 3,
                    backgroundColor: "#FFFFFF"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <ImageTextRow status="location"
                            text={payload.location}
                            // distance="1.3 Km from you" 
                            OtherStyles={styles.mt_10} />
                        <ImageTextRow status="wallet" text={`N${payload.chargePerSession}/session`} OtherStyles={styles.mt_10} />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <ImageTextRow OtherStyles={{ minWidth: 200 }} status="location" type="large" text={payload.clinicName} distance={payload.clinicAddress} />
                        <ImageTextRow
                            isButton={true}
                            onPress={handleOpenCall}
                            OtherStyles={{ minWidth: 200 }} status="call" type="large" text="Call" />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <ImageTextRow
                            OtherStyles={{ minWidth: 200 }}
                            status="time"
                            type="large"
                            text="Consultation Time"
                            distance={formattedConsultationTime}
                            availability={payload.availability}
                        />
                        <ImageTextRow isButton={true} onPress={handleOpenChat} OtherStyles={{ minWidth: 200 }} status="chat" type="large" text="Chat" />
                    </View>
                </View>
                <View style={{
                    alignItems: "flex-end",
                    paddingHorizontal: 20,
                }} >
                    <AnicureButton
                        title="View all reviews"
                        width={120}
                        height={20}
                        onPress={() => { }}
                        textBtn={true}
                    />
                </View>

                <View style={{ width: "100%", paddingHorizontal: 20, marginBottom: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        marginLeft: 10,
                        marginBottom: 5,
                    }} >
                        <AnicureText
                            text="Book an Appointment"
                            type="subTitle"
                            left
                            otherStyles={{ marginLeft: 10, fontFamily: "Roboto-Bold" }}
                        />

                    </View>
                    <View style={dropDown === "up" && {
                        borderWidth: 1.5,
                        borderTopWidth: 0,
                        paddingBottom: 20,
                        borderColor: APP_GREEN,
                        borderRadius: 30,
                    }} >
                        <AnicureButton
                            dropDown={dropDown}
                            title="Select a Plan"
                            onPress={() => dropDown === "up" ? setDropDown("down") : setDropDown("up")}
                            otherStyles={{ borderRadius: 50 }}
                        />
                        {dropDown === "up" && <View style={{ paddingHorizontal: 20 }} >
                            {
                                bookingOptions.map(option => (
                                    <AnicureButton
                                        key={option.title}
                                        title={option.title}
                                        width={option.width}
                                        onPress={() => setModalState({ value: true, name: option.title, amount: option.amount })}
                                        textBtn={true}
                                    />
                                ))
                            }
                        </View>}
                    </View>
                </View>
            </View>


            {/*  */}
            <CustomModal modalState={modalState.value}>
                <View style={styles.modal}>
                    <View style={styles.rowBetween}>
                        <AnicureText text="Booking Confirmation" type="title" otherStyles={{ fontSize: 16, flex: 1 }} />
                        <ImageButton
                            onPress={() => setModalState({ value: false, name: "", amount: 0 })}
                            imageSource={require("../../assets/svg/close.png")}
                        />
                    </View>
                    <Divider otherStyles={{ marginBottom: 0, marginTop: 5 }} />

                    <TopDoctorDetails
                        name={payload.name}
                        title={payload.title}
                        rating={payload.rating}
                        reviewCount={payload.reviewCount}
                        bio={payload.bio}
                        otherStyles={styles.topDoctorDetails}
                    />
                    <View style={styles.row}>
                        <ImageTextRow status="location" text={payload.location}
                            // distance="1.3 Km from you" 
                            OtherStyles={styles.mt_10} />
                        <ImageTextRow status="wallet" text={`N${payload.chargePerSession}/session`} OtherStyles={styles.mt_10} />
                    </View>
                    <Divider noSpace />
                    <AnicureText text={modalState.name} type="title" otherStyles={styles.modalTitleText} />

                    <BookingDetailCard
                        label="Date"
                        value={selectedPeriod.date.toDateString()}
                        onPress={() => showMode("date")}
                        imageType="calender"
                    />
                    <BookingDetailCard
                        label="Time"
                        value={selectedPeriod.time.toTimeString()}
                        onPress={() => showMode("time")}
                        imageType="dropdown"
                    />
                    <View style={[styles.rowBetween, { paddingHorizontal: 5, marginTop: 20 }]} >
                        <ImageTextRow
                            type="large"
                            status="wallet" text={`${modalState.amount} Naira/${+modalState.amount === 500 ? "Day" : "Month"}`} OtherStyles={{ marginTop: 0 }} />
                        <PaystackWebView
                            buttonText="Subscribe"
                            showPayButton={true}
                            paystackKey="pk_live_e668ccf16b42a2e7c5d8ff80b0312db1402cc219"
                            amount={modalState.amount}
                            billingEmail="evetafrica@gmail.com"
                            billingMobile="07086479300"
                            refNumber={Date.now()}
                            // autoStart={false}
                            billingName="Evet Africa"
                            SafeAreaViewContainer={{ borderWidth: 1, borderColor: 'red', alignItems: "flex-end" }}
                            SafeAreaViewContainerModal={{ borderWidth: 1, borderColor: 'red' }}
                            ActivityIndicatorColor={APP_GREEN}
                            onSuccess={async (tranRef: any) => { console.log(tranRef) }}
                            onCancel={async () => {
                                console.log('Something went wrong');
                                // API CALL 
                                // Sends SMS and Email to the user confirming their payment.
                                // Update the Database Object to reflect that.
                                // update redux state to also reflect that
                                setModalState({ value: false, name: "", amount: 0 })
                                setIsSuccessModalOpen({ value: true, message: "Booking Successful", title: "Successful", type: "booking" });
                            }}
                            renderButton={(onPress: any) => (
                                <AnicureButton
                                    width={80}
                                    height={35}
                                    onPress={onPress}
                                    title="Book"
                                />
                            )}
                        />

                    </View>
                </View>
            </CustomModal>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={false}
                    minimumDate={new Date()}
                    display="default"
                    onChange={onChange}
                />
            )}
            <SuccessModal
                title={isSuccessModalOpen.title}
                description={isSuccessModalOpen.message}
                operationType={isSuccessModalOpen.type}
                onClose={() => {
                    setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                }}
                actionPress={() => {

                    setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                    if (isSuccessModalOpen.type === "booking") {
                        navigation.navigate("Appointment");
                    } else if (isSuccessModalOpen.type === "chat") {
                        // to paystack
                        // then to chat
                        navigation.navigate("ChatScreen", { payload: { name: "Doc 1", sender: "08130943146", recipient: "07061972413" } })

                    } else {
                        setIsSuccessModalOpen({ value: false, message: "", title: "", type: "" });
                    }
                }}
                //{ value: false, message: "", title: "", type: "" }
                modalState={isSuccessModalOpen.value}
                actionText={isSuccessModalOpen.type === "call" ? "Okay" : isSuccessModalOpen.type === 'booking' ? "Go To Appointment" : isSuccessModalOpen.type === 'chat' ? 'Subscribe(N1000)' : 'Subscribe(N1000)'}
            />

        </ScrollView>
    )
}

export default DoctorDetail

const styles = StyleSheet.create({
    bookingDetails: {
        marginTop: 20
    },
    modalTitleText: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20
    },
    topDoctorDetails: {
        width: "100%",
        // borderWidth: 1,
        paddingHorizontal: 0,
        marginHorizontal: 0
    },
    row: {
        flexDirection: "row"
    },
    mt_10: {
        marginTop: 10
    },
    my_0: {
        marginVertical: 0
    },
    modal: {
        flex: 1,
        width: width - 80,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
})
