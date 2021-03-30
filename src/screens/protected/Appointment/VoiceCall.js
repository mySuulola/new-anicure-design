// import React, { Component } from 'react';
// import { View, StyleSheet, NativeModules, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
// import { RtcEngine, AgoraView } from 'react-native-agora';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { callTimeout, videoFeedConfig } from "../../../utils/constants/appConstants";
// import { customDelay } from '../../../utils/helpers';

// const { Agora } = NativeModules;                  //Define Agora object as a native module

// const {
//   // FPS30,
//   AudioProfileDefault,
//   AudioScenarioDefault,
//   Adaptative,
// } = Agora;                                        //Set defaults for Stream

// class VideoCall extends Component {
//   constructor(props) {
//     super(props);
//     const { payload } = props.route.params;
//     const AppID = "7a570232bfbd4725a7253e76cf8eb678"
//     const videoConfig = videoFeedConfig
//     const { channelName: ChannelName, agoraToken } = payload;
//     console.log(videoConfig.width)

//     this.state = {
//       peerIds: [],                                //Array for storing connected peers
//       uid: agoraToken, //Math.floor(Math.random() * 100),       //Generate a UID for local user
//       appid: AppID,                    //Enter the App ID generated from the Agora Website
//       channelName: ChannelName,        //Channel Name for the current session
//       vidMute: false,                             //State variable for Video Mute
//       audMute: false,                             //State variable for Audio Mute
//       joinSucceed: false,                         //State variable for storing success
//       infoText: 'Waiting for user to join'
//     };
//     const config = {                            //Setting config of the app
//       appid: this.state.appid,                  //App ID
//       channelProfile: 0,                        //Set channel profile as 0 for RTC
//       videoEncoderConfig: {                     //Set Video feed encoder settings
//         width: videoConfig.width,
//         height: videoConfig.height,
//         bitrate: videoConfig.bitrate,
//         frameRate: videoConfig.FPS,
//         orientationMode: Adaptative,
//       },
//       audioProfile: AudioProfileDefault,
//       audioScenario: AudioScenarioDefault,
//     };
//     RtcEngine.init(config);                     //Initialize the RTC engine
//   }

//   handleCallTimeout = async () => {
//     if (this.state.peerIds.length === 0) {
//       this.setState({ infoText: 'Call timeout, ending call.' });
//       await customDelay(1000);
//       this.endCall();
//     }
//   }

//   switchCamera = () => {
//     RtcEngine.switchCamera();
//   }

//   componentDidMount() {
//     // setTimeout(this.handleCallTimeout, callTimeout);

//     RtcEngine.on('userJoined', (data) => {
//       const { peerIds } = this.state;             //Get currrent peer IDs
//       if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
//         this.setState({
//           peerIds: [...peerIds, data.uid],        //add peer ID to state array
//         });
//       }
//     });
//     RtcEngine.on('userOffline', (data) => {       //If user leaves
//       this.setState({
//         peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
//       });
//       this.endCall();
//     });
//     RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
//       RtcEngine.startPreview();                                      //Start RTC preview
//       this.setState({
//         joinSucceed: true,                                           //Set state variable to true
//       });
//     });
//     RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
//     RtcEngine.enableAudio();                                        //Enable the audio
//   }

//   /**
//    * @name toggleAudio
//    * @description Function to toggle local user's audio
//    */
//   toggleAudio() {
//     let mute = this.state.audMute;
//     console.log('Audio toggle', mute);
//     RtcEngine.muteLocalAudioStream(!mute);
//     this.setState({
//       audMute: !mute,
//     });
//   }

//   /**
//    * @name toggleVideo
//    * @description Function to toggle local user's video
//    */
//   toggleVideo() {
//     let mute = this.state.vidMute;
//     console.log('Video toggle', mute);
//     this.setState({
//       vidMute: !mute,
//     });
//     RtcEngine.muteLocalVideoStream(!this.state.vidMute);
//   }

//   /**
//    * @name endCall
//    * @description Function to end the call
//    */
//   endCall() {
//     RtcEngine.destroy();
//     this.props.navigation.pop();
//   }

//   /**
//    * @name peerClick
//    * @description Function to swap the main peer videostream with a different peer videostream
//    */
//   peerClick(data) {
//     let peerIdToSwap = this.state.peerIds.indexOf(data);
//     this.setState(prevState => {
//       let currentPeers = [...prevState.peerIds];
//       let temp = currentPeers[peerIdToSwap];
//       currentPeers[peerIdToSwap] = currentPeers[0];
//       currentPeers[0] = temp;
//       return { peerIds: currentPeers };
//     });
//   }

//   /**
//    * @name videoView
//    * @description Function to return the view for the app
//    */
//   videoView() {
//     const localVideoStyle = this.state.peerIds.length > 0 ? styles.localVideoStyle : { flex: 1 };
//     return (
//       <View style={{ flex: 1 }}>
//         {
//           this.state.peerIds.length > 1
//             ? <View style={{ flex: 1 }}>
//               <View style={{ height: dimensions.height * 3 / 4 - 50 }}>
//                 <AgoraView style={{ flex: 1 }}
//                   remoteUid={this.state.peerIds[0]} mode={1} key={this.state.peerIds[0]} />
//               </View>
//               <View style={{ height: dimensions.height / 4 }}>
//                 <ScrollView horizontal={true} decelerationRate={0}
//                   snapToInterval={dimensions.width / 2} snapToAlignment={'center'}
//                   style={{ width: dimensions.width, height: dimensions.height / 4 }}>
//                   {
//                     this.state.peerIds.slice(1).map((data) => (
//                       <TouchableOpacity style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
//                         onPress={() => this.peerClick(data)} key={data}>
//                         <AgoraView style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
//                           remoteUid={data} mode={1} key={data} />
//                       </TouchableOpacity>
//                     ))
//                   }
//                 </ScrollView>
//               </View>
//             </View>
//             : this.state.peerIds.length > 0
//               ? <View style={{ height: dimensions.height - 50 }}>
//                 <AgoraView style={{ flex: 1 }}
//                   remoteUid={this.state.peerIds[0]} mode={1} />
//               </View>
//               : <Text style={{ textAlign: 'center' }}>{this.state.infoText}</Text>
//         }
//         {
//           !this.state.vidMute                                              //view for local video
//             ? <AgoraView style={localVideoStyle} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
//             : <View />
//         }
//         <View style={styles.buttonBar}>
//           <Icon.Button style={styles.iconStyle}
//             backgroundColor="#0093E9"
//             name={this.state.audMute ? 'mic-off' : 'mic'}
//             onPress={() => this.toggleAudio()}
//           />
//           <Icon.Button style={styles.iconStyle}
//             backgroundColor="#0093E9"
//             name="call-end"
//             onPress={() => this.endCall()}
//           />
//           <Icon.Button style={styles.iconStyle}
//             backgroundColor="#0093E9"
//             name={this.state.vidMute ? 'videocam-off' : 'videocam'}
//             onPress={() => this.toggleVideo()}
//           />
//           <Icon.Button style={styles.iconStyle}
//             backgroundColor="#0093E9"
//             name={'switch-camera'}
//             onPress={() => this.switchCamera()}
//           />
//         </View>
//       </View>
//     );
//   }

//   render() {
//     return this.videoView();
//   }
// }

// let dimensions = {                                            //get dimensions of the device to use in view styles
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height,
// };

// const styles = StyleSheet.create({
//   buttonBar: {
//     height: 50,
//     backgroundColor: '#0093E9',
//     display: 'flex',
//     width: '100%',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent: 'center',
//   },
//   localVideoStyle: {
//     width: 140,
//     height: 160,
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     zIndex: 100,
//   },
//   iconStyle: {
//     fontSize: 34,
//     paddingTop: 15,
//     // paddingLeft: 20,
//     // paddingRight: 20,
//     paddingBottom: 15,
//     borderRadius: 0,
//   },
// });

// export default VideoCall;



import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import AnicureButton from '../../../components/AnicureButton';
import Appbar from '../../../components/Appbar';
import FormInput from '../../../components/FormInput';
import { useInitializeAgora, useRequestAudioHook } from '../../../utils/agora';

const VoiceCall = ({ navigation }) => {
  useRequestAudioHook();
  const {
    channelName,
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    setChannelName,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
  } = useInitializeAgora();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.channelInputContainer}>

          <Appbar
            back={true}
            navigation={navigation}
            trailingIcon="ios-notifications"
          />

          <FormInput
            preIcon={"user"}
            value={channelName}
            // error={email.error}
            autoCapitalize="none"
            // keyboardType="email-address"
            placeholder="Channel Name"
            onChangeText={(text) => setChannelName(text)}
          />
        </View>

        <View style={styles.joinLeaveButtonContainer}>
          <AnicureButton
            onPress={joinSucceed ? leaveChannel : joinChannel}
            title={`${joinSucceed ? 'Leave' : 'Join'} Voice Call`}
          />

          <AnicureButton 
          onPress={() => {
            if(joinSucceed) {
              Alert.alert("Leave Voice Call to Join Video call")
              return;
            }
            navigation.navigate("VideoChat")
          }}
          title="Video Call"
          otherStyles={{marginTop: 20}}
          />
        </View>

        <View style={styles.floatRight}>
          <AnicureButton onPress={toggleIsMute} title={isMute ? 'UnMute' : 'Mute'} />
        </View>

        <View style={styles.floatLeft}>
          <AnicureButton
            onPress={toggleIsSpeakerEnable}
            title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
          />
        </View>

        <View style={styles.usersListContainer}>
          {peerIds.map((peerId) => {
            return (
              <View key={peerId}>
                <Text>{`Joined User ${peerId}`}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
  },
  channelInputContainer: {
    padding: 10,
  },
  joinLeaveButtonContainer: {
    padding: 10,
  },
  usersListContainer: {
    padding: 10,
  },
  floatRight: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    width: 80,
  },
  floatLeft: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    width: 150,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default VoiceCall;


