import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";

export const SignedOut = createStackNavigator({

  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },

  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
});


// import { createStackNavigator } from 'react-navigation'
import AddSite from './screens/AddSite';

const HomeNavStack = createStackNavigator({
  Home,
  AddSite
});

export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeNavStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
      )
    }
  }
});



export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
  );
};