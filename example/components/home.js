import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import commonStyles from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 100
  },

  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 30
  },

  headingText: {
    fontSize: 30
  },

  tip: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16
  },

  menu: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50
  },

  menuItemSeparate: {
    marginBottom: 10
  },

  copyright: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: '#999'
  }

});

export default class Home extends Component {
  render() {
    return (
      <View style={[commonStyles.container, styles.container]}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Examples</Text>
          <Text style={styles.tip}>Press the menu item button to view the particular example</Text>
        </View>
        <View style={styles.menu}>
          <Button
            onPress={this._navTo.bind(this, 'example-1')}
            title="Example #1"
            color="#2196F3" />

          <View style={styles.menuItemSeparate} />

          <Button
            style={styles.button}
            onPress={this._navTo.bind(this, 'coordinator-layout')}
            title="Coordinator layout"
            color="#2196F3" />

          <View style={styles.menuItemSeparate} />

          <Button
            onPress={this._navTo.bind(this, 'tab-layout')}
            title="Tab layout"
            color="#2196F3" />

          <View style={styles.menuItemSeparate} />

          <Button
            onPress={this._navTo.bind(this, 'popupwindow')}
            title="popupwindow"
            color="#2196F3" />

          <View style={styles.menuItemSeparate} />

          <Button
            onPress={this._navTo.bind(this, 'extra-dimensions')}
            title="Extra dimensions"
            color="#2196F3" />
        </View>
        <Text style={styles.copyright}>&copy; mao-rn-android-kit</Text>
      </View>
    );
  }

  _navTo(id) {
    this.props.navigator.push({ id })
  }
}
