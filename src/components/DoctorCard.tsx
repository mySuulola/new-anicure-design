import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { APP_GREEN } from '../utils/constant'
import AnicureText from './AnicureText'
import { ImageTextRow } from './ImageTextRow'
import Rating from './Rating'

const DoctorCard = ({ item, navigation }: any) => {
    return (
        <TouchableOpacity
            onPress={item.isConfirmed ? () => navigation.push("DoctorDetail", { payload: item }) : () => { }}
            style={{
                // height: 128,
                width: "100%",
                borderRadius: 20,
                padding: 10,
                backgroundColor: "#FFFFFF",
                marginBottom: 20,
                flexDirection: "row",
            }}
        >
            <View style={{
                alignItems: "center"
            }}>
                <Image
                    resizeMode="cover"
                    source={item.photo ? { uri: item.photo } : require("../assets/svg/profile.png")}
                    style={{ width: 75, height: 75, borderRadius: 20, marginBottom: 10 }}
                />

                <AnicureText
                    text={`Years of Experience: ${item.yearsOfExperience ?? ""}`}
                    type="subTitle"
                    otherStyles={{ marginVertical: 0, color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold" }}
                />
                <View style={{ flexDirection: 'row', marginBottom: 10, width: "100%" }} >
                    <AnicureText
                        text={"Availability: "}
                        type="subTitle"
                        left
                        otherStyles={{ fontFamily: "Roboto-Bold", color: APP_GREEN, fontSize: 7, marginTop: 0 }}
                    />
                    <AnicureText
                        text={item.availability}
                        type="subTitle"
                        left
                        otherStyles={{ color: APP_GREEN, fontSize: 7, marginTop: 0, textAlign: "left", }}
                    />
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
                <AnicureText
                    text={item.fullName}
                    type="title"
                    otherStyles={{ color: "#1F1742", fontSize: 20, textAlign: "left" }}
                />
                <AnicureText
                    text={item.title}
                    type="title"
                    otherStyles={{ color: "#216B36", fontSize: 15, textAlign: "left" }}
                />
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <AnicureText
                        text={`${item.rating}.0`}
                        type="title"
                        otherStyles={{ fontSize: 10, color: "#0F0F0F" }}
                    />
                    <Rating rating={+item.rating} />
                    <AnicureText
                        text={`${item?.reviewCount ?? "0"} Reviews`}
                        type="title"
                        otherStyles={{ fontSize: 10, color: "#ADADAD" }}
                    />
                </View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <ImageTextRow status="location" text={`${item.location.lga} ${item.location.state}`}
                    // distance="1.3 Km from you" 
                    />
                    <ImageTextRow status="wallet" text={`N${item.chargePerSession}/session`} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DoctorCard

const styles = StyleSheet.create({})
