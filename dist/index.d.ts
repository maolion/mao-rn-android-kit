declare module 'mao-rn-android-kit/components/types' {
	import { ViewProperties } from 'react-native';
	export interface LayoutParams {
	    width?: number | "match_parent" | "wrap_parent";
	    height?: number | "match_parent" | "wrap_content";
	}
	export const LayoutParams: {
	    width: React.Requireable<any>;
	    height: React.Requireable<any>;
	};
	export interface ViewGroupProperties extends ViewProperties {
	    layoutParams?: LayoutParams;
	    fitsSystemWindows?: boolean;
	}
	export const ViewGroupProperties: {} & React.ValidationMap<ViewProperties> & {
	    layoutParams: React.Requireable<any>;
	    fitsSystemWindows: React.Requireable<any>;
	};
	export interface AppBarLayoutParams extends LayoutParams {
	    scrollFlags?: number;
	}
	export interface AppBarViewProperties extends ViewGroupProperties {
	    layoutParams?: AppBarLayoutParams;
	}
	export const AppBarViewProperties: {} & {} & React.ValidationMap<ViewProperties> & {
	    layoutParams: React.Requireable<any>;
	    fitsSystemWindows: React.Requireable<any>;
	} & {
	    layoutParams: React.Requireable<any>;
	};

}
declare module 'mao-rn-android-kit/components/layout/layout' {
	import { ViewGroupProperties } from 'mao-rn-android-kit/components/types';
	export default class Layout {
	    static setChildrenLayoutParams(component: React.Component<ViewGroupProperties, any>, manager: any, defaultParams?: any): void;
	}

}
declare module 'mao-rn-android-kit/components/appbar-layout/appbar-layout' {
	import { Component } from 'react';
	import { AppBarViewProperties } from 'mao-rn-android-kit/components/types';
	export interface AppBarLayoutProps extends AppBarViewProperties {
	}
	export default class AppBarLayout extends Component<AppBarLayoutProps, any> {
	    static SCROLL_FLAG_ENTRY_ALWAYS: number;
	    static SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED: number;
	    static SCROLL_FLAG_EXIT_UNTIL_COLLAPSED: number;
	    static SCROLL_FLAG_SCROLL: number;
	    static SCROLL_FLAG_SNAP: number;
	    static propTypes: {} & {} & {} & React.ValidationMap<React.ViewProperties> & {
	        layoutParams: React.Requireable<any>;
	        fitsSystemWindows: React.Requireable<any>;
	    } & {
	        layoutParams: React.Requireable<any>;
	    };
	    componentDidMount(): void;
	    componentDidUpdate(): void;
	    render(): JSX.Element;
	}

}
declare module 'mao-rn-android-kit/components/coordinator-layout/coordinator-layout' {
	import * as React from 'react';
	import { Component } from 'react';
	import { ViewGroupProperties } from 'mao-rn-android-kit/components/types';
	import AppBarLayout from 'mao-rn-android-kit/components/appbar-layout/appbar-layout';
	export interface CoordinatorLayoutProps extends ViewGroupProperties {
	}
	export default class CoordinatorLayout extends Component<CoordinatorLayoutProps, any> {
	    static propTypes: {} & {} & React.ValidationMap<React.ViewProperties> & {
	        layoutParams: React.Requireable<any>;
	        fitsSystemWindows: React.Requireable<any>;
	    };
	    componentDidMount(): void;
	    componentDidUpdate(): void;
	    render(): JSX.Element;
	    setScrollingViewBehavior(view: any): void;
	    resetBehavior(appbar: AppBarLayout, nestedScrollEnabled?: boolean, smoothly?: boolean): void;
	}

}
declare module 'mao-rn-android-kit/components/nested-scroll-view/nested-scroll-view' {
	import { Component } from 'react';
	import { ScrollViewProperties } from 'react-native';
	export interface NestedScrollViewProps extends ScrollViewProperties {
	    showVerticalScrollIndicator?: boolean;
	    removeClippedSubviews?: boolean;
	    onContentSizeChange?: (width: number, height: number) => void;
	} class NestedScrollView extends Component<NestedScrollViewProps, any> {
	    static propTypes: {} & React.ValidationMap<React.ScrollViewProps> & {
	        showVerticalScrollIndicator: React.Requireable<any>;
	    };
	    private _scrollView;
	    private _innerView;
	    constructor(props: NestedScrollViewProps, context: any);
	    setNativeProps(props: Object): void;
	    getScrollResponder(): any;
	    getInnerViewNode(): any;
	    scrollTo(destX?: number, destY?: number): void;
	    scrollWithoutAnimationTo(destX?: number, destY?: number): void;
	    handleScroll(event: any): void;
	    render(): JSX.Element;
	    private _handleContentOnLayout(event);
	}
	export default NestedScrollView;

}
declare module 'mao-rn-android-kit/components/tab-layout/tab-layout' {
	import { Component } from "react";
	import { ViewProperties, ViewPagerAndroidStatic } from 'react-native';
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
	export default class TabLayout extends Component<TabLayoutProps, any> {
	    static propTypes: {} & React.ValidationMap<ViewProperties> & {
	        tabs: React.Requireable<any>;
	        tabTextColor: React.Requireable<any>;
	        tabTextSize: React.Requireable<any>;
	        tabSelectedTextColor: React.Requireable<any>;
	        tabIndicatorColor: React.Requireable<any>;
	        tabIndicatorHeight: React.Requireable<any>;
	        tabMode: React.Requireable<any>;
	        tabGravity: React.Requireable<any>;
	        tabHeight: React.Requireable<any>;
	        tabSidePadding: React.Requireable<any>;
	        activeTabStyle: React.Requireable<any>;
	    };
	    render(): JSX.Element;
	    setViewPager(viewPager: ViewPagerAndroidStatic, tabs: Tab[], smoothScroll?: boolean): void;
	    setViewSize(width: SizeParam, height?: SizeParam): void;
	}

}
declare module 'mao-rn-android-kit/components/popupwindow/popupwindow' {
	import * as React from 'react';
	import { Component } from 'react';
	import { ViewGroupProperties } from 'mao-rn-android-kit/components/types';
	export interface PopupWindowProps extends ViewGroupProperties {
	    focusable?: boolean;
	    outsideTouchable?: boolean;
	    touchable?: boolean;
	}
	export default class PopupWindow extends Component<PopupWindowProps, any> {
	    static propTypes: {
	        focusable: React.Requireable<any>;
	        outsideTouchable: React.Requireable<any>;
	        touchable: React.Requireable<any>;
	    } & {} & React.ValidationMap<React.ViewProperties> & {
	        layoutParams: React.Requireable<any>;
	        fitsSystemWindows: React.Requireable<any>;
	    };
	    render(): JSX.Element;
	    showAsDropdown(view: any, x?: number, y?: number): void;
	    showAsLocation(gravity: number, x?: number, y?: number): void;
	    hide(): void;
	}

}
declare module 'mao-rn-android-kit/components/gravity/gravity' {
	 var _default: {
	    readonly AXIS_CLIP: number;
	    readonly AXIS_PULL_AFTER: number;
	    readonly AXIS_PULL_BEFORE: number;
	    readonly AXIS_SPECIFIED: number;
	    readonly AXIS_X_SHIFT: number;
	    readonly AXIS_Y_SHIFT: number;
	    readonly BOTTOM: number;
	    readonly CENTER: number;
	    readonly CENTER_HORIZONTAL: number;
	    readonly CENTER_VERTICAL: number;
	    readonly CLIP_HORIZONTAL: number;
	    readonly CLIP_VERTICAL: number;
	    readonly DISPLAY_CLIP_HORIZONTAL: number;
	    readonly DISPLAY_CLIP_VERTICAL: number;
	    readonly END: number;
	    readonly FILL: number;
	    readonly FILL_HORIZONTAL: number;
	    readonly FILL_VERTICAL: number;
	    readonly HORIZONTAL_GRAVITY_MASK: number;
	    readonly LEFT: number;
	    readonly NO_GRAVITY: number;
	    readonly RELATIVE_HORIZONTAL_GRAVITY_MASK: number;
	    readonly RELATIVE_LAYOUT_DIRECTION: number;
	    readonly RIGHT: number;
	    readonly START: number;
	    readonly TOP: number;
	    readonly VERTICAL_GRAVITY_MASK: number;
	};
	export default _default;

}
declare module 'mao-rn-android-kit/components/extra-dimensions/extra-dimensions' {
	/**
	 * 获取设备实际屏幕高度
	 */
	export function getScreenHeight(): any;
	/**
	 * 获取设备实际屏幕宽度
	 */
	export function getScreenWidth(): any;
	/**
	 * 获取魅族SmartBar高度
	 */
	export function getSmartBarHeight(): any;
	/**
	 * 获取软键盘导航按钮高度
	 */
	export function getSoftMenuBarHeight(): any;
	/**
	 * 获取状态栏高度
	 */
	export function getStatusBarHeight(): any;
	/**
	 * 获取APP可视容器宽度
	 */
	export function getAppClientWidth(): any;
	/**
	 * 获取APP可视容器高度
	 */
	export function getAppClientHeight(): number;

}
declare module 'mao-rn-android-kit/index' {
	import AppBarLayoutAndroid from 'mao-rn-android-kit/components/appbar-layout/appbar-layout';
	import CoordinatorLayoutAndroid from 'mao-rn-android-kit/components/coordinator-layout/coordinator-layout';
	import NestedScrollViewAndroid from 'mao-rn-android-kit/components/nested-scroll-view/nested-scroll-view';
	import TabLayoutAndroid from 'mao-rn-android-kit/components/tab-layout/tab-layout';
	import PopupWindowAndroid from 'mao-rn-android-kit/components/popupwindow/popupwindow';
	import GravityAndroid from 'mao-rn-android-kit/components/gravity/gravity';
	import * as ExtraDimensionsAndroid from 'mao-rn-android-kit/components/extra-dimensions/extra-dimensions';
	import * as Types from 'mao-rn-android-kit/components/types';
	export { PopupWindowAndroid, AppBarLayoutAndroid, CoordinatorLayoutAndroid, NestedScrollViewAndroid, TabLayoutAndroid, ExtraDimensionsAndroid, GravityAndroid, Types };

}
interface Dictionary<T> {
    [key: string]: T;
}


declare namespace __React {
    interface NativeComponentInterface {
        name: string;
        props: any;
    }
    
    export function findNodeHandle(component: Component<any, any>): any;
    export function requireNativeComponent(viewName: string, componentInterface: NativeComponentInterface|ComponentClass<any>, extraConfig?: any): React.ClassicComponentClass<any>;
    export var NativeModules: any;
    export let UIManager: any;
}


declare module 'react-native/Libraries/Components/ScrollResponder' {
    export interface ScrollResponderHandles {
        scrollResponderHandleTouchStart?: Function;
        scrollResponderHandleTouchMove?: Function;
        scrollResponderHandleTouchEnd?: Function;
        scrollResponderHandleScrollBeginDrag?: Function;
        scrollResponderHandleScrollEndDrag?: Function;
        scrollResponderHandleMomentumScrollBegin?: Function;
        scrollResponderHandleMomentumScrollEnd?: Function;
        scrollResponderHandleStartShouldSetResponder?: Function;
        scrollResponderHandleStartShouldSetResponderCapture?: Function;
        scrollResponderHandleScrollShouldSetResponder?: Function;
        scrollResponderHandleResponderGrant?: Function;
        scrollResponderHandleTerminationRequest?: Function;
        scrollResponderHandleTerminate?: Function;
        scrollResponderHandleResponderRelease?: Function;
        scrollResponderHandleResponderReject?: Function;
    }
    export let Mixin: any;
}declare module 'mao-rn-android-kit' {
	export * from 'mao-rn-android-kit/index';
}
