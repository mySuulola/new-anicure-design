import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import AnicureButton from '../../components/AnicureButton'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import DoctorCard from '../../components/DoctorCard'
import FormInput from '../../components/FormInput'
import Toggle from '../../components/Toggle'
const allDoctorListings = [
    {
        key: "1",
        name: "Stephen Obe",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off, Subscription",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "2",
        name: "Adenuga Joy",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "1",
        yearsOfExperience: 20,
        availability: "Subscription",
        location: "Ajah, Lagos.",
        chargePerSession: "1000",
        clinicName: "Orekoya. Clinic",
        clinicAddress: "Lekki, Lagos",
        consultationTime: [
            { day: "Sunday", time: "" },
            { day: "Monday", time: "2am - 7pm" },
            { day: "Tuesday", time: "" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "12noon - 3pm" },
            { day: "Friday", time: "5am - 7pm" },
            { day: "Saturday", time: "" },
        ],
    },
    {
        key: "3",
        name: "Olubi Joseph",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off, Subscription",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "4",
        name: "Femi Joel",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "5",
        name: "Clegg Micheal",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "Subscription",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "6",
        name: "Richard White",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off, Subscription",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "7",
        name: "Beda Akaffuo",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "Subscription",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "5pm - 7am" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "5pm - 7am" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    {
        key: "8",
        name: "Kamar Akash",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
]
const allPharmacyListings: any = [
    {
        key: "1",
        name: "CornerStone",
        title: "Vet Doctor",
        rating: "2",
        bio: `With over 10 years experience, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit recusandae in est voluptatem molestias cumque! In placeat totam sed soluta saepe. Debitis sit velit soluta excepturi vel fugiat commodi!`,
        reviewCount: "5",
        yearsOfExperience: 5,
        availability: "One off",
        location: "Yaba, Lagos.",
        chargePerSession: "500",
        clinicName: "Adeyemi Vet. Clinic",
        clinicAddress: "Iyana Paja, Lagos",
        consultationTime: [
            { day: "Sunday", time: "" },
            { day: "Monday", time: "5pm - 7am" },
            { day: "Tuesday", time: "5pm - 7am" },
            { day: "Wednesday", time: "" },
            { day: "Thursday", time: "" },
            { day: "Friday", time: "5pm - 7am" },
            { day: "Saturday", time: "5pm - 7am" },
        ],
    },
    // {
    //     key: "1",
    //     name: "Cornerstone Stores",
    //     title: "",
    //     rating: "",
    //     reviewCount: "",
    //     location: "",
    //     chargePerSession: "",
    //     yearsOfExperience: "",
    //     clinicName: "",
    //     consultationDays: "",
    //     consultationTime: "",
    // },
    // {
    //     key: "2",
    //     name: "Agro-Allied Co",
    //     title: "",
    //     rating: "",
    //     reviewCount: "",
    //     location: "",
    //     chargePerSession: "",
    //     yearsOfExperience: "",
    //     clinicName: "",
    //     consultationDays: "",
    //     consultationTime: "",
    // },
    // {
    //     key: "3",
    //     name: "Ibadan Vet Store",
    //     title: "",
    //     rating: "",
    //     reviewCount: "",
    //     location: "",
    //     chargePerSession: "",
    //     yearsOfExperience: "",
    //     clinicName: "",
    //     consultationDays: "",
    //     consultationTime: "",
    // },
    // {
    //     key: "4",
    //     name: "Lagos Vet Store",
    //     title: "",
    //     rating: "",
    //     reviewCount: "",
    //     location: "",
    //     chargePerSession: "",
    //     yearsOfExperience: "",
    //     clinicName: "",
    //     consultationDays: "",
    //     consultationTime: "",
    // },
    // {
    //     key: "5",
    //     name: "Abuja Vet Store",
    //     title: "",
    //     rating: "",
    //     reviewCount: "",
    //     location: "",
    //     chargePerSession: "",
    //     yearsOfExperience: "",
    //     clinicName: "",
    //     consultationDays: "",
    //     consultationTime: "",
    // },
]


const Search = ({ navigation }: any) => {

    const [isVetSearch, setIsVetSearch] = useState(true)

    return (
        <View>
            <Appbar
                back={true}
                navigation={navigation}
                trailingIcon="ios-notifications"
            >
                <Toggle
                    containerStyle={{ width: 200, backgroundColor: '#FFFFFF' }}
                    titleOne="Vet. Specialist"
                    titleTwo="Pharmacy"
                    switchState={isVetSearch}
                    setSwitchState={setIsVetSearch}
                />
            </Appbar>

            <View style={{ marginHorizontal: 15 }}>
                <FormInput
                    placeholder={isVetSearch ? "Search for a Vet Doctor Here" : "Search For a Pharmacist"}
                    preIcon="search1"
                    searchButton={true}
                />

                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <AnicureButton
                        textBtn={true}
                        title="Location"
                        textColor="#216B36"
                        onPress={() => { }}
                        width={80}
                        height={32}
                        btnColor="#FFFFFF"
                    />
                    <AnicureButton
                        textBtn={true}
                        title="Filter"
                        textColor="#216B36"
                        onPress={() => { }}
                        width={80}
                        height={35}
                        btnColor="#FFFFFF"
                        icon="sound-mix"
                    />
                </View>
                <FlatList
                    data={isVetSearch ? allDoctorListings : allPharmacyListings}
                    keyExtractor={(doc: any) => doc.key}
                    renderItem={({ item }) => <DoctorCard item={item} navigation={navigation} />}
                />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})
