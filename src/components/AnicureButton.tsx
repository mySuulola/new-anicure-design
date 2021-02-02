import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface IAnicureButton {
    title: string,
    onPress: any,
    textColor?: string,
    width?: any,
    height?: number,
    textBtn?: boolean,
    boldText?: boolean,
    btnColor?: string,
    otherStyles?: Object,
    fontSize ?: number,
    icon?: string,
    iconColor?: string,
}

const AnicureButton = ({
  title, 
  onPress, 
  textColor, 
  btnColor, 
  width, 
  textBtn, 
  otherStyles, 
  fontSize ,
  height,
  icon,
  iconColor,
} : IAnicureButton) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[{ 
            width: width ?? '100%', 
            height: height ?? 50,
            justifyContent: "center",
            backgroundColor: btnColor ? btnColor : textBtn  ? "transparent" : "#216B36", 
            paddingVertical: 12, 
            borderRadius: 15, 
            flexDirection: "row",
            alignItems: "center" }, otherStyles]}>
          {(icon && icon.length > 2) &&
          <EntypoIcon
            name={icon}
            size={15}
            color={iconColor ? iconColor : "#619E42"}
            style={{marginRight: 5}}
          />
        }
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
