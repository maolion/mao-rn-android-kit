import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import {
  PopupWindowAndroid,
  ExtraDimensionsAndroid,
  GravityAndroid
} from 'mao-rn-android-kit';

import BackButton from './back-button';
import MyButton from './my-button';

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
    padding: 30,
    alignItems: 'stretch'
  },

  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 36
  },

  btn1: {
    backgroundColor: '#673AB7',
    width: 80
  },

  btn2: {
    backgroundColor: '#4CAF50',
    width: 80
  },

  menu1: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    width: 200,
    padding: 10
  },

  menu2: {
    backgroundColor: '#4CAF50',
    width: 200,
    padding: 10
  },

  otherButtonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btn3: {
    backgroundColor: '#E91E63',
    width: 100
  },

  menu3: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default class Popupwindow extends Component {
  _btn1 = null;
  _popupwindow1 = null;

  _btn2 = null;
  _popupwindow2 = null;

  _popupwindow3 = null;

  componentWillUnmount() {
    this._popupwindow1.hide();
    this._popupwindow2.hide();
    this._popupwindow3.hide();
  }

  render() {
    return (
      <View style={[commonStyles.container, styles.container]}>
        <View
          style={styles.navbar}>
          <BackButton
            onPress={() => { this.props.navigator.pop() }}
            style={styles.backBtn} />
          <Text style={styles.caption}>Popupwindow</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.buttonBar}>
            <MyButton
              ref={this._setBtn1}
              onPress={this._handleBtn1Press}
              style={styles.btn1}
              color="#fff"
              text="BTN #1" />

            <MyButton
              ref={this._setBtn2}
              onPress={this._handleBtn2Press}
              style={styles.btn2}
              color="#fff"
              text="BTN #1" />
          </View>

          <View style={styles.otherButtonArea}>
            <MyButton
              ref={this._setBtn3}
              onPress={this._handleBtn3Press}
              style={styles.btn3}
              color="#fff"
              text="BTN #3" />
          </View>
        </View>


        <PopupWindowAndroid
          ref={this._setPopupwindow1}>
          <View style={styles.menu1}>
            <MyButton
              onPress={this._handleMenu1ItemPress}
              color="#fff"
              text="ITEM #1" />

            <MyButton
              onPress={this._handleMenu1ItemPress}
              color="#fff"
              text="ITEM #2" />
          </View>
        </PopupWindowAndroid>

        <PopupWindowAndroid
          ref={this._setPopupwindow2}>
          <View style={styles.menu2}>
            <MyButton
              onPress={this._handleMenu2ItemPress}
              color="#fff"
              text="ITEM #1" />

            <MyButton
              onPress={this._handleMenu2ItemPress}
              color="#fff"
              text="ITEM #2" />
          </View>
        </PopupWindowAndroid>

        <PopupWindowAndroid
          ref={this._setPopupwindow3}>
          <View
            style={[
              styles.menu3,
              {
                width: ExtraDimensionsAndroid.getAppClientWidth()
              }]}>
            <MyButton
              onPress={this._handleMenu3ItemPress}
              style={{ backgroundColor: '#CDDC39' }}
              color="#fff"
              text="Hide PopupWindow" />
          </View>
        </PopupWindowAndroid>
      </View>
    );
  }

  _setBtn1 = component => {
    this._btn1 = component;
  };

  _setPopupwindow1 = component => {
    this._popupwindow1 = component;
  };

  _handleBtn1Press = () => {
    this._popupwindow1.showAsDropdown(this._btn1);
  };

  _handleMenu1ItemPress = () => {
    this._popupwindow1.hide();
  }

  _setBtn2 = component => {
    this._btn2 = component;
  };

  _setPopupwindow2 = component => {
    this._popupwindow2 = component;
  };

  _handleBtn2Press = () => {
    this._popupwindow2.showAsDropdown(this._btn2, -120, -40);
  };

  _handleMenu2ItemPress = () => {
    this._popupwindow2.hide();
  };

  _setPopupwindow3 = component => {
    this._popupwindow3 = component;
  };

  _handleBtn3Press = () => {
    this._popupwindow3.showAsLocation(GravityAndroid.BOTTOM, 0, 0);
  };

  _handleMenu3ItemPress = () => {
    this._popupwindow3.hide();
  };
}
