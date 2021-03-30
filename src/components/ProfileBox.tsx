import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { APP_GREEN } from '../utils/constant'
import AnicureText from './AnicureText'
import Divider from './Divider'

interface ProfileBox {
    title: string,
    text: string,
    otherStyles?: StyleProp<ViewStyle>
}

const ProfileBox = ({ title, text, otherStyles }: ProfileBox) => {
    return (

        <View style={[styles.container, otherStyles]} >
            <AnicureText left text={title} type="subTitle" otherStyles={styles.title} />
            <AnicureText left text={text} type="subTitle" otherStyles={styles.text} />
            <Divider noSpace />
        </View>
    )
}

export default ProfileBox

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    title: {
        fontSize: 13,
        fontFamily: "Roboto-Medium"
    },
    text: {
        fontSize: 12,
        fontFamily: "Roboto-Medium",
        color: APP_GREEN,
        marginBottom: 10
    }
})
