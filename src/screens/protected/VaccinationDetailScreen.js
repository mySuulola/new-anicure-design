import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import DashboardItem from '../../components/DashboardItem';
import {deleteVaccine} from '../../store/actions/vaccineAction';
const {height, width} = Dimensions.get('window');

const VaccinationDetailScreen = ({route, navigation, deleteVaccine}) => {
  let {
    detail,
    backgroundColor,
    status,
    nextVaccinationType,
    nextDate,
    isMedication,
  } = route.params;

  console.log(detail.schedule[0]);
  return (
    <View style={styles.container}>
      {/* <Appbar.Header
        dark={true}
        style={{
          backgroundColor,
          marginVertical: 5,
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={detail.planName.toUpperCase()}
          subtitle={'Status: ' + status}
        />
      </Appbar.Header> */}
     
      <ScrollView contentContainerStyle={styles.container}>
        {detail.schedule.map((item) => (
          <DashboardItem
            key={item.day}
            backgroundColor={backgroundColor}
            time={`Day ${item.day}`}
            text={item.nextVaccinationType}
            onPress={() => navigation.navigate('Feedback', {
              detail: item,
            })}
            icon="book"
          />
        ))}
        <View style={styles.empty}></View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          top: height - 115,
          bottom: 0,
          right: 0,
          left: 0,
        }}>

      </View>
    </View>
  );
};

export default connect(null, {deleteVaccine})(VaccinationDetailScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: height - 125,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  empty: {
    height: 200,
    width: 50,
    // backgroundColor: 'red',
    // marginBottom: 500,
    paddingBottom: 400,
  },
  textWhite: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#e3e3e3',
    textShadowRadius: 3,
    // fontSize: 1
  },
});
