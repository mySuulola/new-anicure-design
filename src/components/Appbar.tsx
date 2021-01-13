import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                    <MaterialCommunityIcon 
                    name="arrow-left" 
                    size={30} 
                    color={"#000"} 
                    />
                </TouchableOpacity>}
                {title && <Text 
                style={{ fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center", color: "green" }}>{title}</Text>
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
        paddingRight: 10,
        paddingLeft: 7
    }
})
