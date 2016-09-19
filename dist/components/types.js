import { PropTypes } from 'react';
import { View } from 'react-native';
export const LayoutParams = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["match_parent", "wrap_content"])
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["match_parent", "wrap_content"])
    ])
};
export const ViewGroupProperties = Object.assign({}, View.propTypes, {
    layoutParams: PropTypes.shape(LayoutParams),
    fitsSystemWindows: PropTypes.bool
});
export const AppBarViewProperties = Object.assign({}, ViewGroupProperties, {
    layoutParams: PropTypes.shape(Object.assign({}, LayoutParams, {
        scrollFlags: PropTypes.number
    }))
});
