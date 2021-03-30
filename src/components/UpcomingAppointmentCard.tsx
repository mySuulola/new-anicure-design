import React from 'react'
import { Image, StyleSheet, Dimensions, View, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'
import AnicureButton from './AnicureButton'
import AnicureText from './AnicureText'
import Divider from './Divider'
import { ImageTextRow } from './ImageTextRow'

const { width } = Dimensions.get("screen")

interface IUpcoming {
    onChat?: () => void,
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
                        <ImageTextRow OtherStyles={{ marginTop: 0 }} status="location" text={location ?? 'WorldWide'} distance="1.3 Km from you" />
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
                    title="Chat Doctor"
                    width={width / 2.7}
                    height={40}
                    onPress={onChat}
                />
                <AnicureButton
                    title="Cancel"
                    width={width / 2.7}
                    height={40}
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
