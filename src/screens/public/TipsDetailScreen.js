import React from 'react';
import {StyleSheet,  Text, Image, ScrollView, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('screen');

const TipsDetailScreen = ({route, navigation}) => {
  const {detail} = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            width: width,
            flexDirection: 'row',
          }}>
          <Icon
            name="leftcircleo"
            style={{paddingVertical: 20, paddingLeft: 10}}
            size={30}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              borderRadius: 30

            }}>
            <Image
              style={{
                width: 250,
                height: 250,
              }}
              source={require('../../assets/img/vote.png')}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 30}}>
        <Text style={{
            fontSize: 30,
            textAlign: 'center'
        }}>{detail.title}</Text>
        </View>
        
      </View>

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 30,
          textAlign: 'justify',
          marginBottom: 30,

        }}>
       {detail.answer}
      </ScrollView>
    </View>
  );
};

export default TipsDetailScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    minHeight: height - 90,

    backgroundColor: 'rgba(255, 255, 255, 0.5)',

    // alignItems: 'center',
    // justifyContent: 'center',
    //    borderWidth: 1,
    //  borderColor: 'red'
  },
  marginTopText: {
    marginTop: 200,
  },
});

