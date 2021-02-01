import React from 'react'
import { View } from 'react-native'
import AnicureButton from './AnicureButton'

const IntroAction = ({onDone, handleLogin}: any) => {
    return (
        <View style={{paddingHorizontal: 20, marginBottom: 10}}>
            <AnicureButton
              onPress={onDone}
              title="Get Started"
              fontSize={17}
            />
            <AnicureButton
              onPress={handleLogin}
              title="Login to Account"
              textBtn={true}
              fontSize={17}
            />
          </View>
    )
}

export default IntroAction;