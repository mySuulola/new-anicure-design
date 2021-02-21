/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import AnicureText from '../../components/AnicureText';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import DashboardTextHighlights from '../../components/DashboardTextHighlights';
import { userLogout } from '../../store/actions/userAction';



const dashboardSummary = [
  {
    title: "Pens",
    count: 4,
    header: "Total",
    summary: "40 broilers \n 30 layers \n 35 feeders",
    image: require("../../assets/svg/pents.png"),
  },
  {
    title: "Vaccine Tracker",
    count: 4,
    header: "Last Vaccination",
    summary: "15/10/2020",
    image: require("../../assets/svg/inoculate.png"),
  },
  {
    title: "Analytics",
    count: 4,
    header: "",
    summary: "View Farm Analytics for the month",
    image: require("../../assets/svg/analytics.png"),
  },
  {
    title: "Create New",
    count: 4,
    header: "",
    summary: "Create New farm/pen",
    image: require("../../assets/svg/analytics.png"),
  },
  
]

const { height, width } = Dimensions.get('screen');

const HomeScreen = ({ navigation, userLogout }: any) => {

  return (
    <View style={styles.container}>

      {/* TOP BAR */}
      <View style={[styles.row, { justifyContent: "space-between", alignItems: "center", paddingHorizontal: 30, paddingVertical: 10 }]}>
        <View style={[styles.row, { alignItems: "center", height: 37, marginVertical: 50, }]}>
          <Image
            source={require("../../assets/svg/profile.png")}
            style={{
              width: 50,
              borderWidth: 4,
              height: 50,
              borderRadius: 50,
              marginRight: 10
            }}
            resizeMode="contain"
          />
          <View>
            <AnicureText type="title" text="Welcome" otherStyles={{ fontSize: 20, color: "#216B36", textAlign: "left" }} />
            <AnicureText type="subTitle" text="Oluwaseyi Suulola" otherStyles={{ color: "#216B36", fontSize: 16 }} />
          </View>
        </View>
        <IoniconsIcon
          name={"ios-notifications"}
          size={25}
          color="#0F0F0F"
          onPress={() => userLogout()}
        />
      </View>
      {/* END OF TOP ROW */}
      <View style={{
        backgroundColor: "#216B36",
        flex: 1,
        borderRadius: 30
      }}>

        <View style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 20
        }}>
          <DashboardTextHighlights
            count={4}
            description="Total Pens"
          />
          <DashboardTextHighlights
            count={4}
            middle={true}
            description="Animal Categories"
          />
          <DashboardTextHighlights
            count={24}
            description="Total Stock"
          />
        </View>

        <View style={{

          flex: 1,
          backgroundColor: "#F4F4F4",
          marginTop: 30,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          paddingTop: 20,
          paddingHorizontal: 20

        }}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <AnicureText
              type="title"
              text="Activities"
              otherStyles={{ marginTop: 10, color: "#1F1742", textAlign: "left", fontFamily: "Roboto-Medium", fontSize: 20 }}
            />

            <ScrollView 
            // contentContainerStyle={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
              {dashboardSummary.map(item => (
                 <View  
                 key={item.title}
                 style={{
                  minHeight: 151,
                  minWidth: 150,
                  backgroundColor: "#FFFFFF",
                  marginRight: 15,
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  paddingTop: 30,
                  marginTop: 20,
                  borderRadius: 10
                }}>
                  <Image 
                  source={item.image}
                  accessibilityHint="pent"
                  style={{width: 70, height: 70}}
                  resizeMode="cover"
                  />
                  <AnicureText 
                  text={`${item.title}`}
                  type="title"
                  otherStyles={{ fontSize: 14, marginVertical: 4}}
                  />

                  <AnicureText 
                  text={`${item.header} ${item.summary}`}
                  type="subTitle"
                  
                  otherStyles={{textAlign: "center", color: "#619E42", maxWidth: 130}}
                  />
                </View>
              ))}
            </ScrollView>
            <View style={{
              height: 200,
              width: "100%",
              backgroundColor: "#00000067",
              marginTop: 20,
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10
            }}>
              <AnicureText 
              type="title"
              text="Image Here"
              />

            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  ); //just kind loving humble
};

const mapStateToProps = (state: any) => {
  console.log(state);
  // const {fullName, phoneNumber, email} =  state.user.userDetail.userDetail
  return {}
};

export default connect(mapStateToProps, { userLogout })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  row: { flexDirection: "row" },
  topSection: {
    flex: 3,
    paddingBottom: 20,
    width: '100%',
  },

  topHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'red',
  },
});
