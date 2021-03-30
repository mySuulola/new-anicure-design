import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import AnicureText from './AnicureText'

interface IToggle {
    setSwitchState: (value: boolean) => void,
    switchState: Boolean,
    titleOne: string,
    titleTwo: string,
    // titleOneOnPress: any,
    // titleTwoOnPress: any,
    containerStyle: StyleProp<ViewStyle>,
    onPress: any,

}

const Toggle = ({ onPress, setSwitchState, switchState, titleOne, titleTwo, containerStyle }: IToggle) => {
    return (
        <View style={[{ justifyContent: "center", alignItems: "center", borderRadius: 50, flexDirection: "row" }, containerStyle]} >
            <TouchableOpacity onPress={() => {
                setSwitchState(true);
                onPress()
            }} style={{ backgroundColor: switchState ? "#216B36" : "#FFFFFF", borderRadius: 25, paddingHorizontal: 20, paddingVertical: 6 }}>
                <AnicureText text={titleOne} type="subTitle" otherStyles={{ color: switchState ? "#FFFFFF" : "#216B36", fontFamily: "Roboto-Medium" }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setSwitchState(false);
                onPress()
            }} style={{ backgroundColor: switchState ? "#FFFFFF" : "#216B36", paddingHorizontal: 30, borderRadius: 25, paddingVertical: 6 }}>
                <AnicureText text={titleTwo} type="subTitle" otherStyles={{ color: switchState ? "#216B36" : "#FFFFFF", fontFamily: "Roboto-Medium" }} />
            </TouchableOpacity>
        </View>
    )
}

export default Toggle

const styles = StyleSheet.create({})
