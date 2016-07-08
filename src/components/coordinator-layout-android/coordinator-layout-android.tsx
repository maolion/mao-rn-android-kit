import * as React from 'react';
import { Component } from 'react';
import { requireNativeComponent, View, findNodeHandle, UIManager } from 'react-native'; 
import Layout from '../layout-android/layout-android';
import { ViewGroupProperties } from '../types';

export interface CoordinatorLayoutAndroidProps extends ViewGroupProperties {
    
}

const MaoKitsCoordinatorLayoutAndroidManager: any = UIManager.MaoKitsCoordinatorLayoutAndroid;
const COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = MaoKitsCoordinatorLayoutAndroidManager.Commands.setScrollingViewBehavior;

export default class CoordinatorLayoutAndroid 
    extends Component<CoordinatorLayoutAndroidProps, any> 
{
    static propTypes = Object.assign({}, ViewGroupProperties)

    componentDidMount() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutAndroidManager);
    }

    componentDidUpdate() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutAndroidManager);
    }

    render() {
        return (
            <RCTCoordinatorLayoutAndroid 
                {...this.props}
            >
            {this.props.children}
            </RCTCoordinatorLayoutAndroid>
        );
    }

    setScrollingViewBehavior(view: any) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            COMMAND_SET_SCROLLING_VIEW_BEHAVIOR,
            [findNodeHandle(view)]
        );
    }
}

const RCTCoordinatorLayoutAndroid: any = requireNativeComponent(
    "MaoKitsCoordinatorLayoutAndroid", 
    CoordinatorLayoutAndroid,
    {
        nativeOnly: {}
    }
);
