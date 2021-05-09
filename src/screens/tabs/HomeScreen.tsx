/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AnicureText from '../../components/AnicureText';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import DashboardTextHighlights from '../../components/DashboardTextHighlights';
import AnicureButton from '../../components/AnicureButton';
import { monthDayYear } from '../../utils/helpers';



const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation, fullName, userCategory }: any) => {
  console.log({ userCategory })

  const dashboardSummary = [
    {
      title: "Events",
      route: "Events",
      header: "Download resource/training materials",
      summary: "",
      image: require("../../assets/images/analytics.png"),
    },
    {
      title: `${userCategory} Record`,
      route: "",
      header: `Manage ${userCategory} data`,
      summary: "",
      image: require("../../assets/svg/pents.png"),
    },
    {
      title: "Vaccine Tracker",
      route: "",
      header: "Next Vaccination",
      summary: monthDayYear(),
      image: require("../../assets/images/vaccine_tracker.png"),
    },
    {
      title: "Analytics",
      route: "",
      header: "View Farm Analytics for the month",
      summary: "",
      image: require("../../assets/images/analytics.png"),
    },
    {
      title: "Health Record",
      route: "",
      header: "",
      summary: "",
      image: require("../../assets/images/create_new.png"),
    },

  ]

  return (
    <View style={styles.container}>
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
            <AnicureText type="subTitle" text={fullName} otherStyles={{ color: "#216B36", fontSize: 16 }} />
          </View>
        </View>
        <IoniconsIcon
          name={"ios-notifications"}
          size={25}
          color="#0F0F0F"
          onPress={() => {
            ToastAndroid.show("Coming Soon", ToastAndroid.SHORT);
          }}
        />
      </View>
      {/* END OF TOP ROW */}
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#216B36', '#11361B']}
        style={{
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
            count={0}
            description="Total Pens"
          />
          <DashboardTextHighlights
            count={0}
            middle={true}
            description={`${userCategory} Categories`}
          />
          <DashboardTextHighlights
            count={0}
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
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    item.route ?
                      navigation.navigate(item.route) :
                      ToastAndroid.show("Coming Soon", ToastAndroid.SHORT);
                  }}
                  style={{
                    minHeight: 131,
                    width: 160,
                    minWidth: width / 4,
                    backgroundColor: "#FFFFFF",
                    marginRight: 15,
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    paddingTop: 20,
                    marginTop: 20,
                    borderRadius: 10
                  }}>
                  <Image
                    source={item.image}
                    accessibilityHint={item.title}
                    style={{ width: 84, height: 84 }}
                    resizeMode="cover"
                  />
                  <AnicureText
                    text={`${item.title}`}
                    type="title"
                    otherStyles={{ fontSize: 14, marginBottom: 4, marginTop: 8, textTransform: "capitalize" }}
                  />

                  <View>
                    <AnicureText
                      text={`${item.header} `}
                      type="subTitle"
                      otherStyles={{ fontFamily: "Roboto-Bold", color: "#619E42", maxWidth: 130, textTransform: "capitalize" }}
                    />
                    {/* <AnicureText
                      text={`${item.summary}`}
                      type="subTitle"
                      // left
                      otherStyles={{ color: "#619E42", maxWidth: 130 }}
                    /> */}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View>
              <Image
                source={require("../../assets/svg/consult_poster.png")}
                style={{ height: 220, width: "100%" }}
                resizeMode="contain"
              />
              <AnicureButton
                title="Call Now"
                onPress={() => navigation.navigate("Search")}
                fontSize={10}
                otherStyles={{ position: "absolute", bottom: 75, left: 15, width: 60, height: 30, borderRadius: 5 }}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>

    </View>
  ); //just kind loving humble
};

const mapStateToProps = (state: any) => ({
  fullName: state.user.userDetail.fullName,
  userCategory: state.user.userDetail?.farmDetails?.userCategory ?? "farm",
});

export default connect(mapStateToProps)(HomeScreen);

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
