import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";


import {observer} from "mobx-react/native";
import { loadSites} from "../store";

@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    loadSites()

  }

  render() {
    let store = this.props.screenProps.store;
    const { sites } = store;
    return (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingVertical: 20}}>
            {sites && sites.map(({site_url, status}) => (
                <Card title={`${status}`}  key={site_url}>
                  <Text style={{marginBottom: 10}}>
                    {site_url}.
                  </Text>
                  <Button
                      backgroundColor="#03A9F4"
                      title="Visit"
                      onPress={() => Linking.openURL(site_url)}
                  />
                </Card>
            ))}
          </ScrollView>
        </View>)
  }
}