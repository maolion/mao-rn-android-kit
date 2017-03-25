import * as React from 'react';
import { PropTypes } from 'react';
import { View, ViewProperties } from 'react-native';

export interface LayoutParams {
    width?: number | 'match_parent' | 'wrap_parent';
    height?: number | 'match_parent' | 'wrap_content';
}

export const LayoutParams = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['match_parent', 'wrap_content'])
    ]),

    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['match_parent', 'wrap_content'])
    ])
};

export interface ViewGroupProperties extends ViewProperties {
    layoutParams?: LayoutParams;
    fitsSystemWindows?: boolean;
}

export const ViewGroupProperties = Object.assign({}, View.propTypes, {
    layoutParams: PropTypes.shape(LayoutParams as any),
    fitsSystemWindows: PropTypes.bool
});

export interface AppBarLayoutParams extends LayoutParams {
    scrollFlags?: number;
}

export interface AppBarViewProperties extends ViewGroupProperties {
    layoutParams?: AppBarLayoutParams;
}

export const AppBarViewProperties = Object.assign({}, ViewGroupProperties, {
    layoutParams: PropTypes.shape(Object.assign({}, LayoutParams, {
        scrollFlags: PropTypes.number
    }) as any)
});
