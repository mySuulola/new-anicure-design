import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

interface IAnicureImage {
    imageSource: any,
    desc: string,
    margin?: boolean,
    otherImageStyle?: any,
    otherContainerStyle?: any,
}

const AnicureImage = ({ imageSource, desc, margin, otherImageStyle, otherContainerStyle }: IAnicureImage) => {
    return (
            <Image
                style={[styles.image, otherImageStyle]}
                accessibilityLabel={desc}
                resizeMode="contain"
                source={imageSource}
            />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60
    },
})

export default AnicureImage
