import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface IAnicureText{
    type: string,
    text: string,
    // color?: string,
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
    fontWeight: 'bold',
    fontSize: 27,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#000",
    marginVertical: 5,
    textAlign: 'center',
    // paddingHorizontal: 20
  }
})

export default AnicureText
