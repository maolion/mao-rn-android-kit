import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import ExtraDimensionsAndroid from 'mao-rn-android-kit/components/extra-dimensions';

import BackButton from './back-button';

import commonStyles from '../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2'
  },

  navbar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    backgroundColor: '#2278F6'
  },

  backBtn: {
    top: 0,
    left: 0,
    height: 56,
    position: 'absolute'
  },

  caption: {
    color: '#fff',
    fontSize: 20
  },

  contentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    padding: 30
  },

  statusBar: {
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  appArea: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  softMenuBar: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoText: {
    color: '#fff',
    fontSize: 14
  },

  blackText: {
    color: '#000'
  },

  screenInfoArea: {
    padding: 30,
    paddingTop: 0,
  }
});

export default class ExtraDimensions extends Component {

  render() {
    return (
      <View style={[commonStyles.container, styles.container]}>
        <View
          style={styles.navbar}>
          <BackButton
            onPress={() => { this.props.navigator.pop() }}
            style={styles.backBtn} />
          <Text style={styles.caption}>Extra Dimensions</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.statusBar}>
            <Text style={styles.infoText}>
              Status Bar Height: {ExtraDimensionsAndroid.getStatusBarHeight()}
            </Text>
          </View>

          <View style={styles.appArea}>
            <Text style={[styles.infoText, styles.blackText]}>
              App Client Height: {ExtraDimensionsAndroid.getAppClientHeight()}
            </Text>
          </View>

          {
            ExtraDimensionsAndroid.getSoftMenuBarHeight() && (
              <View style={styles.softMenuBar}>
                <Text style={styles.infoText}>
                  Soft Menu Height: {ExtraDimensionsAndroid.getSoftMenuBarHeight()}
                </Text>
              </View>
            ) || null
          }

          {
            ExtraDimensionsAndroid.getSmartBarHeight() && (
              <View style={styles.softMenuBar}>
                <Text style={styles.infoText}>
                  Smart Bar Height: {ExtraDimensionsAndroid.getSmartBarHeight()}
                </Text>
              </View>
            ) || null
          }
        </View>

        <View style={styles.screenInfoArea}>
          <Text style={styles.screenInfoText}>
            Screen Width: {ExtraDimensionsAndroid.getScreenWidth()}
          </Text>
          <Text style={styles.screenInfoText}>
            Screen Height: {ExtraDimensionsAndroid.getScreenHeight()}
          </Text>
        </View>
      </View>
    );
  }
}
