import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import FormInput from '../../components/FormInput';
import {connect} from 'react-redux';
import {submitFeedback} from '../../store/actions/feedbackAction';
import FormButton from '../../components/FormButton';
import dayjs from 'dayjs';

const {height} = Dimensions.get('screen');

const Feedback = ({navigation, submitFeedback, email, route}) => {
  const {detail} = route.params;

  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const [vaccinationType, setVaccinationType] = useState(
    detail.nextVaccinationType,
  );
  const [vaccinationBrand, setVaccinationBrand] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (vaccinationType === '') {
      setVisible(!visible);
      setErrorMessage(
        `${
          detail.isMedication ? 'Medication' : 'Vaccination'
        } Type is required`,
      );
      return;
    }
    if (vaccinationBrand === '') {
      setErrorMessage(
        `${
          detail.isMedication ? 'Medication' : 'Vaccination'
        } Brand is required`,
      );
      setVisible(!visible);
      return;
    }
    if (comment === '') {
      setErrorMessage('Comment is required');
      setVisible(!visible);
      return;
    }

    setIsLoading(true);
    const userFeedback = {
      vaccinationType,
      vaccinationBrand,
      batchNumber,
      expiryDate,
      comment,
    };
    console.log(userFeedback);
    await submitFeedback(userFeedback, email);
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
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Record" />
      </Appbar.Header>
      */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {/* <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}> */}
          {/* <View>
            <View style={{flexDirection: 'row'}}>
              <Paragraph
                style={{
                  fontWeight: 'bold',
                }}>
                Time: {''}
              </Paragraph>
              <Paragraph>Day {detail.day}</Paragraph>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Paragraph
                style={{
                  fontWeight: 'bold',
                }}>
                {detail.isMedication ? 'Medication' : 'Vaccination'}: {''}
              </Paragraph>
              <Paragraph>{detail.nextVaccinationType}</Paragraph>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Paragraph
                style={{
                  fontWeight: 'bold',
                }}>
                {detail.isMedication ? 'Medication' : 'Vaccination'} Date: {''}
              </Paragraph>
              <Paragraph>
                {dayjs(detail.nextVaccinationDate).add(1, 'day').format('dddd DD/MM/YYYY')}
                </Paragraph>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Paragraph
                style={{
                  fontWeight: 'bold',
                }}>
                Route: {''}
              </Paragraph>
              <Paragraph>{detail.routeOfAdministration}</Paragraph>
            </View>
          </View>
        </View> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <FormInput
            full
            labelName={
              detail.isMedication ? 'Medication Type*' : 'Vaccination Type*'
            }
            value={vaccinationType}
            onChangeText={(type) => setVaccinationType(type)}
          />
          <FormInput
            full
            labelName={
              detail.isMedication ? 'Medication Brand*' : 'Vaccination Brand*'
            }
            value={vaccinationBrand}
            onChangeText={(brand) => setVaccinationBrand(brand)}
          />
          <FormInput
            full
            labelName="Batch Number"
            value={batchNumber}
            autoCapitalize="none"
            onChangeText={(batch) => setBatchNumber(batch)}
          />
          <FormInput
            full
            labelName="Expiry Date"
            value={expiryDate}
            onChangeText={(date) => setExpiryDate(date)}
          />
          <FormInput
            full
            labelName="Comment*"
            textarea
            value={comment}
            onChangeText={(comm) => setComment(comm)}
          />

          {isLoading ? (
            <ActivityIndicator color="blue" size="large" />
          ) : (
            <FormButton
              title="Submit"
              modeValue="contained"
              onPress={handleSubmit}
            />
          )}
        </ScrollView>
      </View>
{/* 
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        {errorMessage}
      </Snackbar> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    //flex: 1,
    // minHeight: height - 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    //    borderWidth: 1,
    //  borderColor: 'red'
  },
  titleText: {
    fontSize: 24,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  email: state.user.userDetail.userDetail.email,
});

export default connect(mapStateToProps, {submitFeedback})(Feedback);
