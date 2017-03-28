import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid
} from 'react-native';

import {
    TabLayoutAndroid
} from 'mao-rn-android-kit';

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

    tabBar: {
        height: 38,
        backgroundColor: '#4889F1'
    },

    viewPager: {
        flex: 1
    },

    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    pageText: {
        color: '#FFF',
        fontSize: 32
    }
});

const COLORS = ['#E91E63', '#673AB7', '#2196F3', '#00BCD4', '#4CAF50', '#CDDC39']

export default class CoordinatorLayout extends Component {

    _tabTexts = [
        { text : "tab1" },
        { text: "tab2" },
        { text: "tab3" },
        { text: "tab4" },
        { text: "tab5" },
        { text: "tab6" },
        { text: "tab7" },
        { text: "tab8" },
        { text: "tab9" },
        { text: "tab10" },
        { text : "tab11" },
        { text: "tab12" }
    ];

    _tabLayout = null;
    _viewPager = null;

    componentDidMount() {
        this._tabLayout.setViewPager(this._viewPager, this._tabTexts);
    }

    render() {
        return (
            <View style={[commonStyles.container, styles.container]}>
                <View
                    style={styles.navbar}>
                    <BackButton
                        onPress={() => { this.props.navigator.pop() }}
                        style={styles.backBtn} />
                    <Text style={styles.caption}>TabLayout</Text>
                </View>
                <View style={styles.tabBar}>
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
                <ViewPagerAndroid
                    style={styles.viewPager}
                    ref={this._setViewPager}>
                    {this._getPages()}
                </ViewPagerAndroid>
            </View>
        );
    }

    _setTabLayout = component => {
        this._tabLayout = component;
    };

    _setViewPager = component => {
        this._viewPager = component;
    };

    _getPages() {
        return this._tabTexts.map((tab, index) => {
            return (
                <View
                    key={index}
                    style={[styles.page, { backgroundColor: COLORS[index % COLORS.length] }]}>
                    <Text style={styles.pageText}>{tab.text} page</Text>
                </View>
            )
        });
    }
}
