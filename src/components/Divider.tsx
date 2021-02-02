import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Divider = ({width, height, margin}: any) => {
    return (
        <View 
        style={{
            width: width ?? "100%",
            height: height ?? 1,
            marginTop: 20,
            marginBottom: 7,
            backgroundColor: "#707070",
            opacity: 0.3
        }}
        />
    )
}

export default Divider

const styles = StyleSheet.create({})
