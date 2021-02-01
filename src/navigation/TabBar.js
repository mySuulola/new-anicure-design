import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                let iconName;
                route.name === 'Home' ?
                    iconName = 'home' :
                    route.name === 'Notification' ?
                        iconName = 'bell' :
                        route.name === 'Cart' ?
                            iconName = 'heart' :
                            route.name === 'Profile' ?
                                iconName = 'account' : null;

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
                    >
                        <Icon name={iconName} size={24} color={isFocused ? '#8AC760' : '#8d8989e6'} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row', 
      backgroundColor: '#ffffff', 
      height: 60, 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      marginBottom: 10, 
      marginHorizontal: 10, 
      borderRadius: 20, 
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