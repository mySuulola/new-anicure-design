import React from "react";
import { Image, View } from "react-native";
import AnicureText from "./AnicureText";

export const ImageTextRow = ({ text, distance, type, OtherStyles }: any) => (
    <View style={[{ marginTop: 20 }, OtherStyles]}>
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20, height: 10, marginVertical: 0 }}>
            <Image source={require("../assets/svg/star_filled.png")}
                style={{ width: type === "large" ? 30 : 10, height: type === "large" ? 20 : 10, marginRight: 5, borderWidth: 3 }}
            />
            <AnicureText
                text={text}
                type="subTitle"
                otherStyles={{ color: "#1F1742", fontSize: type === "large" ? 15 : 8, marginVertical: 0 }}
            />
        </View>
        <AnicureText
            text={distance}
            type="subTitle"
            otherStyles={{ color: "#777779", fontSize: 7, marginVertical: type === "large" ? 7 : 0, textAlign: "left", marginLeft: type === "large" ? 35 : 15 }}
        />
    </View>
)