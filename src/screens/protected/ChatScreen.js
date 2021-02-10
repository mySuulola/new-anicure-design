import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import AnicureButton from '../../components/AnicureButton';
import Appbar from '../../components/Appbar';
import FormInput from '../../components/FormInput';
import { useInitializeAgora, useRequestAudioHook } from '../../utils/agora';

const ChatScreen = ({ navigation }) => {
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

export default ChatScreen;