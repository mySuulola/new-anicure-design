import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import commonStyling from '../styles/GeneralStyling';
import { APP_GREEN } from '../utils/constant';

const Loader = () => {
    return (
        <View style={commonStyling.centralizedContainer}>
            <ActivityIndicator 
            size="large" 
            color={APP_GREEN} 
            />
        </View>
    )
}

export default Loader;