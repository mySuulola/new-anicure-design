import { useFocusEffect } from '@react-navigation/native'
import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Image, Dimensions, ToastAndroid, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import AnicureText from '../../../components/AnicureText'
import FormInput from '../../../components/FormInput'
import ImageButton from '../../../components/ImageButton'
import apiFetch from '../../../utils/apiFetch'
import { APP_GREEN } from '../../../utils/constant'
import { logError, minuteSecond } from '../../../utils/helpers'

const { width, height } = Dimensions.get("screen")



const ChatScreen = ({
  navigation,
  route,
  mobileNumber,
}: any) => {


  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState<any>([])

  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { payload } = route.params;
  const { doctor, photo, name } = payload

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await handleFetchMessages();
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => handleFetchMessages(), 10000);
      return () => clearInterval(interval);
    }, []))

  const handleSendMessage = async () => {
    try {
      if (!message) {
        return;
      }
      const requestModel = {
        recipient: doctor,
        sender: mobileNumber,
        message: message,
        recipientType: "doctor",
        title: ""
      }
      if (requestModel.recipient === requestModel.sender) {
        ToastAndroid.show("You cannot send message to yourself", ToastAndroid.LONG);
        return;
      }

      const networkRequest: any = await apiFetch.post("chat/create", requestModel);
      console.log(networkRequest)
      if (networkRequest.status && networkRequest.data) {
        setAllMessages([...allMessages, networkRequest.data]);
        setMessage("");
        return;
      }
      ToastAndroid.show(networkRequest.message ?? "Failed to send. Try again", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(error.message ?? "Network Error. Could not send message", ToastAndroid.LONG);
    }
  }

  const handleFetchMessages = async () => {
    try {
      const requestModel = {
        sender: mobileNumber,
        recipient: doctor,
      }
      const networkRequest: any = await apiFetch.post("chat/conversation", requestModel);
      console.log(networkRequest, 'CONVERSATION')
      setIsLoading(false)

      if (networkRequest.status && networkRequest.data) {
        console.log(networkRequest.data)
        setAllMessages(networkRequest.data);
        return;
      }
      ToastAndroid.show(networkRequest.message ?? "No data. Pull to refresh", ToastAndroid.LONG);
      logError(networkRequest, setGeneralError, setIsLoading, "No data. Pull to refresh");
    } catch (error) {
      setIsLoading(false)
      ToastAndroid.show(error.message ?? "Network Connection Issue", ToastAndroid.LONG);
    }
  }

  useEffect(() => {
    setIsLoading(true)
    handleFetchMessages();
  }, [])

  const flatList: any = React.useRef(null)


  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.navBar]}>
        <View style={[styles.row]}>
          <ImageButton onPress={() => navigation.goBack()} imageSource={require("../../../assets/svg/back_arrow.png")} imageStyle={styles.backImg} />
          <Image source={{ uri: photo }} style={styles.profileImg} resizeMode="contain" />
          <AnicureText type="subTitle" text={name} otherStyles={styles.recipientName} />
        </View>
        <View style={[styles.row]}>
          <ImageButton onPress={() => { }} imageSource={require("../../../assets/images/call_outline.png")} imageStyle={styles.actionIcons} />
          <ImageButton onPress={() => { }} imageSource={require("../../../assets/images/video_outline.png")} imageStyle={styles.actionIcons} />
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: 20 }}>
        {isLoading ?
          <ActivityIndicator size="large" color={APP_GREEN} />
          :
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            refreshing={refreshing}
            data={allMessages}
            ListEmptyComponent={<AnicureText text="No chat" type="subTitle" />}
            renderItem={({ item, index, separators }: any) =>
              <View
                key={item._id}
                style={{
                  // justifyContent: item.sender === mobileNumber ? "flex-end" : "flex-start",
                  alignItems: item.sender === mobileNumber ? "flex-end" : "flex-start",
                  // flexDirection: "column",
                  marginTop: 10,
                  marginHorizontal: 10,
                }} >
                <AnicureText
                  otherStyles={{
                    fontFamily: "Roboto-Italic",
                    textAlign: item.sender === mobileNumber ? "right" : "left",
                    color: item.sender === mobileNumber ? "#0F0F0F" : "#FFFFFF",
                    backgroundColor: item.sender === mobileNumber ? "#FFFFFF" : APP_GREEN,
                    // color: "#FFFFFF",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    marginBottom: 0,
                    // backgroundColor: APP_GREEN,
                    maxWidth: (2 / 3 * width),
                  }}
                  text={item.message}
                  type="subTitle" />
                <AnicureText
                  otherStyles={{
                    fontFamily: "Roboto-Italic",
                    fontSize: 10,
                    marginVertical: 0,
                    paddingHorizontal: 2,
                    textAlign: item.sender === mobileNumber ? "right" : "left",
                    // color: "#FFFFFF",
                  }}
                  text={minuteSecond(item.updatedAt)}
                  type="subTitle" />
              </View>
            }
            keyExtractor={(item: any, index: number) => `${index}`}
            ref={flatList}
            onContentSizeChange={() => flatList.current.scrollToEnd()}

          />}
      </View>

      <View style={[styles.row, { paddingHorizontal: 3, paddingTop: 10, justifyContent: "center", alignItems: "center", marginHorizontal: 30 }]}>
        <FormInput
          maxLength={1000}
          placeholder="Type Message Here..."
          containerStyle={{ width: "100%", borderRadius: 100, marginTop: 20 }}
          value={message}
          onChangeText={(text: string) => setMessage(text)}
        />
        <ImageButton
          onPress={handleSendMessage}
          imageSource={require("../../../assets/images/chat_send_button.png")}
          imageStyle={{ width: 25, height: 20, marginLeft: 10, marginBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backImg: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  recipientName: {
    fontSize: 13
  },
  actionIcons: {
    width: 17,
    height: 17,
    marginHorizontal: 10,
  }

})

const mapStateToProps = (state: any) => {
  const { mobileNumber } = state.user.userDetail;
  return {
    mobileNumber,
  }
};
export default connect(mapStateToProps)(ChatScreen)
