var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { Component } from 'react';
import { requireNativeComponent, findNodeHandle, UIManager } from 'react-native';
import Layout from '../layout/layout';
import { ViewGroupProperties } from '../types';
const MaoKitsCoordinatorLayoutManager = UIManager.MaoKitsCoordinatorLayoutAndroid;
const COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = MaoKitsCoordinatorLayoutManager.Commands.setScrollingViewBehavior;
const COMMAND_SET_NESTED_SCROLL_ENABLED = MaoKitsCoordinatorLayoutManager.Commands.setNestedScrollEnabled;
const COMMAND_RESET_BEHOVIOR = MaoKitsCoordinatorLayoutManager.Commands.resetBehavior;
export default class CoordinatorLayout extends Component {
    componentDidMount() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
    }
    componentDidUpdate() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
    }
    render() {
        return (React.createElement(RCTCoordinatorLayout, __assign({}, this.props), this.props.children));
    }
    setScrollingViewBehavior(view) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_SET_SCROLLING_VIEW_BEHAVIOR, [findNodeHandle(view)]);
    }
    setNestedScrollEnabled(enabled) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_SET_NESTED_SCROLL_ENABLED, [enabled]);
    }
    resetBehavior(appbar, smoothly = false) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_RESET_BEHOVIOR, [findNodeHandle(appbar), smoothly]);
    }
}
CoordinatorLayout.propTypes = Object.assign({}, ViewGroupProperties);
const RCTCoordinatorLayout = requireNativeComponent("MaoKitsCoordinatorLayoutAndroid", CoordinatorLayout, {
    nativeOnly: {}
});
