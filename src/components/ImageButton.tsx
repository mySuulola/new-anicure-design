import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native'

interface IButton {
    onPress: () => void,
    imageSource: ImageSourcePropType,
    imageStyle?: StyleProp<ImageStyle>,
};

const ImageButton = ({ onPress, imageSource, imageStyle }: IButton) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <Image
                source={imageSource}
                style={[styles.image, imageStyle]}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}

export default ImageButton

const styles = StyleSheet.create({
    image: {
        width: 20, 
        height: 20,
    }
})
