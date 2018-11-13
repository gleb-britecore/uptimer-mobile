
import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";
let base_url = 'http://192.168.0.103:8000'

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
    await AsyncStorage.setItem(USER_KEY, data.token);
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