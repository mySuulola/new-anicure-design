import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

interface IAppBar {
    navigation?: any,
    back?: boolean,
    title?: string,
    trailingIcon?: string,
    margin?: boolean,
    children?: any,
    onIconClick?: any,
}

const Appbar = ({
    navigation,
    back,
    title,
    trailingIcon,
    margin,
    children,
    onIconClick
}: IAppBar) => {
    return (
        <View style={[styles.row, styles.container]}>
            <View style={styles.row}>
                {(back && navigation) ?
                    <TouchableOpacity
                        style={[styles.ml, { marginBottom: margin ? 20 : 0 }]}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/svg/back_arrow.png")}
                            style={{ width: 15, height: 13, }}
                        />
                    </TouchableOpacity> : <View style={styles.ml} /> }
                {(!children && title) && <Text
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
            {/* <View style={{ backgroundColor: "#FFFFFF", borderRadius: 15 }}> */}
            {children}
            {/* </View> */}
            <View>
                {trailingIcon &&
                    <IoniconsIcon
                        name={trailingIcon}
                        size={25}
                        color="#0F0F0F"
                        onPress={onIconClick}
                    />
                }
            </View>
        </View>
    )
}

export default Appbar

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    container: {
        width: "95%",
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "center",

    },
    ml: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30

    }
})
