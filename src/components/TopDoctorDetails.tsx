import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import AnicureText from './AnicureText'

interface DocDetails {
    otherStyles?: StyleProp<ViewStyle>,
    name: string,
    title: string,
    rating: string,
    bio: string,
    reviewCount: number,
}

const TopDoctorDetails = ({ 
    otherStyles,
    name,
    title,
    rating,
    bio,
    reviewCount
 }: DocDetails) => {
    return (
        <View style={[{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            backgroundColor: "#FFFFFF",
        }, otherStyles]}>
            <View style={[{
                flexDirection: "row",
                width: "100%",
                paddingTop: 20,
                justifyContent: "space-between",

            }]}>
                <View >
                    <AnicureText
                        text={name}
                        type="title"
                        otherStyles={{ textAlign: "left", fontSize: 20, fontFamily: "Roboto-Medium", maxWidth: 200 }}
                    />
                    <AnicureText
                        text={title}
                        otherStyles={{ marginVertical: 0, textAlign: "left", fontSize: 15, color: "#216B36", fontFamily: "Roboto-Medium" }}
                        type="subTitle" />
                </View>
                <View>
                <View style={{ backgroundColor: "#216B36", paddingHorizontal: 12, borderRadius: 10, height: 50, justifyContent: "center" }}>
                    <AnicureText
                        type="title"
                        text={rating}
                        otherStyles={{ color: "#FFFFFF", fontFamily: "Roboto-Regular" }}
                    />
                </View>
                <AnicureText
                    text={`${reviewCount ?? '-'} Reviews`}
                    type="subTitle"
                    otherStyles={{ color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold", marginRight: 5 }}
                />
                </View>
            </View>
                <AnicureText
                    text={bio}
                    type="subTitle"
                    left
                    otherStyles={{ 
                        color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold", width: "100%" }}
                />
        </View>
    )
}

export default TopDoctorDetails

const styles = StyleSheet.create({})
