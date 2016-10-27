import * as React from 'react';
import { Component } from 'react';
import { requireNativeComponent, View, findNodeHandle, UIManager } from 'react-native'; 
import Layout from '../layout/layout';
import { ViewGroupProperties } from '../types';
import AppBarLayout from '../appbar-layout/appbar-layout';
export interface CoordinatorLayoutProps extends ViewGroupProperties {
    
}

const MaoKitsCoordinatorLayoutManager: any = UIManager.MaoKitsCoordinatorLayoutAndroid;
const COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = MaoKitsCoordinatorLayoutManager.Commands.setScrollingViewBehavior;
const COMMAND_SET_NESTED_SCROLL_ENABLED = MaoKitsCoordinatorLayoutManager.Commands.setNestedScrollEnabled;
const COMMAND_RESET_BEHOVIOR = MaoKitsCoordinatorLayoutManager.Commands.resetBehavior;

export default class CoordinatorLayout 
    extends Component<CoordinatorLayoutProps, any> 
{
    static propTypes = Object.assign({}, ViewGroupProperties)

    componentDidMount() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
    }

    componentDidUpdate() {
        Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
    }

    render() {
        return (
            <RCTCoordinatorLayout 
                {...this.props}
            >
            {this.props.children}
            </RCTCoordinatorLayout>
        );
    }

    setScrollingViewBehavior(view: any) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            COMMAND_SET_SCROLLING_VIEW_BEHAVIOR,
            [findNodeHandle(view)]
        );
    }

    setNestedScrollEnabled(enabled: boolean) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this), 
            COMMAND_SET_NESTED_SCROLL_ENABLED, 
            [enabled]
        );
    }

    resetBehavior(appbar: AppBarLayout, smoothly: boolean = false) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this), 
            COMMAND_RESET_BEHOVIOR, 
            [findNodeHandle(appbar), smoothly]
        );
    }
}

const RCTCoordinatorLayout: any = requireNativeComponent(
    "MaoKitsCoordinatorLayoutAndroid", 
    CoordinatorLayout,
    {
        nativeOnly: {}
    }
);
