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
                {top && (<>
                    <View style={styles.ellipse} />
                    <View style={styles.ellipse} />
                </>)}
                <AnicureImage imageSource={imageSource} desc={text} />
                {bottom && <>
                    <View style={styles.ellipse} />
                    <View style={styles.ellipse} />
                </>}
            </View>
            <View style={styles.textContainer}>
                <AnicureText 
                otherStyles={{fontSize: 14, }}
                text={text} 
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
        width: 7,
        height: 7,
        backgroundColor: "#6bea81a8",
        borderRadius: 50,
        marginBottom: 3,
        marginTop: 3,
    },
    textContainer: { marginLeft: 20, flexShrink: 1 },

})

export default StartedRow
