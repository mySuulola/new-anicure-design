import React from 'react'
import { Modal, StyleSheet, Text, ScrollView, View, ActivityIndicator } from 'react-native'

interface ICustomModal {
    modalState: boolean,
    children: any,
}

const CustomModal = ({
    modalState,
    children,
}: ICustomModal) => {
    return (
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={modalState}
        >
            <View style={{
                backgroundColor: "#000000D0",
                // opacity: 0.7,
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
            }} >
                <View
                    style={{
                        backgroundColor: "#FFFFFF",
                        // marginBottom: 100,
                        // marginHorizontal: 40,
                        borderRadius: 10,
                        // borderTopStartRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 30,
                        width: "100%",
                        // maxWidth: 500,
                        alignItems: "center"
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({})
