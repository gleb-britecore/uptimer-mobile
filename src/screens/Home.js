import React from "react";
import {ScrollView, Text, Linking, View} from "react-native";
import {Card, Button, Badge} from "react-native-elements";


import {observer} from "mobx-react/native";
import {loadSites, deleteSite} from "../store";

@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    loadSites()

  }

  render() {
    let store = this.props.screenProps.store;
    const {sites} = store;
    return (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingVertical: 30}}>

            {sites && sites.map(({site_url, status, url}) => (
                <Card title={`${site_url}`} key={site_url}>
                  <Text style={{marginBottom: 10}}>
                    <Text>{status}</Text>

                  </Text>
                  <Button
                      backgroundColor="#03A9F4"
                      title="Visit"
                      onPress={() => Linking.openURL(site_url)}
                  />

                  <Button title="Delete"
                          buttonStyle={{marginTop: 20}}
                          backgroundColor="transparent"
                          textStyle={{color: "#aa0000"}}
                          onPress={() => deleteSite(url)}

                  />

                </Card>
            ))}


            <Button title="+ Add"
                    buttonStyle={{marginTop: 20}}
                    backgroundColor="transparent"
                    textStyle={{color: "#bcbec1"}}
                    onPress={() => this.props.navigation.push("AddSite")}

            />
          </ScrollView>

        </View>)
  }
}