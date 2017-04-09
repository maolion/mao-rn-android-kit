import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';

const BACK_ICON = {
  uri: 'back'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },

  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: 'rgba(255, 255, 255, .8)'
  },

  text: {
    lineHeight: 16,
    fontSize: 16,
    color: 'rgba(255, 255, 255, .8)'
  }
});

export default class BackButton extends Component {
  render() {
    return (
      <TouchableHighlight
        {...this.props}
        underlayColor={this.props.underlayColor || 'rgba(0, 0, 0, .1)'}>
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={BACK_ICON} />
          <Text style={styles.text}>BACK</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
