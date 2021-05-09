import React from 'react'
import { StyleSheet, View } from 'react-native'
import AnicureButton from './AnicureButton'
import AnicureText from './AnicureText'
import OpenPdf from 'react-native-open-pdf';

interface IEvent {
    title: string,
    author: string,
    link: string,
    date: string,
};

const EventCard = ({
    title,
    author,
    link,
    date
}: IEvent) => {

    const handleDownload = () => {
        OpenPdf.open(link);
    }

    return (
        <>
            <View
                style={{ 
                    flexDirection: "row", 
                    flexWrap: "wrap", 
                    justifyContent: "space-between", 
                    backgroundColor: "#FFFFFF", 
                    paddingHorizontal: 15, 
                    paddingVertical: 20, 
                    marginHorizontal: 20, 
                    marginBottom: 20,
                    borderRadius: 20
                    }}>
                <View style={{
                    maxWidth: '85%'
                }}>
                    <AnicureText
                        text={title}
                        type="title"
                        otherStyles={{ 
                            color: "#1F1742", 
                            fontSize: 20, 
                            textAlign: "left" 
                        }}
                    />
                    <AnicureText
                        text={`${author}`}
                        type="title"
                        otherStyles={{ 
                            color: "#216B36", 
                            fontSize: 15, 
                            textAlign: "left" 
                        }}
                    />
                    <AnicureText
                        text={`${date}`}
                        left
                        type="title"
                        otherStyles={{ 
                            fontSize: 10, 
                            color: "#ADADAD", 
                            fontFamily: "Roboto-Regular" 
                        }}
                    />
                </View>
                <View style={{
                    justifyContent: "flex-end",
                }}>
                    <AnicureButton onPress={handleDownload} title="Open" width={45} textBtn={true} height={10} />
                </View>
            </View>
        </>
    )
}

export default EventCard

const styles = StyleSheet.create({})
