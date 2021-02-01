import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface IAnicureText{
    type: string,
    text: string,
    otherStyles?: Object
}

const AnicureText = ({ type, text, otherStyles } : IAnicureText) => {
    return (
        <Text style={[type === "title" ? styles.title : styles.subTitle, otherStyles]}>
          {text}
        </Text>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    // marginVertical: 10,
    color: "#1F1742",
    textAlign: 'center',
    fontFamily: "Roboto-Bold",
    paddingHorizontal: 20
  },
  subTitle: {
    fontSize: 12,
    color: "#777779",
    fontFamily: "Roboto-Regular",
    marginVertical: 5,
    textAlign: "center",
  }
})

export default AnicureText
