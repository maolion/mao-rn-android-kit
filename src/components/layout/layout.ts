import * as React from 'react';
import { UIManager, findNodeHandle } from 'react-native';
import { ViewGroupProperties } from '../types';

export default class Layout {
    static setChildrenLayoutParams(
        component: React.Component<ViewGroupProperties, any>,
        manager: any,
        defaultParams?: any
    ): void {
        if (!component || !manager) {
            return;
        }
        let childrelLayoutParams: any[] = [];
        const hasDefaultParams = !!defaultParams;

        React.Children.map(component.props.children, (child:any, index: number) => {
            if (!child.props.layoutParams && !hasDefaultParams) {
                return;
            }

            childrelLayoutParams.push(Object.assign(
                {},
                defaultParams,
                child.props.layoutParams,
                { childIndex: index }
            ));
        });
                
        if (!childrelLayoutParams.length) {
            return;
        }
        
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(component),
            manager.Commands.setChildrenLayoutParams,
            [childrelLayoutParams]
        );

    }
}