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
        <View style={[styles.container, { marginVertical: margin ? 20 : 0 }, otherContainerStyle]}>
            <Image
                style={[styles.image, otherImageStyle]}
                accessibilityLabel={desc}
                resizeMode="contain"
                source={imageSource}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6bea8140',
        width: 90,
        height: 90,
        padding: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    image: {
        width: 60,
        height: 60

    },
})

export default AnicureImage
