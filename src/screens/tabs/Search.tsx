import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AnicureButton from '../../components/AnicureButton'
import AnicureText from '../../components/AnicureText'
import Appbar from '../../components/Appbar'
import DoctorCard from '../../components/DoctorCard'
import FormInput from '../../components/FormInput'
import Toggle from '../../components/Toggle'
import apiFetch from '../../utils/apiFetch'
import { APP_GREEN } from '../../utils/constant'
import { logError } from '../../utils/helpers'


const Search = ({ navigation }: any) => {

    const [isVetSearch, setIsVetSearch] = useState(true)
    const [allDoctorListings, setAllDoctorListings] = useState<Array<any>>([]);
    const [allPharmListings, setAllPharmListings] = useState<Array<any>>([]);

    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAllActiveDoctors()
        setRefreshing(false);
    }

    useEffect(() => {
        fetchAllActiveDoctors();
    }, []);

    const fetchAllActiveDoctors = async () => {
        try {

            setIsLoading(true)
            const networkRequest: any = await apiFetch.get("doctor/");
            if (networkRequest.status && networkRequest.data) {
                // console.log(networkRequest.data)
                setIsLoading(false)
                setAllDoctorListings(networkRequest.data);
                return;
            }
            logError(networkRequest, setGeneralError, setIsLoading);
        } catch (error) {
            logError(error, setGeneralError, setIsLoading);
        }
    }

    const fetchAllPharmacists = async () => {
        setAllPharmListings([])
    }

    const handleTabSwitch = () => {
        console.log(isVetSearch)
        // if (isVetSearch) {
        //     // fetchAllActiveDoctors()
        // } else {
        //     fetchAllPharmacists()
        // }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar
                back={true}
                navigation={navigation}
                trailingIcon="ios-notifications"
            >
                <Toggle
                    onPress={handleTabSwitch}
                    containerStyle={{ width: 200, backgroundColor: '#FFFFFF' }}
                    titleOne="Vet. Specialist"
                    titleTwo="Pharmacy"
                    switchState={isVetSearch}
                    setSwitchState={setIsVetSearch}
                />
            </Appbar>

            <View style={{ marginHorizontal: 15, flex: 1 }}>
                <FormInput
                    placeholder={isVetSearch ? "Search for a Vet Doctor Here" : "Search For a Pharmacist"}
                    preIcon="search1"
                    searchButton={true}
                />

                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: 20, }}>
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
                {isLoading === true ? <View>
                    <ActivityIndicator
                        size="large"
                        color={APP_GREEN}
                    />
                    <AnicureText
                        text={generalError}
                        type="subTitle"
                    />
                </View> :

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                        ListEmptyComponent={<AnicureText text="Coming Soon" type="subTitle" />}
                        refreshing={refreshing}
                        data={isVetSearch ? allDoctorListings : allPharmListings}
                        keyExtractor={(doc: any) => doc._id}
                        renderItem={({ item }) => <DoctorCard item={item}
                            navigation={navigation}
                        />}
                    />

                }
            </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({})
