import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { APP_GREEN } from '../utils/constant'
import AnicureButton from './AnicureButton'
import AnicureText from './AnicureText'
import BookingDetailCard from './BookingDetailCard'
import CustomModal from './CustomModal'
import Divider from './Divider'
import ImageButton from './ImageButton'
import { ImageTextRow } from './ImageTextRow'
import TopDoctorDetails from './TopDoctorDetails'
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs'

const { height, width } = Dimensions.get('screen');
type StatusTypes = "up" | "down";

const bookingOptions = [
    {
        title: "Voice/Video Consultation",
        value: 'call',
        width: 180,
        amount: 500,
        frequency: "Session",
        description: "To book a Video/Voice Consultation, it requires you choose the date and time the vet will be available online, pay and then access your vet. NB Each video consultation last 15mins, an extension attracts extra fee."
    },
    {
        title: "Farm Call Service",
        value: 'farm-call',
        width: 130,
        amount: 1000,
        frequency: "Visit",
        description: "To book an appointment with a vet on your farm requires you choose the date and time the vet will be available for farm visit, Pay and then await his/her visit to your farm",

    },
    {
        title: "Chat Consultation",
        value: 'chat',
        width: 130,
        amount: 1000,
        frequency: "Month",
        description: "Chat with a Vet Doctor at your convenience"
    },
]

const BookAppointmentButton = ({
    payload,
    navigation,
    title,
    noMarginLeftText,
    otherStyles,
    modalState,
    setModalState
}: any) => {


    const daysCount: any = dayjs().set('day', 10);

    const [selectedPeriod, setSelectedPeriod] = useState({ date: new Date(daysCount), time: new Date() });
    const [mode, setMode] = useState<any>('date');
    const [show, setShow] = useState(false);
    // const [modalState, setModalState] = useState<{ value: boolean, option: any }>({ value: false, option: {} })
    const [dropDown, setDropDown] = useState<StatusTypes>('down')


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
        setShow(true);
        setMode(currentMode);
    };
    
    return (
        <>
            <View style={[{ width: "100%", paddingHorizontal: 20, marginBottom: 20 }, otherStyles]}>
                <View style={{
                    flexDirection: "row",
                    marginLeft: noMarginLeftText ? 0 : 10,
                    marginBottom: 5,
                }} >
                    <AnicureText
                        text={title}
                        type="subTitle"
                        left
                        otherStyles={{ marginLeft: noMarginLeftText ? 0 : 10, fontFamily: "Roboto-Bold" }}
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
                                    onPress={() => setModalState({ value: true, option: option })}
                                    textBtn={true}
                                />
                            ))
                        }
                    </View>}
                </View>
            </View>

            <CustomModal modalState={modalState.value}>
                <View style={styles.modal}>
                    <View style={styles.rowBetween}>
                        <AnicureText text={`Booking Confirmation`} type="title" otherStyles={{ fontSize: 16, flex: 1 }} />
                        <ImageButton
                            onPress={() => setModalState({ value: false, option: {} })}
                            imageSource={require("../assets/svg/close.png")}
                        />
                    </View>
                    <Divider otherStyles={{ marginBottom: 0, marginTop: 5 }} />

                    <TopDoctorDetails
                        name={payload.fullName}
                        title={payload.title}
                        rating={payload.rating}
                        reviewCount={payload.reviewCount}
                        bio={modalState.option.description}
                        otherStyles={styles.topDoctorDetails}
                    />
                    <View style={styles.row}>
                        <ImageTextRow status="location" text={payload.location.state}
                            // distance="1.3 Km from you" 
                            OtherStyles={styles.mt_10} />
                        <ImageTextRow status="wallet" text={`N${payload.chargePerSession}/session`} OtherStyles={styles.mt_10} />
                    </View>
                    <Divider noSpace />
                    <AnicureText text={modalState.option.title} type="title" otherStyles={styles.modalTitleText} />

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
                    <View style={[styles.rowBetween, { marginTop: 20 }]} >
                        <ImageTextRow
                            type="large"
                            status="wallet" text={`${modalState.option.amount} Naira/${modalState.option.frequency}`} OtherStyles={{ marginTop: 0 }} />
                        <AnicureButton
                            title="Book"
                            width={60}
                            onPress={() => {
                                setModalState({ value: false, option: {} })
                                navigation.navigate("AppointmentForm",
                                    {
                                        payload: {
                                            selectedPeriod: { date: selectedPeriod.date.toString(), time: selectedPeriod.time.toString() },
                                            doctor: { fullName: payload.fullName, mobileNumber: payload.mobileNumber },
                                            transaction: { amount: modalState.option.amount, type: modalState.option.value }
                                        }
                                    }
                                )
                            }}
                            otherStyles={{ borderRadius: 10, height: 35 }}
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
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: width - 80,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row"
    },
    modalTitleText: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20
    },
    modalDescriptionText: {
        fontSize: 10,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "Roboto-Bold",
        textAlign: "left"
    },
    mt_10: {
        marginTop: 10
    },
    topDoctorDetails: {
        width: "100%",
        // borderWidth: 1,
        paddingHorizontal: 0,
        marginHorizontal: 0
    },
})

export default BookAppointmentButton
