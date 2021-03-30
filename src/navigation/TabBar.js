import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AnicureText from '../components/AnicureText';


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                let iconName;
                route.name === 'Home' ?
                    iconName = 'rhombus-split' :
                    route.name === 'Search' ?
                        iconName = 'text-search' :
                        route.name === 'Appointment' ?
                            iconName = 'timetable' :
                                iconName = 'dots-horizontal-circle-outline';

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onPress}
                        style={{alignItems: "center"}}
                    >
                        <Icon name={iconName} size={24} color={isFocused ? '#216B36' : '#8d8989e6'} />
                        <AnicureText 
                        text={route.name === "Home" ? "Activities" : route.name}
                        type="subTitle"
                        otherStyles={{ color: isFocused ? '#216B36' : '#8d8989e6', fontFamily: "Roboto-Medium", marginVertical: 0 }}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row', 
      backgroundColor: '#F4F4F4', 
      height: 60, 
      justifyContent: 'space-around', 
      alignItems: 'center', 
    //   marginBottom: 10, 
    //   marginHorizontal: 10, 
    //   borderRadius: 20, 
      shadowColor: '#000',
      shadowOffset: { 
        width: 0, 
        height: 1 
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5
    }
  })

export default TabBar;