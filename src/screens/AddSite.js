import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {addSite} from "../store";
import {observer} from "mobx-react";

@observer
export default class AddSite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      site_url: '',
    };
  }
  async willAddSite() {
    this.setState({error: ''})

    let result = await addSite(this.state.site_url)
    this.props.navigation.goBack()
  }
  render() {
    return (
        <View style={{paddingVertical: 20}}>
          <Card title="Add Site">
            <FormLabel>Site Url</FormLabel>
            <FormInput
                placeholder="Site Url"
                autoCapitalize='none'
                onChangeText={(site_url) => this.setState({site_url})}
                value={this.state.text}
            />


            <Button
                buttonStyle={{marginTop: 20}}
                backgroundColor="#03A9F4"
                title="ADD"
                onPress={this.willAddSite.bind(this)}
            />


          </Card>
        </View>)


  }
}