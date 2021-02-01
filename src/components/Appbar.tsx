import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'

interface IAppBar {
    navigation?: any,
    back?: boolean,
    title?: string,
    trailingText?: string,
    margin?: boolean,
}

const Appbar = ({ navigation, back, title, trailingText, margin }: IAppBar) => {
    return (
        <View style={[styles.row, styles.container]}>
            <View style={styles.row}>
                {(back && navigation) &&
                    <TouchableOpacity
                        style={[styles.ml, { marginBottom: margin ? 20 : 0 }]}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/svg/back_arrow.png")}
                            style={{ width: 15, height: 13, }}
                        />
                    </TouchableOpacity>}
                {title && <Text
                    style={{ 
                        fontSize: 15,
                        fontFamily: "Roboto-Bold",
                        flex: 1, 
                        textAlign: "center", 
                        marginRight: 20,
                        color: "#216B36" 
                    }}>{title}</Text>
                }
            </View>
            <View>
                {trailingText && <Text>{trailingText}</Text>}
            </View>
        </View>
    )
}

export default Appbar

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        width: "100%",
        marginTop: 5,
        justifyContent: "space-between"
    },
    ml: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30
        
    }
})
