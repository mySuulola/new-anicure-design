import React from 'react'
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import AnicureText from './AnicureText'
import Divider from './Divider'

type ImageType = 'calender' | 'dropdown'

interface IBooking {
    label: string,
    value: string,
    imageType: ImageType,
    onPress: () => void,
    otherStyles?: StyleProp<ViewStyle>

}

const BookingDetailCard = ({ label, value, imageType, onPress, otherStyles }: IBooking) => {
    return (
        <View style={styles.container}>
            <View style={[styles.row, otherStyles]}>
                <View>
                    <AnicureText left otherStyles={styles.label} text={label} type="subTitle" />
                    <AnicureText left otherStyles={styles.value} text={value} type="subTitle" />
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Image
                        source={imageType === "calender" ? require("../assets/images/calender.png") : require("../assets/images/dropdown_new.png")}
                        resizeMode="contain"
                        style={imageType === "calender" ? styles.calenderImg : styles.dropdownImg}
                    />
                </TouchableOpacity>
            </View>
            <Divider otherStyles={styles.divider} />
        </View>
    )
}

export default BookingDetailCard

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        marginVertical: 0,
        marginBottom: 5,
    },
    value: {
        marginVertical: 0,
        color: "#000000",
        fontFamily: "Roboto-Bold"
    },
    dropdownImg: {
        width: 15,
        height: 20,
        marginRight: 5,
    },
    calenderImg: {
        width: 30,
        height: 20
    },
    divider: {
        marginTop: 2,
        marginBottom: 10,
    }
})
