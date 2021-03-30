import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AnicureImage from './AnicureImage'
import AnicureText from './AnicureText'

interface IStartedRow {
    imageSource: string,
    text: string,
    top?: boolean,
    bottom?: boolean,
}

const StartedRow = ({ imageSource, text, top, bottom }: IStartedRow) => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <>
                    <View style={[styles.ellipse, { backgroundColor: top ? "#6bea81a8" : "transparent" }]} />
                    <View style={[styles.ellipse, { backgroundColor: top ? "#6bea81a8" : "transparent" }]} />
                </>
                <AnicureImage imageSource={imageSource} desc={text} />
                <>
                    <View style={[styles.ellipse, { backgroundColor: bottom ? "#6bea81a8" : "transparent" }]} />
                    <View style={[styles.ellipse, { backgroundColor: bottom ? "#6bea81a8" : "transparent" }]} />
                </>
            </View>
            <View style={styles.textContainer}>
                <AnicureText
                    otherStyles={{ fontSize: 14, color: "#1F1742", fontFamily: "Roboto-Bold" }}
                    text={text}
                    left
                    type="subTitle"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontWeight: 'bold',
        fontSize: 27,
        textAlign: 'center',
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    ellipse: {
        width: 2,
        height: 5,
        backgroundColor: "#6bea81a8",
        borderRadius: 50,
        marginBottom: 3,
        marginTop: 3,
    },
    textContainer: { marginLeft: 20, flexShrink: 1 },

})

export default StartedRow
