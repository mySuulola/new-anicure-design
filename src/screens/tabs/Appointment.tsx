import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import AnicureButton from '../../components/AnicureButton'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import PastAppointmentCard from '../../components/PastAppointmentCard'
import Toggle from '../../components/Toggle'
import UpcomingAppointmentCard from '../../components/UpcomingAppointmentCard'
import apiFetch from '../../utils/apiFetch'
import { APP_GREEN } from '../../utils/constant'
import { dayMonthYear, logError, minuteSecond } from '../../utils/helpers'

const Appointment = ({ navigation, mobileNumber }: any) => {
    const [isUpComing, setIsUpComing] = useState(true)

    const [allBookings, setAppointments] = useState([]);

    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchAllAppointments()
    }, [isUpComing])

    const fetchAllAppointments = async () => {
        try {
            setIsLoading(true);
            setGeneralError("Loading")
            const requestModel = { mobileNumber, isUpcoming: isUpComing }
            const networkRequest: any = await apiFetch.post("call/schedule/user", requestModel);
            if (networkRequest.status && networkRequest.data) {
                setIsLoading(false);
                const filteredData = networkRequest.data.filter((item: any) => item?.schedule?.paymentStatus === "paid" && item?.schedule?.type !== "chat");
                setAppointments(filteredData);
                return;
            }
            setAppointments([])
            logError(networkRequest, setGeneralError, setIsLoading);
        } catch (error) {
            logError(error, setGeneralError, setIsLoading);
        }
    }

    const handleOpenCall = async (user: any) => {
        try {
            const { doctor } = user;
            const requestModel = { recipient: doctor.mobileNumber, sender: mobileNumber, callType: "call" }
            const networkRequest: any = await apiFetch.post("call/create/user", requestModel);
            if (networkRequest.status === true) {
                const data = { payload: { channelName: networkRequest.data.channelName, agoraToken: networkRequest.data.agoraToken } };
                console.log(data, 'data')
                return navigation.navigate("VideoCall", data);
            }
            ToastAndroid.show(networkRequest.message ?? "Call Failed", ToastAndroid.LONG);
            return;
        } catch (error) {
            console.log(error, 'error is')
            ToastAndroid.show(error.message ?? "Call Failed", ToastAndroid.LONG);
        }
    }

    const handleCancelAppointment = () => {
        ToastAndroid.show("Functionality to cancel not available at the moment", ToastAndroid.LONG);
        // navigation.navigate("Search");
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar
                back={false}
                navigation={navigation}
                trailingIcon="ios-notifications">
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
                    onPress={() => { }}
                    containerStyle={{ width: 180, backgroundColor: '#FFFFFF', marginBottom: 10 }}
                    titleOne="Upcoming"
                    titleTwo="Completed"
                    switchState={isUpComing}
                    setSwitchState={setIsUpComing}
                />
                {
                    isLoading ?
                        <View style={{ paddingVertical: 20 }}>
                            <ActivityIndicator
                                size="large"
                                color={APP_GREEN}
                            />
                            <AnicureText type="subTitle" text={generalError} />
                            <AnicureButton
                                width={200}
                                textBtn={true}
                                title="Reload"
                                onPress={fetchAllAppointments}
                            />
                        </View>
                        :
                        <View style={{ width: "100%", paddingHorizontal: 20, flex: 1, marginBottom: 30 }}>
                            {
                                (allBookings.length === 0 && isUpComing === true) &&
                                <AnicureText otherStyles={{ paddingHorizontal: 20, paddingTop: 20 }} type="subTitle" text={'You have no Pending Appointment. Kindly click on the Search Tab to book an appointment to have a session with a Veterinary Doctor'} />
                            }
                            {
                                (allBookings.length === 0 && isUpComing === false) &&
                                <AnicureText otherStyles={{ paddingHorizontal: 20, paddingTop: 20 }} type="subTitle" text={'No Past/Completed appointments.'} />

                            }
                            {isUpComing ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={fetchAllAppointments}
                                        />
                                    }
                                    refreshing={refreshing}
                                    data={allBookings}
                                    // ListEmptyComponent={<AnicureText text="No data" type="subTitle" />}
                                    renderItem={({ item, index, separators }: any) =>
                                        <UpcomingAppointmentCard
                                            onCall={() => handleOpenCall(item)}
                                            doctorImage={{ uri: item.doctor.photo }}
                                            doctorName={item.doctor.fullName}
                                            amount={item.schedule.type}
                                            time={minuteSecond(item.schedule.time)}
                                            title={item.doctor.title}
                                            location={item?.location?.state ?? "Online"}
                                            date={dayMonthYear(item.schedule.day)}
                                            clinicName={item.doctor.clinicName}
                                            clinicAddress={item.doctor.clinicAddress}
                                            bio={item.doctor.bio}
                                            onChat={() => navigation.navigate("ChatScreen", { payload: { name: item.doctor.fullName, photo: item.doctor.photo, doctor: item.doctor.mobileNumber } })}
                                            onCancel={handleCancelAppointment}
                                        />
                                    }
                                    keyExtractor={(item: any, index: number) => item.schedule._id}
                                />
                                :
                                <FlatList
                                    showsVerticalScrollIndicator={false}

                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={fetchAllAppointments}
                                        />
                                    }
                                    refreshing={refreshing}
                                    data={allBookings}
                                    renderItem={({ item, index, separators }: any) =>
                                        <PastAppointmentCard
                                            item={item}
                                            onPress={() => navigation.navigate("PastAppointmentDetail", { payload: item })}
                                            key={item} />
                                    }
                                    keyExtractor={(item: any, index: number) => item.schedule._id}
                                />

                            }
                        </View>}
            </View>

            {/*  */}

        </View>

    )
}
const mapStateToProps = (state: any) => {
    const { mobileNumber } = state.user.userDetail;
    return {
        mobileNumber,
    }
};

export default connect(mapStateToProps)(Appointment)



const styles = StyleSheet.create({})
