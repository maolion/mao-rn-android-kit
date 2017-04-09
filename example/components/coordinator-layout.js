import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';

import {
  ExtraDimensionsAndroid,
  AppBarLayoutAndroid,
  CoordinatorLayoutAndroid,
  NestedScrollViewAndroid
} from 'mao-rn-android-kit';

import BackButton from './back-button';

import commonStyles from '../styles';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#2278F6"
  },

  navbar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: 'relative'
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

  heading: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4889F1"
  },

  headingText: {
    color: 'rgba(255, 255, 255, .6)'
  },

  scrollView: {
    backgroundColor: "#f2f2f2"
  },

  item: {
    borderRadius: 2,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemContent: {
    fontSize: 30,
    color: '#FFF'
  }
});

const ITEM_COLORS = ['#E91E63', '#673AB7', '#2196F3', '#00BCD4', '#4CAF50', '#CDDC39']

export default class CoordinatorLayout extends Component {
  _scrollHeight = (
    ExtraDimensionsAndroid.getStatusBarHeight() +
    ExtraDimensionsAndroid.getAppClientHeight() -
    ExtraDimensionsAndroid.getStatusBarHeight() -
    38
  );

  _coordinatorLayout = null;
  _appBarLayout = null;
  _scrollView = null;

  _setCoordinatorLayout = component => {
    this._coordinatorLayout = component;
  };

  _setAppBarLayout = component => {
    this._appBarLayout = component;
  };

  _setScrollView = component => {
    this._scrollView = component;
  };

  componentDidMount() {
    this._coordinatorLayout.setScrollingViewBehavior(this._scrollView);
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <CoordinatorLayoutAndroid
          fitsSystemWindows={false}
          ref={this._setCoordinatorLayout}>

          <AppBarLayoutAndroid
            ref={this._setAppBarLayout}
            layoutParams={{
              height: 94 // required
            }}
            style={styles.appbar} >
            <View
              style={styles.navbar}
              layoutParams={{
                height: 56, // required
                scrollFlags: (
                  AppBarLayoutAndroid.SCROLL_FLAG_SCROLL |
                  AppBarLayoutAndroid.SCROLL_FLAG_ENTRY_ALWAYS
                )
              }}>
              <BackButton
                onPress={() => { this.props.navigator.pop() }}
                style={styles.backBtn} />
              <Text style={styles.caption}>CoordinatorLayout</Text>
            </View>
            <View
              style={styles.heading}>
              <Text style={styles.headingText}>Heading</Text>
            </View>
          </AppBarLayoutAndroid>

          <View
            style={[styles.scrollView, { height: this._scrollHeight }]}
            ref={this._setScrollView}>
            <NestedScrollViewAndroid>
              {this._getItems(30)}
            </NestedScrollViewAndroid>
          </View>
        </CoordinatorLayoutAndroid>
      </View>
    );
  }

  _getItems(count) {
    let items = [];

    for (let i = 0; i < count; i++) {
      items.push(
        <View
          key={i}
          style={[
            styles.item,
            { backgroundColor: ITEM_COLORS[i % ITEM_COLORS.length] }
          ]}>
          <Text style={styles.itemContent}>ITEM #{i}</Text>
        </View>
      );
    }

    return items;
  }
}
