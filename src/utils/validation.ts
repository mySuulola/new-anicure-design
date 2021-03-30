import { emailRegex } from "./constant";

export const emailValidation = (
  email: { value: string, error: string },
  setEmail: any,
): boolean => {
  let errorDetected = false;
  if (email.value === "") {
    errorDetected = true;
    setEmail({ value: email.value, error: "Email cannot be blank" });
  } else if (email.value !== "" && !emailRegex.test(email.value)) {
    errorDetected = true;
    setEmail({ value: email.value, error: "Enter a valid email address" });
  }else {
    setEmail({ value: email.value, error: "" });
  }
  return errorDetected;

}
export const fullNameValidation = (
  fullName: { value: string, error: string },
  setFullName: any,
): boolean => {
  let errorDetected: boolean = false;

  if (fullName.value === "") {
    errorDetected = true;
    setFullName({ value: fullName.value, error: "Full Name cannot be blank" });
  } else if (fullName.value.length < 6) {
    errorDetected = true;
    setFullName({ value: fullName.value, error: "Full Name cannot be less than 6 characters" });
  } else {
    setFullName({ value: fullName.value, error: "" });
  }
  return errorDetected;
}

export const farmAddressValidation = (
  farmAddress: { value: string, error: string },
  setFarmAddress: any,
): boolean => {
  let errorDetected: boolean = false;

  if (farmAddress.value === "") {
    errorDetected = true;
    setFarmAddress({ value: farmAddress.value, error: "Farm Address cannot be blank" });
  } else if (farmAddress.value.length < 6) {
    errorDetected = true;
    setFarmAddress({ value: farmAddress.value, error: "Farm Address cannot be less than 6 characters" });
  } else {
    setFarmAddress({ value: farmAddress.value, error: "" });
  }
  return errorDetected;
}

export const farmNameValidation = (
  farmName: { value: string, error: string },
  setFarmName: any,
): boolean => {
  let errorDetected: boolean = false;

  if (farmName.value === "") {
    errorDetected = true;
    setFarmName({ value: farmName.value, error: "Field cannot be blank" });
  } else {
    setFarmName({ value: farmName.value, error: "" });
  }
  return errorDetected;
}

export const passwordValidation = (
  password: { value: string, error: string },
  setPassword: any,
): boolean => {
  let errorDetected: boolean = false;
  if (password.value === "") {
    errorDetected = true;
    setPassword({ value: password.value, error: "Password cannot be blank" });
  } else if (password.value !== "" && password.value.length < 5) {
    errorDetected = true;
    setPassword({ value: password.value, error: "Password must be at least 5 digits" });
  }else {
    setPassword({ value: password.value, error: "" });
  }
  return errorDetected;
}

export const confirmPasswordValidation = (
  initial: string,
  password: { value: string, error: string },
  setConfirmPassword: any,
): boolean => {
  let errorDetected: boolean = false;
  if (password.value === "") {
    errorDetected = true;
    setConfirmPassword({ value: password.value, error: "Confirm Password cannot be blank" });
  } else if (password.value !== initial) {
    errorDetected = true;
    setConfirmPassword({ value: password.value, error: "Password do not match" });
  } else {
    setConfirmPassword({ value: password.value, error: "" });
  }
  return errorDetected;
}
export const OTPCodeValidation = (
  authorizationCode: { value: string, error: string },
  setAuthorizationCode: any ): boolean => {
    
  let errorDetected: boolean = false;
  if (authorizationCode.value === "") {
    errorDetected = true;
    setAuthorizationCode({ value: authorizationCode.value, error: "Authorization Code cannot be empty" });
  } else if (authorizationCode.value.length !== 6) {
    errorDetected = true;
    setAuthorizationCode({ value: authorizationCode.value, error: "Authorization Code must be 6 digits" });
  } else {
    setAuthorizationCode({ value: authorizationCode.value, error: "" });
  }
  return errorDetected;
}
export const mobileNumberValidation = (
  mobileNumber: { value: string, error: string },
  setMobileNumber: any ): boolean => {
    
  let errorDetected: boolean = false;
  if (mobileNumber.value === "") {
    errorDetected = true;
    setMobileNumber({ value: mobileNumber.value, error: "Mobile Number cannot be empty" });
  } else if (mobileNumber.value.length !== 11) {
    errorDetected = true;
    setMobileNumber({ value: mobileNumber.value, error: "Mobile Number must be 11 digits" });
  } else {
    setMobileNumber({ value: mobileNumber.value, error: "" });
  }
  return errorDetected;
}

export const generalTextFieldValidation = (
  field: { value: string, error: string },
  setField: any,
): boolean => {
  let errorDetected: boolean = false;

  if (field.value === "") {
    errorDetected = true;
    setField({ value: field.value, error: "Field cannot be blank" });
  }
  //  else if (field.value.length < 4) {
  //   errorDetected = true;
  //   setField({ value: field.value, error: "Field cannot be less than 4 characters" });
  // } 
  else {
    setField({ value: field.value, error: "" });
  }
  return errorDetected;
}