import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface IRating {
    rating: number,
}

const Rating = ({ rating }: IRating) => {
    let stars = []
    for (let i = 0; i < 5; i++) {
        if (i >= rating) {
            stars.push(require("../assets/svg/star_unfilled.png"));
        } else {
            stars.push(require("../assets/svg/star_filled.png"));
        }
    }

    return <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
        {stars.map((item, index) => (
            <Image
                key={index}
                source={item}
                style={{ width: 10, height: 10, marginRight: 3 }}
            />
        )
        )}
    </View>
}

export default Rating

const styles = StyleSheet.create({})
