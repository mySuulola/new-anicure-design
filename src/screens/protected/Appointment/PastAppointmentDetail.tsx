import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import AnicureText from '../../../components/AnicureText';
import Appbar from '../../../components/Appbar';
import BookAppointmentButton from '../../../components/BookAppointmentButton';
import PastAppointmentCard from '../../../components/PastAppointmentCard';
import Rating from '../../../components/Rating';
import Toggle from '../../../components/Toggle';
import UpcomingAppointmentCard from '../../../components/UpcomingAppointmentCard';
import { dayMonthYear, minuteSecond } from '../../../utils/helpers';

const PastAppointmentDetail = ({ navigation, route }: any) => {

    const { payload } = route.params;
    const { doctor, schedule } = payload

    const [isUpComing, setIsUpComing] = useState(true)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState({ value: false, message: "", title: "", type: "" });

    return (
        <View style={{ flex: 1 }}>
            <Appbar
                back={true}
                navigation={navigation}
                trailingIcon="ios-notifications"
            >
                <AnicureText
                    text="Appointments"
                    type="subTitle"
                />
            </Appbar>
            <View style={{
                flex: 1,
                alignItems: "center"
            }}>
                <Toggle
                    onPress={() => navigation.navigate("Appointment")}
                    containerStyle={{ width: 180, backgroundColor: '#FFFFFF', marginBottom: 10 }}
                    titleOne="Upcoming"
                    titleTwo="Past"
                    switchState={isUpComing}
                    setSwitchState={setIsUpComing}
                />
                {/*  */}
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 20, borderRadius: 30, paddingBottom: 20 }}>
                            <UpcomingAppointmentCard
                                doctorImage={{ uri: doctor.photo }}
                                doctorName={doctor.fullName}
                                amount={"1000 Naira/hr"}
                                time={minuteSecond(schedule.time)}
                                title={doctor.title}
                                location={`${doctor?.location?.lga} ${doctor?.location?.state}` ?? "Online"}
                                date={dayMonthYear(schedule.day)}
                                clinicName={doctor.clinicName}
                                clinicAddress={doctor.clinicAddress}
                                otherStyles={{
                                    paddingHorizontal: 0
                                }}
                                bio={doctor.bio}
                            />
                            <View style={{ paddingHorizontal: 0, width: "100%" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                                    <AnicureText
                                        text="4.0"
                                        type="title"
                                        otherStyles={{ fontSize: 10, color: "#0F0F0F" }}
                                    />
                                    <Rating rating={4} />
                                </View>
                                <AnicureText
                                    text="Review"
                                    type="title"
                                    left
                                    otherStyles={{ fontSize: 10, color: "#ADADAD", fontFamily: "Roboto-Regular" }}
                                />

                                <BookAppointmentButton
                                    title="Book Again"
                                    noMarginLeftText
                                    otherStyles={{ paddingHorizontal: 0 }}
                                    isSuccessModalOpen={isSuccessModalOpen}
                                    setIsSuccessModalOpen={setIsSuccessModalOpen}
                                    payload={{
                                        fullName: doctor.fullName,
                                        title: doctor.title,
                                        rating: "5",
                                        reviewCount: "0",
                                        bio: doctor.bio,
                                        location: `${doctor.location.lga} ${doctor.location.state}`,
                                        chargePerSession: "500"
                                    }}
                                    navigation={navigation}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>

    )
}

export default PastAppointmentDetail

const styles = StyleSheet.create({})

