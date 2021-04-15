import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Dimensions, View, ScrollView, ToastAndroid } from 'react-native'
import AnicureButton from '../../components/AnicureButton';
import Appbar from '../../components/Appbar'
import Divider from '../../components/Divider';
import { ImageTextRow } from '../../components/ImageTextRow';
import TopDoctorDetails from '../../components/TopDoctorDetails';
import BookAppointmentButton from '../../components/BookAppointmentButton';
import { connect } from 'react-redux';
import SuccessModal from '../../components/SuccessModal';

const { height, width } = Dimensions.get('screen');

const chatDetail = {
    title: "Chat Consultation",
    value: 'chat',
    width: 130,
    amount: 1000,
    frequency: "Month",
    description: "Chat with a Vet Doctor at your convenience"
};

const callDetail = {
    title: "Voice/Video Consultation",
    value: 'call',
    width: 180,
    amount: 500,
    frequency: "Session",
    description: "To book a Video/Voice Consultation, it requires you choose the date and time the vet will be available online, pay and then access your vet. NB Each video consultation last 15mins, an extension attracts extra fee."
}

const DoctorDetail = ({ navigation, route, mobileNumber, subscription }: any) => {

    const { payload } = route.params;

    const [timeExpanded, setTimeExpanded] = useState({ show: true, display: true })
    const [modalDetail, setModalDetails] = useState({ value: false, message: "", title: "", type: "" });
    const [buttonModalState, setButtonModalState] = useState<{ value: boolean, option: any }>({ value: false, option: {} })

    // FORMAT CONSULTATION TIME
    let formattedConsultationTime = "";
    if (payload?.consultationTime) {
        const allTimes: any = Object.values(payload.consultationTime)
        const allDays: any = Object.keys(payload.consultationTime)
        if (allDays.length) {
            allDays.map((item: any, index: number) => {
                formattedConsultationTime += `${allDays[index].toUpperCase()} - ${allTimes[index].start} to ${allTimes[index].end}\n`
            })
        }
    }

    const handleOpenChat = () => {
        if (subscription?.chat?.status) {
            navigation.navigate("ChatScreen", { payload: { name: payload.fullName, doctor: payload.mobileNumber, photo: payload.photo } });
            return;
        }
        setModalDetails({ value: true, message: "Sorry, You do not have permission to use this feature. Kindly subscribe to the chat consultation plan below to continue", title: "Subscribe to Chat", type: "chatError" })
    }
    const handleOpenCall = async () => {
        try {
            if (subscription?.call?.status) {
                ToastAndroid.show("Choose Schedule to make call", ToastAndroid.LONG);
                navigation.navigate("Appointment");
                return;
            }
            setModalDetails({ value: true, message: "You currently do not have an appointment with this doctor at this time. Kindly book an appointment below and try at that time", title: "Book an appointment", type: "callError" })
        } catch (error) {
            ToastAndroid.show(error?.message ?? "Call Failed", ToastAndroid.LONG);
        }
    }


    return (
        <ScrollView style={styles.flex}>
            <ImageBackground
                source={{ uri: payload.photo }}
                // resizeMode="contain"
                style={styles.imageBackground}>
                <Appbar
                    back={true}
                    navigation={navigation}
                    trailingIcon="ios-notifications"
                />
                <TopDoctorDetails
                    name={payload.fullName}
                    title={payload.title}
                    rating={payload.rating}
                    reviewCount={payload.ratingCount}
                    bio={payload.bio}
                />
            </ImageBackground>
            <View style={styles.flex}>
                <View style={styles.lowerPart}>
                    <View style={styles.row}>
                        <ImageTextRow status="location"
                            text={payload.location.state}
                            // distance="1.3 Km from you" 
                            OtherStyles={styles.mt_10} />
                        <ImageTextRow
                            status="wallet"
                            text={`N${payload.chargePerSession}/session`}
                            OtherStyles={styles.mt_10}
                        />
                    </View>
                    <Divider />
                    <View style={styles.infoContainer}>
                        <ImageTextRow
                            OtherStyles={styles.min200}
                            status="location"
                            type="large"
                            text={payload.clinicName}
                            distance={payload.clinicAddress}
                        />
                        <ImageTextRow
                            isButton={true}
                            onPress={handleOpenCall}
                            status="call" type="large" text="Call" />
                    </View>
                    <View style={styles.infoContainer}>
                        <ImageTextRow
                            OtherStyles={styles.min200}
                            status="time"
                            type="large"
                            text="Consultation Time"
                            showMore={timeExpanded}
                            onPressShowMore={() => setTimeExpanded({ display: true, show: !timeExpanded.show })}
                            distance={!timeExpanded.show ? formattedConsultationTime : `${formattedConsultationTime.substring(0, 26)}...`}
                            availability={payload.availability}
                        />
                        <ImageTextRow
                            isButton={true}
                            onPress={handleOpenChat}
                            status="chat" type="large" text="Chat"
                        />
                    </View>
                </View>
                <View style={styles.reviewContainer} >
                    <AnicureButton
                        title="View all reviews"
                        width={120}
                        height={20}
                        onPress={() => { }}
                        textBtn={true}
                    />
                </View>
                <BookAppointmentButton
                    title="Book an Appointment"
                    payload={payload}
                    navigation={navigation}
                    modalState={buttonModalState}
                    setModalState={setButtonModalState}
                />
            </View>
            <SuccessModal
                title={modalDetail.title}
                description={modalDetail.message}
                operationType={(modalDetail.type === "callError" || modalDetail.type === "callError") ? "error" : modalDetail.type}
                onClose={() => {
                    setModalDetails({ value: false, message: "", title: "", type: "" });
                }}
                actionPress={() => {
                    setModalDetails({ value: false, message: "", title: "", type: "" });
                    if (modalDetail.type === "chatError") {
                        setButtonModalState({
                            value: true,
                            option: chatDetail
                        })
                        return;
                    } else if (modalDetail.type === "callError") {
                        setButtonModalState({
                            value: true,
                            option: callDetail
                        })
                        return;
                    }
                }}
                modalState={modalDetail.value}
                actionText={modalDetail.type === "callError" ? "Subscribe(N500/session)" : modalDetail.type === "chatError" ? "Subscribe(N1000/month)" : "Okay"}
            />
        </ScrollView >
    )
}

const mapStateToProps = (state: any) => {
    return ({
        subscription: state.user.userDetail.subscription,
        mobileNumber: state.user.userDetail.mobileNumber,
    })
}

export default connect(mapStateToProps, null)(DoctorDetail)

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    bookingDetails: {
        marginTop: 20
    },
    topDoctorDetails: {
        width: "100%",
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
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    imageBackground: {
        width: "100%",
        height: height / 2.5,
        justifyContent: "space-between"
    },
    lowerPart: {
        paddingBottom: 20,
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingHorizontal: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingTop: 3,
        backgroundColor: "#FFFFFF"
    },
    min200: { minWidth: 200 },
    reviewContainer: {
        alignItems: "flex-end",
        paddingHorizontal: 20,
    },


})
