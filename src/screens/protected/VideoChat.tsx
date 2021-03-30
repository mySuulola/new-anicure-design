import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions, StyleSheet,
  View,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AnicureText from '../../components/AnicureText';
import { APP_GREEN } from '../../utils/constant';
import requestCameraAndAudioPermission from '../../utils/permissions';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

interface Props {
  navigation: any;
}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  token: string;
  channelName: string;
  vidMute: boolean;
  audMute: boolean;
  joinSucceed: boolean;
  loadingState: string;
  peerIds: number[];
}

class VideoChat extends Component<Props, State> {
  _engine?: RtcEngine;
  navigation?: any;

  constructor(props: any) {
    super(props);
    const { channelName, agoraToken } = props.route.params.payload;
    console.log(agoraToken)
    console.log("----------------")
    console.log(channelName)
    this.navigation = props.navigation;
    this.state = {
      appId: "7a570232bfbd4725a7253e76cf8eb678",
      token: agoraToken,
      channelName: channelName,
      loadingState: "Loading...",
      vidMute: false,
      audMute: false,
      joinSucceed: false,
      peerIds: [],
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    console.log('mounting component')
    this.initializeCall();
  }

  componentWillUnmount() {
    console.log('destroying component')
    // this.endCall();
    this._engine?.leaveChannel()
  }

  async initializeCall() {
    await this.init();
    this.startCall();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const { appId } = this.state;
    console.log('appId', appId)
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
      this.setState({ loadingState: `Connectivity Issues... ${warn}` });
    });

    this._engine.addListener('Error', (error) => {
      console.log('Error', error);
      this.setState({ loadingState: `Cannot Connect...${error}` });
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    console.log(this.state.token, 'this.state.token')
    console.log(this.state.channelName, 'this.state.channelName')
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0
    );
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
    this.props.navigation.goBack()
  };

  /**
   * @name toggleAudio
   * @description Function to toggle local user's audio
   */
  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    this._engine?.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }


  /**
   * @name toggleVideo
   * @description Function to toggle local user's video
   */
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    !this.state.vidMute ? this._engine?.disableVideo() : this._engine?.enableVideo()
  }

  /**
   * @name toggleVideo
   * @description Function to toggle local user's video
   */
  switchCamera() {
    this._engine?.switchCamera();
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderVideos()}
        <View style={styles.buttonBar}>
          <Icon.Button style={styles.iconStyle}
            backgroundColor={APP_GREEN}
            name={this.state.audMute ? 'mic-off' : 'mic'}
            onPress={() => this.toggleAudio()}
          />
          <Icon.Button style={styles.iconStyle}
            backgroundColor={APP_GREEN}
            name="call-end"
            onPress={() => this.endCall()}
          />
          <Icon.Button style={styles.iconStyle}
            backgroundColor={APP_GREEN}
            name={this.state.vidMute ? 'videocam-off' : 'videocam'}
            onPress={() => this.toggleVideo()}
          />
          <Icon.Button style={styles.iconStyle}
            backgroundColor={APP_GREEN}
            name={'switch-camera'}
            onPress={() => this.switchCamera()}
          />
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <>
        <View style={styles.fullView}>
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={this.state.channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        </View>
        {this._renderRemoteVideos()}
      </>
    ) : <AnicureText text={this.state.loadingState} type="subTitle" otherStyles={{ marginTop: 0, paddingTop: 10, backgroundColor: APP_GREEN, color: "#FFFFFF", paddingVertical: 5, fontSize: 10 }} />;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {
          peerIds.length > 0 ?
            <View style={styles.container} >{peerIds.map((value) => {
              return (
                <RtcRemoteView.SurfaceView
                  style={styles.remote}
                  uid={value}
                  channelId={this.state.channelName}
                  renderMode={VideoRenderMode.Hidden}
                  zOrderMediaOverlay={true}
                />
              );
            })}</View>
            :
            <AnicureText text={`Waiting for others to join ${peerIds.length}`} type="subTitle" />

        }
      </ScrollView>
    );
  };
}

export default VideoChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  max: {
    width: 150,
    height: 150
  },
  fullView: {
    width: 150,
    height: 200,
    position: 'absolute',
    bottom: 0,
    right: 0,

    borderWidth: 1
  },
  remoteContainer: {
    width: dimensions.width,
    height: dimensions.height - 50,
  },
  remote: {
    width: dimensions.width,
    height: dimensions.height - 50,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  buttonBar: {
    height: 50,
    backgroundColor: APP_GREEN,
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  iconStyle: {
    fontSize: 34,
    paddingTop: 15,
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingBottom: 15,
    borderRadius: 0,
  },
});