import { Component } from 'react';
import { requireNativeComponent, View, findNodeHandle, UIManager } from 'react-native'; 
import Layout from '../layout-android/layout-android';
import { ViewGroupProperties, AppBarViewProperties } from '../types';
const MaoKitsAppBarLayoutAndroidManager = UIManager.MaoKitsAppBarLayoutAndroid;
const Constants:Dictionary<number> = MaoKitsAppBarLayoutAndroidManager.Constants;

const DEFAULT_PROPS: any = {
    scrollFlags: 0
};

export interface AppBarLayoutAndroidProps extends AppBarViewProperties {
}

export default class AppBarLayoutAndroid 
    extends Component<AppBarLayoutAndroidProps, any> 
{
    static SCROLL_FLAG_ENTRY_ALWAYS = Constants['SCROLL_FLAG_ENTRY_ALWAYS'];
    static SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED = Constants['SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED'];
    static SCROLL_FLAG_EXIT_UNTIL_COLLAPSED = Constants['SCROLL_FLAG_EXIT_UNTIL_COLLAPSED'];
    static SCROLL_FLAG_SCROLL = Constants['SCROLL_FLAG_SCROLL'];
    static SCROLL_FLAG_SNAP = Constants['SCROLL_FLAG_SNAP'];
    static propTypes = Object.assign({}, AppBarViewProperties);
    
    componentDidMount() {
        Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
    }

    componentDidUpdate() {
        Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
    }

    render() {
        return (
            <RCTAppBarLayoutAndroid 
                {...this.props}
            >
            {this.props.children}
            </RCTAppBarLayoutAndroid>
        );
    }
}

const RCTAppBarLayoutAndroid: any = requireNativeComponent(
    "MaoKitsAppBarLayoutAndroid", 
    AppBarLayoutAndroid,
    {
        nativeOnly: {}
    }
);
