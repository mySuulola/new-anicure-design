import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { APP_GREEN } from '../utils/constant'
import AnicureButton from './AnicureButton'
import PaystackWebView from "react-native-paystack-webview";

const Paystack = ({ onCancel, onSuccess, width, amount, actionText }: any) => {
    return (
        <PaystackWebView
            buttonText="Subscribe"
            showPayButton={true}
            paystackKey="pk_live_e668ccf16b42a2e7c5d8ff80b0312db1402cc219"
            amount={amount}
            billingEmail="evetafrica@gmail.com"
            billingMobile="07086479300"
            refNumber={Date.now()}
            // autoStart={true}
            billingName="Evet Africa"
            SafeAreaViewContainer={{ alignItems: "flex-end" }}
            // SafeAreaViewContainerModal={{  margin: 20, padding: 20 }}
            ActivityIndicatorColor={APP_GREEN}
            onSuccess={onSuccess}
            onCancel={onCancel}
            renderButton={(onPayPress: any) => (
                <AnicureButton
                    width={width ?? 150}
                    // height={35}
                    onPress={onPayPress}
                    title={actionText}
                />
            )}
        />
    )
}

export default Paystack

const styles = StyleSheet.create({})
