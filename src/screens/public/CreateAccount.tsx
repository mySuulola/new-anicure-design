import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import StartedRow from '../../components/StartedRow'
import { ScrollView } from 'react-native';

const startingProcess = [
    {
        image: require("../../assets/images/register_phone.png"),
        text: "Register Your Phone Number",
        top: false,
        bottom: true
    },
    {
        image: require("../../assets/images/add_profile.png"),
        text: "Add Profile Details",
        top: true,
        bottom: true
    },
    {
        image: require("../../assets/images/create_farm.png"),
        text: "Create Your Farm",
        top: true,
        bottom: false
    },
];

const CreateAccount = ({ navigation }: any) => {
    return (
        <ScrollView style={styles.container}>
            <Appbar 
            navigation={navigation} 
            back={true} 
            />
            <AnicureText
                text="Let's Get Started"
                type="title"
                otherStyles={{ color: "#1F1742" }}
            />
            <AnicureText
                text="To create a new account you need to follow the 3 easy steps"
                type="subTitle"
                // otherStyles={{ paddingHorizontal: 20 }}
            />
            <View style={{ borderRadius: 10, backgroundColor: "#FFFFFF", marginHorizontal: 10, marginTop: 20, paddingVertical: 20, marginBottom: 20 }}>
                {startingProcess.map(detail => (
                    <StartedRow
                        key={detail.text}
                        imageSource={detail.image}
                        text={detail.text}
                        bottom={detail.bottom}
                        top={detail.top}
                    />
                ))}
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 10, marginBottom: 10 }} >
                <AnicureButton
                    onPress={() => navigation.navigate("RegisterPhoneNumber")}
                    title="Let's go!" />
            </View>
        </ScrollView>

    )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    }
})
