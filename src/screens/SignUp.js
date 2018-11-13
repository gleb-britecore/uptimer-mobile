import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
      <Card title="SIGN UP">
        <FormLabel>Email</FormLabel>
        <FormInput
            autoCapitalize='none'

            placeholder="Email address..." />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry placeholder="Password..." />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput secureTextEntry placeholder="Confirm Password..." />

        <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => onSignIn()}
        />

      </Card>
    </View>
);