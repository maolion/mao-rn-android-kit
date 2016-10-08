var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, PropTypes } from "react";
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
const Commands = UIManager.MaoKitsTabLayoutAndroid.Commands;
const SETUP_VIEW_PAGER = Commands.setupViewPager;
const SET_VIEW_SIZE = Commands.setViewSize;
export default class TabLayout extends Component {
    render() {
        return (React.createElement(RCTTabLayout, __assign({}, this.props, {style: [
            { height: 48 },
            this.props.style
        ]})));
    }
    setViewPager(viewPager, tabs, smoothScroll = true) {
        if (!viewPager) {
            return;
        }
        const viewPagerID = findNodeHandle(viewPager);
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), SETUP_VIEW_PAGER, [viewPagerID, tabs, smoothScroll]);
    }
    setViewSize(width, height) {
        let sizeMap = {};
        if (width != undefined) {
            sizeMap["width"] = width;
        }
        if (height != undefined) {
            sizeMap["height"] = height;
        }
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), SET_VIEW_SIZE, [sizeMap]);
    }
}
TabLayout.propTypes = Object.assign({}, View.propTypes, {
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
const RCTTabLayout = requireNativeComponent("MaoKitsTabLayoutAndroid", TabLayout, {
    nativeOnly: {}
});
