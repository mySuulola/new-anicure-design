import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, KeyboardTypeOptions } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { APP_GREEN } from '../utils/constant';

interface IFormInput {
  labelName?: string,
  full?: boolean,
  textarea?: boolean,
  icon?: string,
  value?: string,
  autoCapitalize?: any,
  keyboardType?: KeyboardTypeOptions,
  onChangeText?: any,
  secureTextEntry?: boolean,
  onPress?: any,
  searchButton?: any,
  inLineButton?: boolean,
  disabled?: boolean,
  placeholder?: string,
  error?: string,
  preIcon?: string,
}

const FormInput = ({
  labelName,
  full,
  textarea,
  icon,
  inLineButton,
  secureTextEntry,
  onPress,
  disabled,
  error,
  preIcon,
  placeholder,
  searchButton,
  ...rest
}: IFormInput) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.container, { marginBottom: inLineButton ? 0 : 20, }]}>
      { (labelName !== undefined && labelName !== "") && <Text style={styles.label}>{labelName}</Text>}
      <View style={[styles.textContainer, {
        borderRadius: inLineButton ? 0 : 10,
        borderWidth: inLineButton ? 0.3 : searchButton ? 0 : 1,
        opacity: inLineButton ? 1 : 0.6,
        backgroundColor: searchButton ? "#FFFFFF" : 'transparent', 
      }]}>
        {(preIcon && preIcon.length > 2) &&
          <AntDesignIcon
            name={preIcon}
            size={25}
            color={"#619E42"}
          />

        }
        <TextInput
          {...rest}
          editable
          placeholder={placeholder}
          placeholderTextColor={"#1F1742"}
          secureTextEntry={showPassword ? false : secureTextEntry}
          // maxLength={40}
          style={[styles.input,
          {
            width: inLineButton ? "85%" : "85%",
          }]}
        />
        {
          (inLineButton || icon) && (
            <TouchableOpacity
              disabled={disabled}
              style={[styles.button, {
                width: inLineButton ? "20%" : "1%",
                backgroundColor: inLineButton ? APP_GREEN : 'transparent',
              }]}
              onPress={() => {
                if (inLineButton && !disabled) {
                  onPress()
                } else if (icon === "password") {
                  setShowPassword(!showPassword)
                } else { }
              }}>
              {
                inLineButton ? <MaterialCommunityIcon
                  name={"arrow-right"}
                  size={25}
                  color="#FFFFFF"
                />
                  :
                  icon === "password" ?
                    <Image
                      resizeMode="contain"
                      style={styles.passwordImage}
                      source={!showPassword ? require("../assets/svg/open_eye.png") : require("../assets/svg/close_eye.png")} />
                    : <View></View>
              }
            </TouchableOpacity>
          )}
      </View>
      { (error !== undefined && error !== "") &&
        <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    // borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#1F1742",
    marginBottom: 6,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#707070",
    paddingHorizontal: 10,
  },
  button: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "100",
    fontFamily: "Roboto-Italic",
    marginBottom: 10,
  },
  passwordImage: {
    width: 20,
    height: 11,
  }
});

export default FormInput;
