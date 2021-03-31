import React from 'react'
import { Image, StyleSheet, Dimensions, View, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'
import { APP_GREEN } from '../utils/constant'
import AnicureButton from './AnicureButton'
import AnicureText from './AnicureText'
import Divider from './Divider'
import { ImageTextRow } from './ImageTextRow'

const { width } = Dimensions.get("screen")

interface IUpcoming {
    onChat?: () => void,
    onCall: () => void,
    onCancel?: () => void,
    doctorImage: ImageSourcePropType,
    doctorName: string,
    title: string,
    bio: string,
    location?: string,
    amount: string,
    clinicName: string,
    clinicAddress: string,
    date: string,
    time: string,
    otherStyles?: StyleProp<ViewStyle>
}

const UpcomingAppointmentCard = ({
    onChat,
    onCall,
    doctorName,
    doctorImage,
    title,
    bio,
    location,
    amount,
    clinicName,
    clinicAddress,
    date,
    time,
    onCancel,
    otherStyles
}: IUpcoming) => {
    return (
        <View style={[{ width: "100%", marginTop: 20, backgroundColor: "#FFFFFF", borderRadius: 20, padding: 10 }, otherStyles]}>
            <View style={[styles.row, { marginBottom: 10 }]}>
                <Image
                    source={doctorImage}
                    style={{ width: 75, height: 75, borderRadius: 10, marginRight: 10, marginBottom: 10 }}
                    resizeMode="cover"
                />
                <View>
                    <AnicureText
                        text={doctorName}
                        type="title"
                        otherStyles={{ color: "#1F1742", fontSize: 20, textAlign: "left" }}
                    />
                    <AnicureText
                        text={title}
                        type="title"
                        otherStyles={{ color: "#216B36", fontSize: 15, textAlign: "left" }}
                    />

                    <AnicureText
                        text={bio}
                        type="subTitle"
                        left
                        otherStyles={{ marginVertical: 5, color: "#ADADAD", fontSize: 7, fontFamily: "Roboto-Bold", width: width / 1.8 }}
                    />

                    <View style={{ width: "100%", flexDirection: "row", }}>
                        <ImageTextRow OtherStyles={{ marginTop: 0 }} status="location" text={location ?? 'WorldWide'}  />
                        <ImageTextRow OtherStyles={{ marginTop: 0 }} status="wallet" text={amount} />
                    </View>
                </View>
            </View>
            {/*  */}
            <Divider noSpace />
            <ImageTextRow OtherStyles={styles.imageTextMargin} status="location" type="large" text={clinicName} distance={clinicAddress} />
            <Divider noSpace />
            <View style={{ flexDirection: "row" }}>
                <ImageTextRow OtherStyles={styles.imageTextMargin} status="calender" type="large" text={date} boldText />
                <ImageTextRow OtherStyles={styles.imageTextMargin} status="time" type="large" text={time} boldText />
            </View>
            <Divider noSpace />
            {(onCancel && onChat) && <View style={styles.rowBetween}>
                <AnicureButton
                    title="Chat"
                    width={width / 4.5}
                    height={40}
                    otherStyles={{minWidth: 80}}
                    onPress={onChat}
                />
                <AnicureButton
                    title="Initiate/Join Call"
                    width={width / 3}
                    height={40}
                    textBtn={true}
                    otherStyles={{borderWidth: 1, borderColor: APP_GREEN, minWidth: 120}}
                    onPress={onCall}
                />
                <AnicureButton
                    title="Cancel"
                    width={width / 4.5}
                    height={40}
                    otherStyles={{minWidth: 80}}
                    cancelBtn
                    onPress={onCancel}
                />
            </View>}
        </View>
    )
}

export default UpcomingAppointmentCard

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
    },
    imageTextMargin: { marginTop: 10, marginBottom: 10 }
})
