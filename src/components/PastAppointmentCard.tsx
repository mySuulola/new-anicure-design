import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AnicureText from './AnicureText'
import Divider from './Divider'
import Rating from './Rating'

interface IPastAppointmentCard {
    onPress: () => void
    item: any
}

const PastAppointmentCard = ({
    onPress,
    item,
}: IPastAppointmentCard) => {

    const { doctor, schedule } = item;
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: "row", backgroundColor: "#FFFFFF", padding: 10 }}>
                <Image
                    source={{uri: doctor.photo}}
                    style={{ width: 75, height: 75, borderRadius: 10, marginRight: 10, marginBottom: 10 }}
                    resizeMode="cover"
                />
                <View>
                    <AnicureText
                        text={doctor.fullName}
                        type="title"
                        otherStyles={{ color: "#1F1742", fontSize: 20, textAlign: "left" }}
                    />
                    <AnicureText
                        text={doctor.title}
                        type="title"
                        otherStyles={{ color: "#216B36", fontSize: 15, textAlign: "left" }}
                    />
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
                        left
                        type="title"
                        otherStyles={{ fontSize: 10, color: "#ADADAD", fontFamily: "Roboto-Regular" }}
                    />
                </View>
            </TouchableOpacity>
            <Divider noSpace />
        </>
    )
}

export default PastAppointmentCard

const styles = StyleSheet.create({})
