import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnicureText from './AnicureText'

const DashboardTextHighlights = ({count, description, middle} : any ) => {
    return (
        <View style={[{
            borderStartWidth: middle === true ? 1 : 0,
            borderEndWidth: middle === true ? 1 : 0,
            borderEndColor: "#FFFFFF",
            borderStartColor: "#FFFFFF",
            paddingHorizontal: 10,
            width: middle ? "40%" : "30%",
            height: 65

        }]}>
            <AnicureText 
            text={count}
            type="title"
            otherStyles={{ color: "#FFFFFF", fontSize: 25, fontFamily: "Roboto-Medium"  }}
            />

            <AnicureText 
            text={description}
            type="subTitle"
            otherStyles={{ color: "#9AFF67E6", fontSize: 10, fontFamily: "Roboto-Medium"  }}
            />
            
        </View>
    )
}

export default DashboardTextHighlights

const styles = StyleSheet.create({})
