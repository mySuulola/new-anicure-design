import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AnicureText from './AnicureText'
import { ImageTextRow } from './ImageTextRow'

const rating = (rating: number) => {
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i >= rating) {
            stars.push(require("../assets/svg/star_unfilled.png"));
        } else {
            stars.push(require("../assets/svg/star_filled.png"));
        }
    }

    return stars.map((item, index) => (
        <Image
            key={index}
            source={item}
            style={{ width: 10, height: 10 }}
        />
    )
    );
}


const DoctorCard = ({ item, navigation }: any) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.push("DoctorDetail")}
            style={{
                height: 128,
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
                    resizeMode="contain"
                    source={require("../assets/svg/profile.png")}
                    style={{ width: 75, height: 75, borderRadius: 20, marginBottom: 10 }}
                />

                <AnicureText
                    text="10 Years of Experience"
                    type="subTitle"
                    otherStyles={{ color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold" }}
                />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <AnicureText
                    text={item.name}
                    type="title"
                    otherStyles={{ color: "#1F1742", fontSize: 20, textAlign: "left" }}
                />
                <AnicureText
                    text="Vet. Surgeon"
                    type="title"
                    otherStyles={{ color: "#216B36", fontSize: 15, textAlign: "left" }}
                />
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <AnicureText
                        text="5.0"
                        type="title"
                        otherStyles={{ fontSize: 10, color: "#0F0F0F" }}
                    />
                    <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                        {rating(3)}
                    </View>
                    <AnicureText
                        text="10 Reviews"
                        type="title"
                        otherStyles={{ fontSize: 10, color: "#ADADAD" }}
                    />
                </View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <ImageTextRow text="Yaba, Lagos." distance="1.3 Km from you" />
                    <ImageTextRow text="1000 Naira/hr" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DoctorCard

const styles = StyleSheet.create({})
