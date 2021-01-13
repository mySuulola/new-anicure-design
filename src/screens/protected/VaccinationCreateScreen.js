import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import FormInput from '../../components/FormInput';
import {Picker} from '@react-native-community/picker';
import FormButton from '../../components/FormButton';
import {connect} from 'react-redux';
import {addVaccine} from '../../store/actions/vaccineAction';

const {width} = Dimensions.get('screen');

const VaccinationCreateScreen = ({addVaccine, navigation, email}) => {
  const [planName, setPlanName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ageOfBirds, setAgeOfBird] = useState('');
  const [flockSize, setFlockSize] = useState('');
  const [birdType, setBirdType] = useState('');
  const [isVaccinationReminderAlarm, setIsVaccinationReminderAlarm] = useState(
    false,
  );
  const [isVaccinationReminderSMS, setIsVaccinationReminderSMS] = useState(
    false,
  );

  const handlePlanCreation = async () => {
    if (planName === '' || birdType == '' || ageOfBirds == '') {
      Alert.alert('Fill required fields');
      return;
    }
    setIsLoading(true);
    const newPlan = {
      planName,
      ageOfBirds,
      birdType,
      flockSize,
      isVaccinationReminderAlarm,
      isVaccinationReminderSMS,
    };
    await addVaccine(newPlan, email);
    setIsLoading(false);
    navigation.navigate('Vaccination');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <Appbar.Header
        style={{
          backgroundColor: '#228b22',
        }}>
        <Appbar.BackAction onPress={() => navigation.navigate('Vaccination')} />
        <Appbar.Content title="Create Vaccination Plan" />
      </Appbar.Header> */}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 20,
          paddingBottom: 20,
        }}>
        <FormInput
          labelName="Plan Name(for identification purpose)"
          full
          value={planName}
          autoCapitalize="none"
          onChangeText={(plan) => setPlanName(plan)}
        />
        <Picker
          style={{
            width: width - 20,
            backgroundColor: '#fff',
            elevation: 5,
          }}
          selectedValue={birdType}
          onValueChange={(bird) => bird && setBirdType(bird)}>
          <Picker.Item disabled={true} label="Select Bird Type" value="" />
          <Picker.Item label="Broiler" value="broiler" />
          <Picker.Item label="Cockerel" value="cockerel" />
          <Picker.Item label="Noiler" value="noiler" />
          <Picker.Item label="Turkey" value="turkey" />
          <Picker.Item label="Layer" value="layer" />
        </Picker>

        <FormInput
          labelName="Age of Birds in day(s)"
          full
          value={ageOfBirds}
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={2}
          //   multiLine={true}
          //   numberOfLines={3}
          onChangeText={(age) => {
            console.log(age);
            // const parsedAge = Number.parseInt(age);
            // console.log(parsedAge);
            setAgeOfBird(age);
            // if (age == '') {
            //   setAgeOfBird(''); //setter for state
            // } else if (Number.isNaN(parsedAge)) {
            //   setAgeOfBird('0'); //setter for state
            // } else if (parsedAge > 40) {
            //   setAgeOfBird('40');
            // } else {
            //   setAgeOfBird(parsedAge + '');
            // }
          }}
        />

        <FormInput
          labelName="Flock Size(Number of Birds)"
          full
          value={flockSize}
          keyboardType="numeric"
          onChangeText={(flock) => setFlockSize(flock)}
        />
        <Text
          style={{
            flex: 1,
            // borderWidth: 1,
            width: '100%',
            color: '#929292e6',
            paddingHorizontal: 10,
            fontSize: 15,
          }}>
          *Vaccination Starts in 24 hours
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: width,
          }}>
          {/* <Checkbox
            status={isVaccinationReminderAlarm ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsVaccinationReminderAlarm(!isVaccinationReminderAlarm);
            }}
          /> */}
          <Text>Enable Vaccination Reminder</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: width,
          }}>
          {/* <Checkbox
            disabled={true}
            status={isVaccinationReminderSMS ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsVaccinationReminderSMS(!isVaccinationReminderSMS);
            }}
          /> */}
          <Text>Enable SMS Reminder</Text>
        </View>

        {isLoading === true ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <FormButton
            title="Create plan"
            modeValue="contained"
            onPress={() => handlePlanCreation()}
            // labelStyle={styles.loginButtonLabel}
          />
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.userDetail.userDetail.email,
});

export default connect(mapStateToProps, {addVaccine})(VaccinationCreateScreen);

const styles = StyleSheet.create({});
