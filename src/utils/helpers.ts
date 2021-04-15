import dayjs from "dayjs";
import { ToastAndroid } from "react-native";

export const wait = (timeout: number) => {
   return new Promise(resolve => setTimeout(resolve, timeout));
}

export const logError = (
   error: any,
   setGeneralError: (item: any) => void,
   setIsLoading: (state: boolean) => void,
   errorMessage?: string,
) => {
   setIsLoading(false)
   const formattedError = error?.message ?? error?.data?.message;
   if (formattedError) {
      ToastAndroid.show(formattedError, ToastAndroid.LONG);
   }
   setGeneralError(formattedError ?? errorMessage ?? "Network Error. Please try again");
}

export const minuteSecond = (date?: string): string => {
   return dayjs(date ?? new Date()).format('h:mmA')
}
export const monthDayYear = (date?: string): string => {
   return dayjs(date ?? new Date()).format('MMM. DD, YYYY')
}
export const monthDay = (date?: string): string => {
   return dayjs(date ?? new Date().toLocaleString()).format('MMM DD')
}
export const dayMonthYear = (date?: string): string => {
   return dayjs(date ?? new Date().toLocaleString()).format('ddd DD MMM YYYY')
}

export const customDelay = (duration: any) => new Promise((resolve) => setTimeout(resolve, duration));
