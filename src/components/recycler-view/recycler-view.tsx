import { Component, PropTypes } from 'react';
import { 
    requireNativeComponent, 
    StyleSheet, 
    findNodeHandle, 
    ScrollViewProperties, 
    View, 
    UIManager, 
    NativeComponent, 
    ViewProperties, 
    ScrollView 
} from 'react-native';

import * as ScrollResponder from 'react-native/Libraries/Components/ScrollResponder';

import reactMixins from 'react-mixins-decorator';

export interface RecyclerViewProps extends ScrollViewProperties {
    showVerticalScrollIndicator?: boolean;
    removeClippedSubviews?: boolean;
    onContentSizeChange?: (width: number, height: number) => void;
}

@reactMixins([ScrollResponder.Mixin])
class RecyclerView 
    extends Component<RecyclerViewProps, any>
{
    
    static propTypes = Object.assign({}, ScrollView.propTypes, {
        showVerticalScrollIndicator: PropTypes.bool
    })

    private _scrollView: NativeComponent;
    private _innerView: Component<any, any>;

    constructor(props: RecyclerViewProps, context: any) {
        super(props, context);
        this.state = (this as typeof ScrollResponder.Mixin).scrollResponderMixinGetInitialState();
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
                'You specified `onScroll` on a <RecyclerViewAndroid> but not ' +
                '`scrollEventThrottle`. You will only receive one event. ' +
                'Using `16` you get all the events but be aware that it may ' +
                'cause frame drops, use a bigger number if you don\'t need as ' +
                'much precision.'
                );
            }
        }

        if (this.props.keyboardDismissMode === 'on-drag') {
            (global as any).dismissKeyboard && (global as any).dismissKeyboard(); 
        }

        (this as any).scrollResponderHandleScroll(event);
    }

    render() {
        const responder: ScrollResponder.ScrollResponderHandles = this;;

        const eventProps:any = {
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
            <RCTRecyclerView
                {...this.props}
                {...eventProps}
                style={[styles.base, this.props.style]}
                onScroll={this.handleScroll.bind(this)}
                ref={(component: any) => this._scrollView = component}
                onRefreshStart={
                    onRefreshStart ? (() => {
                        onRefreshStart((this as any).endRefreshing)
                    }) : null
                }
            >
                <View
                    {...(this.props.onContentSizeChange ? {
                        onLayout: this._handleContentOnLayout.bind(this)
                    } : {})}
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
            </RCTRecyclerView>);
    }
    
    private _handleContentOnLayout(event: any) {
        const {width, height} = event.nativeEvent.layout;
        this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
    }
}

const RCTRecyclerView:any = requireNativeComponent(
    'MaoKitsRecyclerViewAndroid',
    RecyclerView,
    {
        nativeOnly: {}
    }
);

const styles = StyleSheet.create({
    base: {
        // flex: 1
    },
    contentContainerHorizontal: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
});

export default RecyclerView;