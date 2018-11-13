import {AsyncStorage} from "react-native";
import {base_url} from "./config";
import {messaging} from "react-native-firebase";
import DeviceInfo from "react-native-device-info";

export const USER_KEY = "auth-demo-key";

async function requestPushNotificationPermissions() {
  try {
    await messaging().requestPermission();
    console.log('fcm user has authorised')
// User has authorised
  } catch (error) {
    // User has rejected permissions
    console.log('fcm User has rejected permissions')
  }
}


function getDeviceStats() {
  let isEmulator = DeviceInfo.isEmulator(); // false
  console.log('is emuu' , isEmulator)
  let res = {
    brand: DeviceInfo.getBrand(),
    build_number: DeviceInfo.getBuildNumber(),
    device_id: DeviceInfo.getDeviceId(),
    unique_id: DeviceInfo.getUniqueID(),
    device_name: DeviceInfo.getDeviceName(),
    mac_address: DeviceInfo.getMACAddress(),
  };
  console.log('res info', res)
  return res

}

async function send_fcm_token_to_api(fcmToken) {
  let token = await AsyncStorage.getItem(USER_KEY)


  try {
    let response = await fetch(base_url + '/user/fcm-token/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,

      },
      body: JSON.stringify({
        fcm_token: fcmToken,
        ...getDeviceStats()
      }),
    });
  } catch (e) {
    console.log('failed to upload fcm_token to api backend', e)
  }
}

async function registerForPushNotifications() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    await AsyncStorage.setItem('fcm-token', fcmToken);

    console.log('fcmToken got, sending it to backend', fcmToken)
    await send_fcm_token_to_api(fcmToken);
  } else {
    await AsyncStorage.setItem('not-fcm-token', fcmToken);
  }
  const enabled = await messaging().hasPermission();
  if (enabled) {
    console.log('fcmToken user has permissions')

  } else {
    console.log('fcmToken user has no permissions')

    await requestPushNotificationPermissions();
  }
}

export async function onSignIn(username, password) {

  try {
    let response = await fetch(base_url + '/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let data = await response.json()
    if (data.token) {
      console.log('login success, registering for apn')
      await AsyncStorage.setItem(USER_KEY, data.token);
      await registerForPushNotifications()
      return true
    }
    else {
      return false
    }
  }
  catch (e) {
    return false
  }
  finally {

  }
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
  });
};