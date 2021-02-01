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

const AnicureButton = ({
  title, 
  onPress, 
  textColor, 
  btnColor, 
  width, 
  textBtn, 
  otherStyles, 
  fontSize 
} : IAnicureButton) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[{ 
            width: width ?? '100%', 
            height: 50,
            justifyContent: "center",
            backgroundColor: btnColor ?? textBtn ? "transparent" : "#216B36", 
            paddingVertical: 12, 
            // marginTop: 10,
            borderRadius: textBtn ? 0 : 15, 
            alignItems: "center" }, otherStyles]}>
        <Text style={{
          color: textColor ? textColor : textBtn ? "#216B36" : "#FFFFFF",
          fontSize: fontSize ?? 14,
          fontFamily: textBtn ? "Roboto-Medium" :"Roboto-Regular" ,
          // fontWeight: boldText === false ? "normal" : "bold",
        }} >{title}</Text>
      </TouchableOpacity>
    )
}

export default AnicureButton
