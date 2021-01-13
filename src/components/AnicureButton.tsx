import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface IAnicureButton {
    title: string,
    onPress: any,
    textColor?: string,
    width?: any,
    textBtn?: boolean,
    boldText?: boolean,
    btnColor?: string,
    otherStyles?: Object,
    fontSize ?: number,
}

const AnicureButton = ({title, onPress, textColor, btnColor, width, textBtn, boldText, otherStyles, fontSize } : IAnicureButton) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[{ 
            width: width ?? '100%', 
            backgroundColor: btnColor ?? textBtn ? "transparent" : "green", 
            paddingVertical: 12, 
            marginTop: 10,
            borderRadius: textBtn ? 0 : 10, 
            alignItems: "center" }, otherStyles]}>
        <Text style={{
          color: textColor ? textColor : textBtn ? "green" : "#fff",
          fontSize: fontSize ?? 18,
          fontWeight: boldText === false ? "normal" : "bold",
        }} >{title}</Text>
      </TouchableOpacity>
    )
}

export default AnicureButton
