import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AnicureText from './AnicureText'
import Divider from './Divider'
import Rating from './Rating'

interface IPastAppointmentCard {
    onPress: () => void
}

const PastAppointmentCard = ({
onPress
}: IPastAppointmentCard) => {
    return (
        <>
            <TouchableOpacity 
            onPress={onPress}
            style={{ flexDirection: "row", backgroundColor: "#FFFFFF", padding: 10 }}>
                <Image
                    source={require("../assets/svg/profile.png")}
                    style={{ width: 75, height: 75, borderRadius: 10, marginRight: 10, marginBottom: 10 }}
                    resizeMode="contain"
                />
                <View>
                    <AnicureText
                        text={"Doc 1"}
                        type="title"
                        otherStyles={{ color: "#1F1742", fontSize: 20, textAlign: "left" }}
                    />
                    <AnicureText
                        text="Vet. Surgeon"
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
                        text="Amazing Session. Money well spent"
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
