import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ViewPagerAndroid
} from 'react-native';

import {
  ExtraDimensionsAndroid,
  AppBarLayoutAndroid,
  CoordinatorLayoutAndroid,
  NestedScrollViewAndroid,
  PopupWindowAndroid,
  TabLayoutAndroid
} from 'mao-rn-android-kit';

import BackButton from './back-button';

import MyButton from './my-button';

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

  actionBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 56,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingLeft: 10
  },

  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuBtn: {
    width: 34,
    paddingRight: 10
  },

  menuBtnIcon: {
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, .8)'
  },


  menu: {
    width: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },

  tabBar: {
    height: 38,
    backgroundColor: '#4889F1'
  },

  scrollView: {
    backgroundColor: "#f2f2f2"
  },

  viewPager: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  pageItem: {
    borderRadius: 2,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  pageItemContent: {
    fontSize: 30,
    color: '#FFF'
  }
});

const ITEM_COLORS = ['#E91E63', '#673AB7', '#2196F3', '#00BCD4', '#4CAF50', '#CDDC39']
const MENU_ICON = { uri: "menu" };

export default class CoordinatorLayout extends Component {
  _tabTexts = [
    { text: "tab1" },
    { text: "tab2" },
    { text: "tab3" },
    { text: "tab4" },
    { text: "tab5" },
    { text: "tab6" },
    { text: "tab7" },
    { text: "tab8" },
    { text: "tab9" },
    { text: "tab10" },
    { text: "tab11" },
    { text: "tab12" }
  ];

  _scrollHeight = (
    ExtraDimensionsAndroid.getStatusBarHeight() +
    ExtraDimensionsAndroid.getAppClientHeight() -
    ExtraDimensionsAndroid.getStatusBarHeight() -
    38
  );

  _coordinatorLayout = null;
  _appBarLayout = null;
  _scrollView = null;
  _viewPager = null;
  _menuPopup = null;
  _menuBtn = null;
  _tabLayout = null;
  _pages = [];
  _currentViewPagerPageIndex = 0;

  componentWillMount() {
    this._pages.length = 0;
  }

  componentDidMount() {
    this._coordinatorLayout.setScrollingViewBehavior(this._scrollView);
    this._tabLayout.setViewPager(this._viewPager, this._tabTexts);
    this.refs['page_0'].load();
  }

  componentWillUnmount() {
    this._menuPopup.hide();
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
              <Text style={styles.caption}>Example 1</Text>
              <View style={styles.actionBar}>
                <MyButton
                  ref={this._setMenuBtn}
                  onPress={this._handleMenuButtonPess}
                  style={[styles.actionBtn, styles.menuBtn]} >
                  <Image
                    style={styles.menuBtnIcon}
                    source={MENU_ICON} />
                </MyButton>
              </View>
            </View>
            <View
              style={styles.tabBar}>
              <TabLayoutAndroid
                tabMode="scrollable"
                tabSelectedTextColor="#fff"
                tabIndicatorColor="#fff"
                tabTextColor="rgba(255, 255, 255, .6)"
                tabIndicatorHeight={1}
                tabTextSize={6}
                tabSidePadding={10}
                tabHeight={38}
                ref={this._setTabLayout} />
            </View>
          </AppBarLayoutAndroid>

          <View
            style={[styles.scrollView, { height: this._scrollHeight }]}
            ref={this._setScrollView}>
            <ViewPagerAndroid
              onPageScroll={this._handleViewPagerPageScroll}
              onPageScrollStateChanged={this._handleViewPagerPageScrollStateChanged}
              onPageSelected={this._handleViewPagerPageSelected}
              style={[styles.viewPager, { height: this._scrollHeight }]}
              ref={this._setViewPager}>
              {this._getPages()}
            </ViewPagerAndroid>
          </View>
        </CoordinatorLayoutAndroid>
        <PopupWindowAndroid
          ref={this._setMenuPopup}>
          <View style={styles.menu}>
            <MyButton
              onPress={this._handleMenuItemPress}
              underlayColor="rgba(255, 255, 255, .2)"
              color="#fff"
              text="ITEM #1" />

            <MyButton
              onPress={this._handleMenuItemPress}
              underlayColor="rgba(255, 255, 255, .2)"
              color="#fff"
              text="ITEM #2" />
          </View>
        </PopupWindowAndroid>
      </View>
    );
  }

  _handleMenuButtonPess = () => {
    this._menuPopup.showAsDropdown(this._menuBtn, 0, -10);
  }

  _setMenuBtn = component => {
    this._menuBtn = component
  }

  _handleMenuItemPress = () => {
    this._menuPopup.hide();
  }

  _setMenuPopup = component => {
    this._menuPopup = component;
  }

  _setCoordinatorLayout = component => {
    this._coordinatorLayout = component;
  };

  _setAppBarLayout = component => {
    this._appBarLayout = component;
  };

  _setTabLayout = component => {
    this._tabLayout = component;
  }

  _setScrollView = component => {
    this._scrollView = component;
  }

  _setViewPager = component => {
    this._viewPager = component;
  }

  _addPage = component => {
    this._pages.push(component);
  }

  _handleViewPagerPageScroll = event => {
    let nativeEvent = event.nativeEvent;
    let offset = nativeEvent.offset;

    if (offset > 0) {
      this._currentViewPagerPageIndex = nativeEvent.position + 1;
    }
  }

  _handleViewPagerPageScrollStateChanged = scrollState => {
    if (scrollState === 'settling') {
      this._loadPage(this._currentViewPagerPageIndex);
    }
  }

  _handleViewPagerPageSelected = event => {
    let nativeEvent = event.nativeEvent;
    this._loadPage(nativeEvent.position);
  }

  _loadPage(index) {
    let page = this.refs['page_' + index];

    if (page && !page.isLoaded()) {
      page.load();
    }
  }

  _getPages() {
    return this._tabTexts.map((tab, index) => {
      return (
        <View
          key={index}
          style={styles.scrollView}>
          <Page
            ref={'page_' + index}
            tab={tab}
            pageIndex={index}
            key={index} />
        </View>
      )
    });
  }
}

class Page extends Component {
  state = {
    loaded: false
  };

  render() {
    let content = null;
    if (this.state.loaded) {
      content = this._getContent();
    } else {
      content = <View></View>;
    }

    return content;
  }

  isLoaded() {
    return this.state.loaded;
  }

  load() {
    if (this.state.loaded) {
      return;
    }

    this.state.loaded = true;

    this.setState({
      loaded: true
    });
  }

  _getContent() {
    let items = [];

    for (let i = 0; i < 20; i++) {
      items.push(
        <View
          key={i}
          style={[
            styles.pageItem,
            { backgroundColor: ITEM_COLORS[i % ITEM_COLORS.length] }
          ]}>
          <Text style={styles.pageItemContent}>P{this.props.pageIndex + 1} - ITEM #{i}</Text>
        </View>
      );
    }

    return (
      <NestedScrollViewAndroid>
        {items}
      </NestedScrollViewAndroid>
    );
  }
}
