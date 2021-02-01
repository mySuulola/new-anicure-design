import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AnicureButton from '../../components/AnicureButton';
import AnicureText from '../../components/AnicureText';
import IntroAction from '../../components/IntroAction';

const { height, width } = Dimensions.get('screen');

const slides = [
  {
    key: 'Record',
    title: 'Record Daily Farm Activities',
    text: `Easily manage your daily farm activities effectively and keep farm records accurately`,
    image: require('../../assets/svg/record.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'Connect',
    title: 'Connect To A Vet',
    text: `Real time communication with the best Veterinary doctors available locally `,
    image: require('../../assets/svg/connect.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'Store',
    title: 'Access Pharmaceutical Stores',
    text: `Get quick access to the best Pharmaceutical stores in your locality`,
    image: require('../../assets/svg/pharmacy.png'),
    backgroundColor: '#22bcb5',
  }
];

const AppIntro = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    navigation.navigate("CreateAccount")
  };
  const handleLogin = () => {
    navigation.navigate("Login")
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <AnicureButton
          onPress={handleLogin}
          title={"Skip"}
          otherStyles={{ alignItems: 'flex-end'}}
          boldText={true}
          textBtn={true}
          fontSize={15}
          textColor="#1F1742"
        />
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Image 
          resizeMode="contain" 
          style={styles.image} 
          source={item.image} 
          />
          <AnicureText
            text={item.title}
            type="title"
          />
          <AnicureText
            text={item.text}
            type="subTitle"
          />
        </View>
      </View>
    );
  };



  if (showRealApp) {
    return <View><Text></Text></View>
  } else {
    return (
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        renderNextButton={() => <IntroAction onDone={onDone} handleLogin={handleLogin} /> }
        bottomButton={true}
        renderDoneButton={() => <IntroAction onDone={onDone} handleLogin={handleLogin} />}
        activeDotStyle={{
          backgroundColor: "#216B36",
        }}
        dotStyle={{
          backgroundColor: "#BAB9C0"
        }}
      />
    );
  }
};

export default AppIntro;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F4F4F4"
  },
  image: {
    marginBottom: 10,
    width: width - 100,
  },
});
