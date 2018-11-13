import React from 'react';
import { Container, Content, List, ListItem, Text,Button } from 'native-base';
import { observer } from 'mobx-react/native';
import {addFeed} from "./store";
@observer
export default class FeedsList extends React.Component {
  _handleAddPress() {
    addFeed('sadasdas', '');
  }
  render() {
    const { feeds } = this.props.screenProps.store;
    return (
        <Container>
          <Content>
            <List>
              {feeds &&
              feeds.map((f, i) => (
                  <ListItem key={i}>
                    <Text>{f.title}</Text>
                  </ListItem>
              ))}
            </List>
            <Button onPress={this._handleAddPress.bind(this)}><Text >Add</Text></Button>
          </Content>
        </Container>
    );
  }
}