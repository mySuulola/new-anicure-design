import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import PastAppointmentCard from '../../components/PastAppointmentCard'
import Toggle from '../../components/Toggle'
import UpcomingAppointmentCard from '../../components/UpcomingAppointmentCard'

const listings = [1, 2, 3, 4, 5, 6];

const Appointment = ({ navigation, }: any) => {
    const [isUpComing, setIsUpComing] = useState(true)

    return (
        <View style={{ flex: 1 }}>
            <Appbar
                back={true}
                navigation={navigation}
                trailingIcon="ios-notifications"
            >
                <AnicureText
                    text="Appointments"
                    type="subTitle"
                />
            </Appbar>
            <View style={{
                flex: 1,
                alignItems: "center"
            }}>
                <Toggle
                    containerStyle={{ width: 180, backgroundColor: '#FFFFFF', marginBottom: 10 }}
                    titleOne="Upcoming"
                    titleTwo="Past"
                    switchState={isUpComing}
                    setSwitchState={setIsUpComing}
                />
                {/*  */}
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    {isUpComing ? <ScrollView showsVerticalScrollIndicator={false} >
                        {listings.map((item: any) => (
                            <UpcomingAppointmentCard
                                doctorName={"Doc 1"}
                                amount={"1000 Naira/hr"}
                                time={"10pm"}
                                title="Vet. Surgeon"
                                location="Yaba, Lagos."
                                date={"Wed 02 Feb 2021"}
                                clinicName={"Adeyemi Vet. Clinic"}
                                clinicAddress={"15, Ajayi Road Yaba Lagos"}
                                bio={`With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`}
                                onChat={() => navigation.navigate("ChatScreen", { payload: { name: "Doc 1", sender: "08130943146", recipient: "07061972413" } })}
                                onCancel={() => navigation.navigate("ChatScreen")}
                                key={item}
                            />
                        ))}
                    </ScrollView> :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                paddingHorizontal: 15,
                                marginTop: 20,
                                backgroundColor: "#FFFFFF",
                                paddingTop: 20,
                                borderRadius: 30
                            }}>
                            {listings.map((item: any) => (
                                <PastAppointmentCard
                                    onPress={() => { }}
                                    key={item} />
                            ))
                            }
                        </ScrollView>
                    }

                </View>
            </View>

            {/*  */}

        </View>

    )
}

export default Appointment

const styles = StyleSheet.create({})
