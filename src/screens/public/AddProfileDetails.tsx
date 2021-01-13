import React, { useState, useEffect } from 'react'
import { ScrollView, Platform, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureImage from '../../components/AnicureImage'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import AnicureTextInput from '../../components/TextInput'

const AddProfileDetails = ({ navigation }: any) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Appbar navigation={navigation} back={true} title="Step 2/3" />
            <AnicureImage
                imageSource={require("../../assets/svg/profile.png")}
                desc={"profile"}
                margin={true}
            />
            <AnicureText
                text="Add Profile Details"
                type="subTitle"
            />

            <AnicureText
                text="Fill in your personal details"
                type="subTitle"
                otherStyles={{ fontWeight: "normal", paddingHorizontal: 40 }}
            />

            <ScrollView style={{
                flex: 1,
                width: "100%"
                
            }}>
                <View
                    style={{ justifyContent: "center",
                    alignItems: "center",
                    width: "100%", backgroundColor: "#fff", paddingVertical: 40, borderRadius: 10 }}>
                    <AnicureText text="Full Name" type="subTitle" otherStyles={{ fontSize: 20, fontWeight: "normal" }} />
                    <AnicureTextInput
                        fieldValue={fullName}
                        setFieldState={setFullName}
                        validation={false}
                        keyboardType="default"
                    />

                    <AnicureText text="Email Address" type="subTitle" otherStyles={{ fontSize: 20, fontWeight: "normal" }} />
                    <AnicureTextInput
                        fieldValue={email}
                        setFieldState={setEmail}
                        validation={false}
                        keyboardType="email-address"
                    />

                    <AnicureText text="Password" type="subTitle" otherStyles={{ fontSize: 20, fontWeight: "normal" }} />
                    <AnicureTextInput
                        fieldValue={password}
                        setFieldState={setPassword}
                        validation={false}
                        keyboardType="default"
                        secureTextEntry={true}
                    />

                    <AnicureText text="Confirm Password" type="subTitle" otherStyles={{ fontSize: 20, fontWeight: "normal" }} />
                    <AnicureTextInput
                        fieldValue={cPassword}
                        setFieldState={setCPassword}
                        validation={false}
                        secureTextEntry={true}
                        keyboardType="default"
                    />
                    <AnicureButton
                        otherStyles={{ marginTop: 30 }}
                        title="Continue"
                        onPress={() => { }}
                        width={250}
                    />
                </View>
                
            </ScrollView>

        </View>
    )
}

export default AddProfileDetails

const styles = StyleSheet.create({})
