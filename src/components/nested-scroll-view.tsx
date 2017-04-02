import * as React from 'react';
import { PropTypes, PureComponent } from 'react';
import {
  NativeComponent,
  ScrollView,
  ScrollViewProperties,
  StyleSheet,
  UIManager,
  View,
  ViewProperties,
  findNodeHandle,
  requireNativeComponent
} from 'react-native';

import reactMixins from 'react-mixins-decorator';
import * as ScrollResponder from 'react-native/Libraries/Components/ScrollResponder';

export interface NestedScrollViewProps extends ScrollViewProperties {
  showVerticalScrollIndicator?: boolean;
  removeClippedSubviews?: boolean;
  onContentSizeChange?: (width: number, height: number) => void;
}

declare var global: any;

@reactMixins([ScrollResponder.Mixin])
class NestedScrollView extends PureComponent<NestedScrollViewProps, any> {

  private _scrollView: NativeComponent;
  private _innerView: PureComponent<any, any>;

  constructor(props: NestedScrollViewProps, context: any) {
    super(props, context);
    let scrollResponder: typeof ScrollResponder.Mixin = this;

    this.state = scrollResponder.scrollResponderMixinGetInitialState();
    scrollResponder.scrollResponderKeyboardWillShow = scrollResponder.scrollResponderKeyboardWillShow.bind(this);
    scrollResponder.scrollResponderKeyboardDidShow = scrollResponder.scrollResponderKeyboardDidShow.bind(this);
    scrollResponder.scrollResponderKeyboardWillHide = scrollResponder.scrollResponderKeyboardWillHide.bind(this);
    scrollResponder.scrollResponderKeyboardDidHide = scrollResponder.scrollResponderKeyboardDidHide.bind(this);
  }

  setNativeProps(props: Object) {
    this._scrollView.setNativeProps(props);
  }

  getScrollResponder(): any {
    return this;
  }

  getInnerViewNode(): any {
    return findNodeHandle(this._innerView);
  }

  scrollTo(destX?: number, destY?: number) {
    this.getScrollResponder().scrollResponderScrollTo(
      destX || 0,
      destY || 0
    );
  }

  scrollWithoutAnimationTo(destX?: number, destY?: number) {
    this.getScrollResponder().scrollResponderScrollWithoutAnimationTo(
      destX || 0,
      destY || 0
    );
  }

  handleScroll(event: any) {
    if ((global as any).__DEV__) {
      if (this.props.onScroll && !this.props.scrollEventThrottle) {
        console.log(
          'You specified `onScroll` on a <NestedScrollViewAndroid> but not ' +
          '`scrollEventThrottle`. You will only receive one event. ' +
          'Using `16` you get all the events but be aware that it may ' +
          'cause frame drops, use a bigger number if you don\'t need as ' +
          'much precision.'
        );
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag' &&
      (global as any).dismissKeyboard) {
      (global as any).dismissKeyboard();
    }

    (this as any).scrollResponderHandleScroll(event);
  }

  render() {
    const responder: ScrollResponder.ScrollResponderHandles = this;

    const eventProps: any = {
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

    const onRefreshStart: any = this.props.onRefreshStart;

    return (
      <RCTNestedScrollView
        {...this.props}
        {...eventProps}
        style={[styles.base, this.props.style]}
        onScroll={this.handleScroll.bind(this)}
        ref={(component: any) => this._scrollView = component}
        onRefreshStart={
          onRefreshStart ? (() => {
            onRefreshStart((this as any).endRefreshing);
          }) : null
        }
      >
        <View
          {...(this.props.onContentSizeChange ? {
            onLayout: this._handleContentOnLayout.bind(this)
          } : {}) }
          style={[
            this.props.horizontal && styles.contentContainerHorizontal,
            this.props.contentContainerStyle
          ]}
          removeClippedSubviews={this.props.removeClippedSubviews}
          collapsable={false}
          ref={(component: any) => this._innerView = component}
        >
          {this.props.children}
        </View>
      </RCTNestedScrollView>);
  }

  private _handleContentOnLayout(event: any) {
    const { width, height } = event.nativeEvent.layout;
    if (this.props.onContentSizeChange) {
      this.props.onContentSizeChange(width, height);
    }
  }

  static propTypes = Object.assign({}, ScrollView.propTypes, {
    showVerticalScrollIndicator: PropTypes.bool
  });
}

const RCTNestedScrollView: any = requireNativeComponent(
  'MaoKitsNestedScrollViewAndroid',
  NestedScrollView,
  {
    nativeOnly: {}
  }
);

const styles = StyleSheet.create({
  base: {
    overflow: 'scroll'
  },
  contentContainerHorizontal: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});

export default NestedScrollView;
