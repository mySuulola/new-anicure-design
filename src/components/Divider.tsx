import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface IDivider {
    otherStyles?: StyleProp<ViewStyle>,
    width?: string | number;
    height?: number,
    noSpace?: boolean,
}

const Divider = ({ width, height, noSpace, otherStyles }: IDivider) => {
    return (
        <View
            style={[noSpace ? styles.secondContainer: styles.container, {
                width: width ?? "100%",
                height: height ?? 1,
            }, otherStyles]}
        />
    )
}

export default Divider

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 7,
        backgroundColor: "#707070",
        opacity: 0.3
    },
    secondContainer: {
        backgroundColor: "#707070",
        opacity: 0.3
    },
})
