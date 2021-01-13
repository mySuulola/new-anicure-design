import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

interface IAnicureImage {
    imageSource: any,
    desc: string,
    margin?: boolean,
}

const AnicureImage = ({ imageSource, desc, margin }: IAnicureImage) => {
    return (
        <View style={[styles.container, { marginVertical: margin ? 20 : 0 }]}>
            <Image
                style={styles.image}
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
        width: 100,
        height: 100,
        padding: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 70,
        height: 70
    },
})

export default AnicureImage
