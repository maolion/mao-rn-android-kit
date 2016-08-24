import * as React from 'react';
import { Component, PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, View, ViewStyle, findNodeHandle, UIManager } from 'react-native'; 
import { ViewGroupProperties } from '../types';

export interface PopupWindowProps extends ViewGroupProperties {
    focusable?: boolean;
    outsideTouchable?: boolean;
    touchable?: boolean;
}

const MaoKitsPopupWindowAndroid: any = UIManager.MaoKitsPopupWindowAndroid;
const Commands = MaoKitsPopupWindowAndroid.Commands;
const COMMAND_SHOW_POPUP_AS_DROPDOWN = Commands.showPopupAsDropdown;
const COMMAND_SHOW_POPUP_AS_LOCALTION = Commands.showPopupAsLocation;
const COMMAND_HIDE_POPUP = Commands.hidePopup;
let N = 0;
export default class PopupWindow 
    extends Component<PopupWindowProps, any> 
{
    static propTypes = Object.assign({
        focusable: PropTypes.bool,
        outsideTouchable: PropTypes.bool,
        touchable: PropTypes.bool
    }, ViewGroupProperties);

    render() {
        return (
            <RCTPopupWindow 
                {...this.props}
                key={N++}
                style={styles.container}
            >
            {this.props.children}
            </RCTPopupWindow>
        );
    }

    showAsDropdown(view: any, x: number = 0, y: number = 0) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            COMMAND_SHOW_POPUP_AS_DROPDOWN,
            [findNodeHandle(view), x, y]
        );
    }

    showAsLocation(gravity: number, x: number = 0, y: number = 0) {
        console.log(gravity);
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            COMMAND_SHOW_POPUP_AS_LOCALTION,
            [gravity, x, y]
        );
    }

    hide() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            COMMAND_HIDE_POPUP,
            []
        );
    }
}

const RCTPopupWindow: any = requireNativeComponent(
    "MaoKitsPopupWindowAndroid", 
    PopupWindow,
    {
        nativeOnly: {}
    }
);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        overflow: "visible",
        opacity: 0,
        //height: 0,
        //width: 999,
        top: -9999999,
        backgroundColor: 'transparent'
    } as ViewStyle
});