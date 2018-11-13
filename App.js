/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import ReactotronConfig from './src/ReactotronConfig'

import {Platform, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import FeedsList from './src/FeedsList.js';
// import FeedDetail from './screens/FeedDetail.js';
// import EntryDetail from './screens/EntryDetail.js';
// import AddFeed from './screens/AddFeed.js';
// const Navigator = StackNavigator({
//   FeedsList: { screen: FeedsList },
//   // FeedDetail: { screen: FeedDetail },
//   // EntryDetail: { screen: EntryDetail },
//   // AddFeed: { screen: AddFeed },
// });
// export default class App extends React.Component {
//   constructor() {
//     super();
//   }
//   render() {
//     return <Navigator screenProps={{ store }} />;
//   }
// }

import store from './src/store';


import {createRootNavigator, SignedIn, SignedOut} from "./src/router";

import { isSignedIn } from "./src/auth";
import {notifications} from "react-native-firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
        .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
        .catch(err => alert("An error occurred"));


    this.notificationListener = notifications().onNotification((notification) => {

      // Process your notification as required
      const {
        body,
        data,
        notificationId,
        sound,
        subtitle,
        title
      } = notification;
      console.log("LOG my fcm: ", title, body, JSON.stringify(data))
    });
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout screenProps={{ store }} />;
  }
}