import React from 'react'
import { Image, SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import { connect } from 'react-redux';
import AnicureText from '../../components/AnicureText';
import Appbar from '../../components/Appbar';
import Divider from '../../components/Divider';

import { userLogout } from '../../store/actions/userAction';
import { APP_GREEN } from '../../utils/constant';
import ProfileBox from '../../components/ProfileBox';


const More = ({ navigation, user, userLogout }: any) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar
                back={false}
                navigation={navigation}
                onIconClick={() => userLogout()}
                trailingIcon="exit-outline"
            // title="Profile Page"
            />
            <View style={{ paddingHorizontal: 20, flex: 1 }}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={require("../../assets/svg/profile.png")}
                        style={{
                            width: 30,
                            borderWidth: 4,
                            height: 30,
                            borderRadius: 50,
                            marginRight: 10
                        }}
                        resizeMode="contain"
                    />
                    <AnicureText text={user?.fullName} type="subTitle" otherStyles={{ fontFamily: "Roboto-Bold", color: APP_GREEN, fontSize: 15 }} />
                </View>
                <Divider />

                <ScrollView showsVerticalScrollIndicator={false} >
                    <ProfileBox title="Name" text={user.fullName} />
                    <ProfileBox title="Email Address" text={user.email} />
                    <ProfileBox title="Phone Number" text={user.mobileNumber} />
                    <ProfileBox title="Chat Consultation Subscription" text={user.subscription?.chat?.status ? "Active" : "Inactive"} />
                    <ProfileBox title="Voice/Video Consultation Subscription" text={user.subscription?.call?.status ? "Active" : "Inactive"} />
                    <ProfileBox title="Farm Call Service" text={user.subscription?.farmService?.status ? "Active" : "Inactive"} />
                    <ProfileBox title="Customer Support Contact" text={"08103243549"} />
                    <AnicureText text="©️ eVet" type="subTitle" otherStyles={{ paddingVertical: 20, fontSize: 15, fontFamily: "Roboto-Bold" }} />
               
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.userDetail
});

export default connect(mapStateToProps, { userLogout })(More);

const styles = StyleSheet.create({})
