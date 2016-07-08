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
}