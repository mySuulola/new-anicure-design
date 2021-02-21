// import React from 'react';
// import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
// import AnicureButton from '../../../../components/AnicureButton';
// import Appbar from '../../../../components/Appbar';
// import FormInput from '../../../../components/FormInput';
// import { useInitializeAgora, useRequestAudioHook } from '../../../../utils/agora';

// const ChatScreen = ({ navigation }) => {
//   useRequestAudioHook();
//   const {
//     channelName,
//     isMute,
//     isSpeakerEnable,
//     joinSucceed,
//     peerIds,
//     setChannelName,
//     joinChannel,
//     leaveChannel,
//     toggleIsMute,
//     toggleIsSpeakerEnable,
//   } = useInitializeAgora();

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View style={styles.channelInputContainer}>

//           <Appbar
//             back={true}
//             navigation={navigation}
//             trailingIcon="ios-notifications"
//           />

//           <FormInput
//             preIcon={"user"}
//             value={channelName}
//             // error={email.error}
//             autoCapitalize="none"
//             // keyboardType="email-address"
//             placeholder="Channel Name"
//             onChangeText={(text) => setChannelName(text)}
//           />
//         </View>

//         <View style={styles.joinLeaveButtonContainer}>
//           <AnicureButton
//             onPress={joinSucceed ? leaveChannel : joinChannel}
//             title={`${joinSucceed ? 'Leave' : 'Join'} Voice Call`}
//           />

//           <AnicureButton 
//           onPress={() => {
//             if(joinSucceed) {
//               Alert.alert("Leave Voice Call to Join Video call")
//               return;
//             }
//             navigation.navigate("VideoChat")
//           }}
//           title="Video Call"
//           otherStyles={{marginTop: 20}}
//           />
//         </View>

//         <View style={styles.floatRight}>
//           <AnicureButton onPress={toggleIsMute} title={isMute ? 'UnMute' : 'Mute'} />
//         </View>

//         <View style={styles.floatLeft}>
//           <AnicureButton
//             onPress={toggleIsSpeakerEnable}
//             title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
//           />
//         </View>

//         <View style={styles.usersListContainer}>
//           {peerIds.map((peerId) => {
//             return (
//               <View key={peerId}>
//                 <Text>{`Joined User ${peerId}`}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   channelInputContainer: {
//     padding: 10,
//   },
//   joinLeaveButtonContainer: {
//     padding: 10,
//   },
//   usersListContainer: {
//     padding: 10,
//   },
//   floatRight: {
//     position: 'absolute',
//     right: 10,
//     bottom: 40,
//     width: 80,
//   },
//   floatLeft: {
//     position: 'absolute',
//     left: 10,
//     bottom: 40,
//     width: 150,
//   },
//   input: {
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
// });

// export default ChatScreen;
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import AnicureText from '../../../components/AnicureText'
import FormInput from '../../../components/FormInput'
import ImageButton from '../../../components/ImageButton'
import { APP_GREEN } from '../../../utils/constant'

const { width, height } = Dimensions.get("screen")

const sample = [
  {
    id: "0",
    sender: "07061972413",
    recipient: "08033951018",
    message: "Here I am",
    date: ""
  }
]

const ChatScreen = ({
  navigation,
  route,
}: any) => {

  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState<any>(sample)

  const { payload } = route.params;
  console.log('payload', payload)
  // { payload: { name: "Doc 1", sender: "08130943146", recipient: "07061972413" } })}



  return (
    <View style={[styles.container]}>
      {/*  */}
      <View style={[styles.navBar]}>
        <View style={[styles.row]}>
          <ImageButton onPress={() => navigation.goBack()} imageSource={require("../../../assets/svg/back_arrow.png")} imageStyle={styles.backImg} />
          <Image source={require("../../../assets/svg/profile.png")} style={styles.profileImg} resizeMode="contain" />
          <AnicureText type="subTitle" text={payload?.name} otherStyles={styles.recipientName} />
        </View>
        <View style={[styles.row]}>
          <ImageButton onPress={() => { }} imageSource={require("../../../assets/svg/call.png")} imageStyle={styles.actionIcons} />
          <ImageButton onPress={() => { }} imageSource={require("../../../assets/svg/chat.png")} imageStyle={styles.actionIcons} />
        </View>

      </View>

      {/*  */}
      <View style={{ flex: 1, marginTop: 20 }}>

        {
          allMessages.map((item: any) => (
            <AnicureText left
              otherStyles={{ 
                fontFamily: "Roboto-Italic", 
                backgroundColor: APP_GREEN, 
                color: "#FFFFFF", 
                paddingHorizontal: 20, 
                paddingVertical: 10, 
                marginTop: 10, 
                marginHorizontal: 10, 
                borderRadius: 10,
                width: (2/3 * width),
              }}
              text={item.message} type="subTitle" key={item.id} />
          ))
        }

      </View>

      {/*  */}
      <View style={styles.row}>
        <FormInput
          placeholder="Type Message Here..."
          inLineButton={true}
          value={message}
          onChangeText={(text: string) => setMessage(text)}
          onPress={() => {
            if (message) {
              setAllMessages([...allMessages, {
                id: `${allMessages.length}`,
                sender: "07061972413",
                recipient: "08033951018",
                message,
                date: ""
              }])
              setMessage("");
            }
          }}

        />
      </View>


    </View>
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
    width: 25,
    height: 25,
    marginHorizontal: 7,
  }

})

export default ChatScreen
