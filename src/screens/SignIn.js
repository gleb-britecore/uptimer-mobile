import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      username: '',
      password: '',
    };
  }
  async willSignIn() {
    this.setState({error: ''})
    let result = await onSignIn(this.state.username, this.state.password)
    if (result){
      this.props.navigation.navigate("SignedIn")
    }
    else {
      this.setState({error: 'Login failed'})
    }
  }
  render() {
    return (
        <View style={{paddingVertical: 20}}>
          <Card title="SIGN IN">
            <FormLabel>Email</FormLabel>
            <FormInput
                placeholder="Email address..."
                onChangeText={(username) => this.setState({username})}
                autoCapitalize='none'

                value={this.state.username}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry placeholder="Password..."/>

            <Button
                buttonStyle={{marginTop: 20}}
                backgroundColor="#03A9F4"
                title="SIGN IN"
                onPress={this.willSignIn.bind(this)}
            />
            <Button
                buttonStyle={{marginTop: 20}}
                backgroundColor="transparent"
                textStyle={{color: "#bcbec1"}}
                title="Create new account"
                onPress={() => this.props.navigation.navigate("SignUp")}
            />
            <FormLabel>{this.state.error}</FormLabel>

          </Card>
        </View>)


  }
}