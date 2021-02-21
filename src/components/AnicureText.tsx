import React from 'react'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'

type StatusTypes = "title" | "subTitle";
interface IAnicureText{
    type: StatusTypes,
    text: string,
    left?: boolean,
    otherStyles?: StyleProp<TextStyle>
}

const AnicureText = ({ type, text, otherStyles, left } : IAnicureText) => {
    return (
        <Text style={[type === "title" ? styles.title : styles.subTitle, {textAlign: left ? "left" : "center"}, otherStyles]}>
          {text}
        </Text>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    // marginVertical: 10,
    color: "#1F1742",
    fontFamily: "Roboto-Bold",
    // paddingHorizontal: 20
  },
  subTitle: {
    fontSize: 12,
    color: "#777779",
    fontFamily: "Roboto-Regular",
    marginVertical: 5,
  }
})

export default AnicureText
