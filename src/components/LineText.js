import React from 'react'
import { View, Text } from 'react-native'

const LineText = ({ title, text }) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{text}</Text>
        </View>
    )
}

export default LineText
