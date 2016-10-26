var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { Component, PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import { ViewGroupProperties } from '../types';
const MaoKitsPopupWindowAndroid = UIManager.MaoKitsPopupWindowAndroid;
const Commands = MaoKitsPopupWindowAndroid.Commands;
const COMMAND_SHOW_POPUP_AS_DROPDOWN = Commands.showPopupAsDropdown;
const COMMAND_SHOW_POPUP_AS_LOCALTION = Commands.showPopupAsLocation;
const COMMAND_HIDE_POPUP = Commands.hidePopup;
export default class PopupWindow extends Component {
    render() {
        return (React.createElement(RCTPopupWindow, __assign({}, this.props, {style: styles.container}), this.props.children));
    }
    showAsDropdown(view, x = 0, y = 0) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_SHOW_POPUP_AS_DROPDOWN, [findNodeHandle(view), x, y]);
    }
    showAsLocation(gravity, x = 0, y = 0) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_SHOW_POPUP_AS_LOCALTION, [gravity, x, y]);
    }
    hide() {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), COMMAND_HIDE_POPUP, []);
    }
}
PopupWindow.propTypes = Object.assign({
    focusable: PropTypes.bool,
    outsideTouchable: PropTypes.bool,
    touchable: PropTypes.bool
}, ViewGroupProperties);
const RCTPopupWindow = requireNativeComponent("MaoKitsPopupWindowAndroid", PopupWindow, {
    nativeOnly: {}
});
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        overflow: "scroll",
        opacity: 0,
        height: 0,
        width: 999,
        top: -9999999,
        backgroundColor: 'transparent'
    }
});
