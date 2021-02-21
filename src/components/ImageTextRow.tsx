import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { APP_GREEN } from "../utils/constant";
import AnicureText from "./AnicureText";

type StatusType = 'location' | 'wallet' | 'chat' | 'call' | 'time' | 'calender';

interface ITextRow {
    text: string,
    isButton?: boolean,
    distance?: any// string,
    type?: string,
    OtherStyles?: any,
    imageStyle?: any,
    status: StatusType,
    availability?: string,
    onPress?: any,
    boldText?: boolean,
}

export const ImageTextRow = ({ text, onPress, isButton, distance, availability, type, OtherStyles, imageStyle, status, boldText }: ITextRow) => (
    <TouchableOpacity 
    disabled={!isButton}
    onPress={onPress}
    style={[{ flexDirection: "row", alignItems: type === "large" ? "center" : "flex-start", marginTop: 20 }, OtherStyles]}>
       {type === "large" && <Image source={
            status === "location" ? require("../assets/svg/location.png") :
                status === "wallet" ? require("../assets/svg/wallet.png") :
                    status === "chat" ? require("../assets/svg/chat.png") :
                        status === "call" ? require("../assets/svg/call.png") :
                            require("../assets/svg/time.png")}
            style={[{ width:  30, height: 25, marginRight: 5 }, imageStyle]}
            resizeMode="contain"
        />
}
        <View style={[]}>
            <View style={{ flexDirection: "row",   marginRight: 20, height: type === "large" ? 20 : 12, marginVertical: 0 }}>
                {type !== "large" && <Image source={
                    status === "location" ? require("../assets/svg/location.png") :
                        status === "wallet" ? require("../assets/svg/wallet.png") :
                            status === "chat" ? require("../assets/svg/chat.png") :
                                status === "call" ? require("../assets/svg/call.png") :
                                    require("../assets/svg/time.png")}
                    style={[{ width: 12, height: 12, marginRight: 5 }, imageStyle]}
                    resizeMode="contain"
                />}
             <AnicureText
                    text={text}
                    left
                    type="subTitle"
                    otherStyles={{ fontFamily: boldText ? "Roboto-Bold" : "Roboto-Regular",  color: "#1F1742", fontSize: type === "large" ? 15 : 8, marginVertical: 0, height: type === "large" ? 30 : 12,  }}
                />
            </View>
            {distance && <AnicureText
                text={distance}
                type="subTitle"
                left
                otherStyles={{ color: "#777779", fontSize: 7, marginBottom: 0, marginTop: 0,  
                marginLeft: type === "large" ? 0 : 15 
            }}
            />}
            {availability && <View style={{  flexDirection: 'row' }} >
                <AnicureText
                    text={"Availability: "}
                    type="subTitle"
                    left 
                    otherStyles={{  fontFamily: "Roboto-Bold", color: APP_GREEN, fontSize: 7, marginTop: 0 }}
                />
                <AnicureText
                    text={availability}
                    type="subTitle"
                    left
                    otherStyles={{ color: APP_GREEN, fontSize: 7, marginTop: 0, textAlign: "left", }}
                />
            </View>}
        </View>
    </TouchableOpacity>

)