var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, findNodeHandle, View, ScrollView } from 'react-native';
import * as ScrollResponder from 'react-native/Libraries/Components/ScrollResponder';
import reactMixins from 'react-mixins-decorator';
let NestedScrollView = class NestedScrollView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.scrollResponderMixinGetInitialState();
    }
    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    }
    getScrollResponder() {
        return this;
    }
    getInnerViewNode() {
        return findNodeHandle(this._innerView);
    }
    scrollTo(destX, destY) {
        this.getScrollResponder().scrollResponderScrollTo(destX || 0, destY || 0);
    }
    scrollWithoutAnimationTo(destX, destY) {
        this.getScrollResponder().scrollResponderScrollWithoutAnimationTo(destX || 0, destY || 0);
    }
    handleScroll(event) {
        if (global.__DEV__) {
            if (this.props.onScroll && !this.props.scrollEventThrottle) {
                console.log('You specified `onScroll` on a <NestedScrollViewAndroid> but not ' +
                    '`scrollEventThrottle`. You will only receive one event. ' +
                    'Using `16` you get all the events but be aware that it may ' +
                    'cause frame drops, use a bigger number if you don\'t need as ' +
                    'much precision.');
            }
        }
        if (this.props.keyboardDismissMode === 'on-drag') {
            global.dismissKeyboard && global.dismissKeyboard();
        }
        this.scrollResponderHandleScroll(event);
    }
    render() {
        const responder = this;
        ;
        const eventProps = {
            onTouchStart: responder.scrollResponderHandleTouchStart,
            onTouchMove: responder.scrollResponderHandleTouchMove,
            onTouchEnd: responder.scrollResponderHandleTouchEnd,
            onScrollBeginDrag: responder.scrollResponderHandleScrollBeginDrag,
            onScrollEndDrag: responder.scrollResponderHandleScrollEndDrag,
            onMomentumScrollBegin: responder.scrollResponderHandleMomentumScrollBegin,
            onMomentumScrollEnd: responder.scrollResponderHandleMomentumScrollEnd,
            onStartShouldSetResponder: responder.scrollResponderHandleStartShouldSetResponder,
            onStartShouldSetResponderCapture: responder.scrollResponderHandleStartShouldSetResponderCapture,
            onScrollShouldSetResponder: responder.scrollResponderHandleScrollShouldSetResponder,
            onResponderGrant: responder.scrollResponderHandleResponderGrant,
            onResponderTerminationRequest: responder.scrollResponderHandleTerminationRequest,
            onResponderTerminate: responder.scrollResponderHandleTerminate,
            onResponderRelease: responder.scrollResponderHandleResponderRelease,
            onResponderReject: responder.scrollResponderHandleResponderReject
        };
        for (let key of Object.keys(eventProps)) {
            if (eventProps[key] instanceof Function) {
                eventProps[key] = eventProps[key].bind(this);
            }
        }
        const onRefreshStart = this.props.onRefreshStart;
        return (React.createElement(RCTNestedScrollView, __assign({}, this.props, eventProps, {style: [styles.base, this.props.style], onScroll: this.handleScroll.bind(this), ref: (component) => this._scrollView = component, onRefreshStart: onRefreshStart ? (() => {
            onRefreshStart(this.endRefreshing);
        }) : null}), 
            React.createElement(View, __assign({}, (this.props.onContentSizeChange ? {
                onLayout: this._handleContentOnLayout.bind(this)
            } : {}), {style: [
                this.props.horizontal && styles.contentContainerHorizontal,
                this.props.contentContainerStyle
            ], removeClippedSubviews: this.props.removeClippedSubviews, collapsable: false, ref: (component) => this._innerView = component}), this.props.children)
        ));
    }
    _handleContentOnLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
    }
};
NestedScrollView.propTypes = Object.assign({}, ScrollView.propTypes, {
    showVerticalScrollIndicator: PropTypes.bool
});
NestedScrollView = __decorate([
    reactMixins([ScrollResponder.Mixin])
], NestedScrollView);
const RCTNestedScrollView = requireNativeComponent('MaoKitsNestedScrollViewAndroid', NestedScrollView, {
    nativeOnly: {}
});
const styles = StyleSheet.create({
    base: {},
    contentContainerHorizontal: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
});
export default NestedScrollView;
