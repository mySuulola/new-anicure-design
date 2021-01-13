import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Appbar from '../../components/Appbar'

const CreateFarm = ({navigation, }: any) => {
    return (
        <View>
            <Appbar navigation={navigation} back={true} title="Step ⒈/𝟸"  />
            
        </View>
    )
}

export default CreateFarm

const styles = StyleSheet.create({})
