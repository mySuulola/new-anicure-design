import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, ToastAndroid, View } from 'react-native'
import AnicureText from '../../../components/AnicureText'
import Appbar from '../../../components/Appbar'
import EventCard from '../../../components/EventCard'
import Loader from '../../../components/Loader'
import apiFetch from '../../../utils/apiFetch'

const Events = ({ navigation }: any) => {

    const [allEvents, setAllEvents] = useState([]);
    const [loadingAndError, setLoadingAndError] = useState({ loading: false, error: "" });

    const fetchAllEvents = async () => {
        try {
            setLoadingAndError(oldState => ({ ...oldState, loading: true }));
            const networkRequest: any = await apiFetch.get("report/events");
            setLoadingAndError(oldState => ({ ...oldState, loading: false }));
            if (networkRequest.status === true) {
                console.log(networkRequest.data, "networkRequest.data")
                setAllEvents(networkRequest.data);
                return;
            }
            ToastAndroid.show(networkRequest?.message ?? "Event not fetched", ToastAndroid.LONG);
        } catch (error) {
            setLoadingAndError(oldState => ({ ...oldState, loading: false }));
            ToastAndroid.show(error?.message ?? "Network Error", ToastAndroid.LONG);
        }
    }

    useEffect(() => {
        fetchAllEvents()
    }, [])

    return (
        <SafeAreaView>
            <Appbar
                back={true}
                navigation={navigation}
                title="Events/Resources"
            />
            <View
                style={{
                    paddingTop: 20,
                }}>
                {
                    loadingAndError.loading ? <Loader /> :
                        <ScrollView>
                            {
                                allEvents.map((item: any) => (
                                    <EventCard
                                        key={item._id}
                                        title={item.title}
                                        author={item.author}
                                        date={item.date}
                                        link={item.link}
                                    />
                                ))
                            }
                            {allEvents.length === 0 && <AnicureText text="No data" type="subTitle" />}
                        </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

export default Events

const styles = StyleSheet.create({})
