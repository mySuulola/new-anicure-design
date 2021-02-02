import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import AnicureButton from '../../components/AnicureButton'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import DoctorCard from '../../components/DoctorCard'
import FormInput from '../../components/FormInput'
const allDoctorListings = [
    {
        key: "1",
        name: "Stephen Obe",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "2",
        name: "Adenuga Joy",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "3",
        name: "Olubi Joseph",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "4",
        name: "Femi Joel",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "5",
        name: "Clegg Micheal",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "6",
        name: "Richard White",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "7",
        name: "Beda Akaffuo",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "8",
        name: "Kamar Akash",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
]
const allPharmacyListings = [
    {
        key: "1",
        name: "Cornerstone Stores",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "2",
        name: "Agro-Allied Co",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "3",
        name: "Ibadan Vet Store",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "4",
        name: "Lagos Vet Store",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
    {
        key: "5",
        name: "Abuja Vet Store",
        title: "",
        rating: "",
        reviewCount: "",
        location: "",
        chargePerSession: "",
        numberOfYearsOfExperience: "",
        clinicName: "",
        consultationDays: "",
        consultationTime: "",
    },
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
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
                    <TouchableOpacity onPress={() => setIsVetSearch(true)} style={{ backgroundColor: isVetSearch ? "#216B36" : "#FFFFFF", borderRadius: 15, paddingHorizontal: 20, paddingVertical: 6 }}>
                        <AnicureText text="Vet. Specialist" type="subTitle" otherStyles={{ color: isVetSearch ? "#FFFFFF" : "#216B36", fontFamily: "Roboto-Medium" }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsVetSearch(false)} style={{ backgroundColor: isVetSearch ? "#FFFFFF" : "#216B36", paddingHorizontal: 30, borderRadius: 15, paddingVertical: 6 }}>
                        <AnicureText text="Pharmacy" type="subTitle" otherStyles={{ color: isVetSearch ? "#216B36" : "#FFFFFF", fontFamily: "Roboto-Medium" }} />
                    </TouchableOpacity>
                </View>
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
                    keyExtractor={(doc) => doc.key}
                    renderItem={({ item }) => <DoctorCard item={item} navigation={navigation} />}
                />
            </View>

        </View>
    )
}

export default Search

const styles = StyleSheet.create({})
