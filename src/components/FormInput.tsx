import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, KeyboardTypeOptions } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { APP_GREEN } from '../utils/constant';
import { Picker } from '@react-native-picker/picker';

type StatusTypes = "dropdown" | "text";
type PickerModeType = "dropdown" | "dialog";

interface IFormInput {
  labelName?: string,
  full?: boolean,
  textarea?: boolean,
  icon?: string,
  value?: string,
  selectedValue?: string,
  autoCapitalize?: any,
  keyboardType?: KeyboardTypeOptions,
  onChangeText?: any,
  onValueChange?: any,
  secureTextEntry?: boolean,
  onPress?: any,
  searchButton?: any,
  inLineButton?: boolean,
  maxLength?: number,
  disabled?: boolean,
  placeholder?: string,
  error?: string,
  preIcon?: string,
  type?: StatusTypes,
  options?: Array<{ name: string, value: string }>,
  pickerMode?: PickerModeType,
  containerStyle?: any,
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
  maxLength,
  error,
  preIcon,
  placeholder,
  searchButton,
  pickerMode,
  options,
  type,
  containerStyle,
  ...rest
}: IFormInput) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.container, { marginBottom: inLineButton ? 0 : 20, }]}>
      { (labelName !== undefined && labelName !== "") && <Text style={styles.label}>{labelName}</Text>}
      <View style={[styles.textContainer, {
        borderRadius: inLineButton ? 0 : 10,
        height: textarea ? 120 : 50,
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
        {
          (type === "dropdown" && options) ?
            <Picker
              // prompt="Send To"
              dropdownIconColor={APP_GREEN}
              itemStyle={styles.pickerItem}
              style={styles.picker}
              mode={pickerMode ?? "dialog"}
              {...rest}
            >
              {options.map((item: { name: string, value: string }) => (
                <Picker.Item key={item.value} label={item.name} value={item.value} />
              ))}
            </Picker>
            :
            <TextInput
              {...rest}
              editable
              multiline={textarea}
              placeholder={placeholder}
              placeholderTextColor={"#1F1742"}
              secureTextEntry={showPassword ? false : secureTextEntry}
              maxLength={maxLength ? maxLength : textarea ? 200 : 50}
              style={[styles.input,
              {
                textAlignVertical: textarea ? "top" : "center",
                height: "100%",
                width: inLineButton ? "85%" : "85%",
              }]}
            />}
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
                inLineButton ? <Image 
                source={require("../assets/images/chat_send_button.png")}
                resizeMode="contain"
                style={{width: 20, height: 20}}
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
  pickerItem: {
    fontFamily: "Roboto-Regular",
  },
  picker: {
    width: "100%",
    fontFamily: "Roboto-Regular",
    color: "#000000",
  },
  passwordImage: {
    width: 20,
    height: 11,
  }
});

export default FormInput;
