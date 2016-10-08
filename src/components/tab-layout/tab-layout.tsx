import { Component, createElement, Children, PropTypes } from "react";
import { 
    requireNativeComponent, 
    View, 
    ViewProperties,
    UIManager,
    findNodeHandle,
    ViewPagerAndroidStatic 
} from 'react-native';

export interface Tab {
    text: string;
}

export interface TabLayoutProps extends ViewProperties {
    tabs?: Tab[];
    tabTextSize?: number;
    tabTextColor?: string;
    tabSelectedTextColor?: string;
    tabIndicatorColor?: string;
    tabIndicatorHeight?: number;
    tabMode?: "scrollable" | "fixed";
    tabGravity?: "center" | "fill";
    activeTabStyle?: Dictionary<any>;
    tabHeight?: number;
    tabSidePadding?: number;
}

export type SizeParam = number | "match_parent" | "wrap_content";

const Commands = UIManager.MaoKitsTabLayoutAndroid.Commands;
const SETUP_VIEW_PAGER = Commands.setupViewPager;
const SET_VIEW_SIZE = Commands.setViewSize;

export default class TabLayout extends Component<TabLayoutProps, any> {

    static propTypes = Object.assign({}, View.propTypes, {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired
        })),
        tabTextColor: PropTypes.string,
        tabTextSize: PropTypes.number,
        tabSelectedTextColor: PropTypes.string,
        tabIndicatorColor: PropTypes.string,
        tabIndicatorHeight: PropTypes.number,
        tabMode: PropTypes.oneOf(["scrollable", "fixed"]),
        tabGravity: PropTypes.oneOf(["center", "fill"]),
        tabHeight: PropTypes.number,
        tabSidePadding: PropTypes.number,
        activeTabStyle: PropTypes.object
    });


    render() {
        return (
            <RCTTabLayout 
                 {...this.props}
                 style={[
                     { height: 48 },
                     this.props.style
                 ]} />
        );
    }

    setViewPager(viewPager: ViewPagerAndroidStatic, tabs: Tab[], smoothScroll: boolean = true) {
        if (!viewPager) {
            return;
        }

        const viewPagerID = findNodeHandle(viewPager as any);
        
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            SETUP_VIEW_PAGER,
            [viewPagerID, tabs, smoothScroll]
        );  
    }

    setViewSize(width: SizeParam, height?: SizeParam) {
        let sizeMap: Dictionary<SizeParam> = {};
        if (width != undefined) {
            sizeMap["width"] = width;
        }

        if (height != undefined) {
            sizeMap["height"] = height;
        }
        
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            SET_VIEW_SIZE,
            [sizeMap]
        );
    }
}

const RCTTabLayout: any = requireNativeComponent(
    "MaoKitsTabLayoutAndroid", 
    TabLayout,
    {
        nativeOnly: {}
    }
);

