import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnicureButton from './AnicureButton'
import AnicureText from './AnicureText'

type StatusType = 'booking' | 'chat' | 'call';
interface ISuccessModal {
    title: string,
    description: string,
    onClose: any,
    actionPress: any,
    modalState: boolean,
    operationType?: string, //StatusType,
    actionText: string,
}

const SuccessModal = ({
    title,
    description,
    onClose,
    actionPress,
    modalState,
    actionText,
    operationType
}: ISuccessModal) => {
    return (
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={modalState}
        >
            <View style={{
                backgroundColor: "#000000D0",
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: "flex-end",
                alignItems: "center",
            }} >
                <View
                    style={{
                        backgroundColor: "#FFFFFF",
                        marginBottom: 100,
                        marginHorizontal: 40,
                        borderRadius: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 30,
                        width: "100%",
                        maxWidth: 500,
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            alignItems: "flex-end"
                        }}
                        onPress={onClose}
                    >
                        <Image
                            source={require("../assets/svg/close_modal.png")}
                            style={{ width: 14, height: 14 }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    <Image
                        source={require("../assets/svg/success.png")}
                        accessibilityHint={"successful registration"}
                        style={{ width: 150, height: 113 }}
                    />
                    <View style={{
                        // flex: 1,
                        // borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }} >
                        <AnicureText
                            text={title}
                            type="subTitle"
                            otherStyles={{
                                marginTop: 30,
                                color: "#1F1742",
                                fontFamily: "Roboto-Bold",
                                fontSize: 14
                            }}
                        />
                        <AnicureText
                            text={description}
                            type="subTitle"
                            otherStyles={{ marginBottom: 10 }}
                        />
                    </View>

                    <AnicureButton
                        otherStyles={{ marginTop: 40 }}
                        title={actionText}
                        onPress={actionPress}
                        width={"100%"}
                    />

                    {operationType === "chat" && <AnicureButton
                        textBtn={true}
                        boldText
                        title={"Maybe Later"}
                        onPress={onClose}
                        width={"100%"}
                    />}
                </View>
            </View>
        </Modal>
    )
}

export default SuccessModal

const styles = StyleSheet.create({})
