import React from 'react'
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton';
import AnicureText from '../../components/AnicureText';
import Appbar from '../../components/Appbar'
import Divider from '../../components/Divider';
import { ImageTextRow } from '../../components/ImageTextRow';

const { height, width } = Dimensions.get('screen');


const DoctorDetail = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/svg/profile.png")}
                // resizeMode=
                style={{ width: "100%", height: height / 2.5, justifyContent: "space-between" }}>
                <Appbar
                    back={true}
                    navigation={navigation}
                    trailingIcon="ios-notifications"
                />

                <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-between", marginHorizontal: 20, paddingHorizontal: 20, borderTopEndRadius: 20, borderTopStartRadius: 20, backgroundColor: "#FFFFFF" }}>
                    <View>
                        <AnicureText
                            text="Suulola Oluwaseyi"
                            type="title"
                            otherStyles={{ textAlign: "left", fontSize: 20, fontFamily: "Roboto-Medium" }}
                        />
                        <AnicureText
                            text="Vet. Surgeon"
                            otherStyles={{ textAlign: "left", fontSize: 15, color: "#216B36", fontFamily: "Roboto-Medium" }}
                            type="subTitle" />
                    </View>
                    <View style={{ backgroundColor: "#216B36", paddingHorizontal: 12, borderRadius: 10, justifyContent: "center" }}>
                        <AnicureText
                            type="title"
                            text="5.0"
                            otherStyles={{ color: "#FFFFFF", fontFamily: "Roboto-Regular" }}
                        />
                    </View>
                </View>

            </ImageBackground>
            <View style={{ flex: 1 }}>

                <View style={{ paddingBottom: 20, justifyContent: "space-between", marginHorizontal: 20, paddingHorizontal: 20, borderBottomEndRadius: 20, borderBottomStartRadius: 20, marginBottom: 20, paddingTop: 3, backgroundColor: "#FFFFFF" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <AnicureText
                            text="10 Years of Experience"
                            type="subTitle"
                            otherStyles={{ color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold" }}
                        />
                        <AnicureText
                            text="10 Reviews"
                            type="subTitle"
                            otherStyles={{ color: "#ADADAD", fontSize: 10, fontFamily: "Roboto-Bold" }}
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <ImageTextRow text="Yaba, Lagos." distance="1.3 Km from you" OtherStyles={{marginTop: 10}} />
                        <ImageTextRow text="1000 Naira/hr" OtherStyles={{marginTop: 10}} />
                    </View>

                    <Divider margin={20} />


                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <ImageTextRow type="large" text="Adeyemi Vet. Clinic" distance="15 ,Ajayi Road Yaba Lagos" />
                        <ImageTextRow type="large" text="Call" />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <ImageTextRow type="large" text="Consultation Time" distance="Every :Tue 5pm-7pm" />
                        <ImageTextRow type="large" text="Chat" />
                    </View>
                </View>

                <View style={{width: "100%", paddingHorizontal: 20}}>
                <AnicureButton 
                title="Book an Appointment"
                onPress={() => {}}
                otherStyles={{ borderRadius: 50}}
                icon="circle-with-plus"
                iconColor="#FFFFFF"
                />
                </View>



            </View>
        </View>
    )
}

export default DoctorDetail

const styles = StyleSheet.create({})
