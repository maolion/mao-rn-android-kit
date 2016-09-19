var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component } from 'react';
import { requireNativeComponent, UIManager } from 'react-native';
import Layout from '../layout/layout';
import { AppBarViewProperties } from '../types';
const MaoKitsAppBarLayoutAndroidManager = UIManager.MaoKitsAppBarLayoutAndroid;
const Constants = MaoKitsAppBarLayoutAndroidManager.Constants;
const DEFAULT_PROPS = {
    scrollFlags: 0
};
export default class AppBarLayout extends Component {
    componentDidMount() {
        Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
    }
    componentDidUpdate() {
        Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
    }
    render() {
        return (React.createElement(RCTAppBarLayout, __assign({}, this.props), this.props.children));
    }
}
AppBarLayout.SCROLL_FLAG_ENTRY_ALWAYS = Constants['SCROLL_FLAG_ENTRY_ALWAYS'];
AppBarLayout.SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED = Constants['SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED'];
AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED = Constants['SCROLL_FLAG_EXIT_UNTIL_COLLAPSED'];
AppBarLayout.SCROLL_FLAG_SCROLL = Constants['SCROLL_FLAG_SCROLL'];
AppBarLayout.SCROLL_FLAG_SNAP = Constants['SCROLL_FLAG_SNAP'];
AppBarLayout.propTypes = Object.assign({}, AppBarViewProperties);
const RCTAppBarLayout = requireNativeComponent("MaoKitsAppBarLayoutAndroid", AppBarLayout, {
    nativeOnly: {}
});
