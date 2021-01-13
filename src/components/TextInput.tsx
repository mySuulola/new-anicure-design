import React, { useState } from 'react'
import { KeyboardTypeOptions, Dimensions } from 'react-native';
import { TextInput, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';



interface IAnicureTextInput {
    keyboardType?: KeyboardTypeOptions,
    autoFocus?: boolean,
    textarea?: boolean,
    decoratorIcon?: string,
    validation?: boolean,
    rules?: any,
    placeholder?: string,
    setFieldState: Function,
    fieldValue: any,
    maxLength?: number,
    secureTextEntry?: boolean
}

const AnicureTextInput = ({
    textarea,
    decoratorIcon,
    validation,
    rules,
    placeholder,
    fieldValue,
    setFieldState,
    autoFocus,
    keyboardType,
    maxLength,
    secureTextEntry
}: IAnicureTextInput) => {

    const [isValid, setIsValid] = useState(false)
    return (
        <>
            <View style={styles.container}>
                {decoratorIcon && <Icon
                    name={decoratorIcon}
                    size={25}
                    color={"black"}
                    style={styles.px7}
                />}
                <TextInput
                    secureTextEntry={secureTextEntry}
                    autoFocus={autoFocus ?? false}
                    keyboardType={keyboardType ?? "name-phone-pad"}
                    value={fieldValue}
                    maxLength={maxLength}
                    onChangeText={text => {
                        setFieldState(text);
                        if (fieldValue.length >= rules.minLength) {
                            setIsValid(true)
                        } else {
                            setIsValid(false)
                        }
                    }}
                    style={styles.flex}
                    placeholder={placeholder}
                />
                {validation && fieldValue !== "" && (
                    isValid ?
                        <View style={[styles.iconContainer, styles.success]}>
                            <MaterialCommunityIcon name="check" size={20} color={"#fff"} />
                        </View>
                        :
                        <View style={[styles.iconContainer, styles.failed]}>
                            <MaterialCommunityIcon name="close" size={20} color={"#fff"} />
                        </View>
                )}
            </View>

        </>

    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        paddingHorizontal: 7,
    },
    px7: {
        paddingHorizontal: 7
    },
    iconContainer: { borderRadius: 50, padding: 5 },
    failed: { backgroundColor: "#e2393969" },
    success: { backgroundColor: "#6bea81e8" }
})

export default AnicureTextInput
