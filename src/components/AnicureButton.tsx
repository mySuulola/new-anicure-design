import React from 'react'
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo';

type StatusType = "up" | "down";
interface IAnicureButton {
    title: string,
    onPress: any,
    textColor?: string,
    width?: any,
    height?: number,
    textBtn?: boolean,
    cancelBtn?: boolean,
    boldText?: boolean,
    btnColor?: string,
    otherStyles?: StyleProp<ViewStyle>,
    fontSize ?: number,
    icon?: string,
    iconColor?: string,
    dropDown?: StatusType;
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
  cancelBtn,
  dropDown,
} : IAnicureButton) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[{ 
            width: width ?? '100%', 
            height: height ?? 50,
            paddingHorizontal: dropDown ? 20 : 0,
            justifyContent: dropDown ? "space-between" : "center",
            backgroundColor: btnColor ? btnColor : (textBtn|| cancelBtn )  ? "transparent" : "#216B36", 
            paddingVertical: 12, 
            borderRadius: 15, 
            flexDirection: "row",
            borderColor: cancelBtn ? 'red' : 'transparent',
            borderWidth: cancelBtn ? 1 : 0,
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
          color: textColor ? textColor : textBtn ? "#216B36" : cancelBtn ? 'red' : "#FFFFFF",
          fontSize: fontSize ?? 14,
          fontFamily: textBtn ? "Roboto-Medium" :"Roboto-Regular" ,
          // fontWeight: boldText === false ? "normal" : "bold",
        }} >{title}</Text>
        {
          dropDown && <EntypoIcon
          name={dropDown === "up" ? "chevron-small-up" : "chevron-small-down"}
          size={20}
          color={"#FFFFFF"}
          // style={{marginRight: 5}}
        />
        }
      </TouchableOpacity>
    )
}

export default AnicureButton
