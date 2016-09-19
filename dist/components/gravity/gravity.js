import { NativeModules } from 'react-native';
const Gravity = NativeModules['MaoKitsGravityAndroid'];
export default {
    get AXIS_CLIP() {
        return Gravity.AXIS_CLIP;
    },
    get AXIS_PULL_AFTER() {
        return Gravity.AXIS_PULL_AFTER;
    },
    get AXIS_PULL_BEFORE() {
        return Gravity.AXIS_PULL_BEFORE;
    },
    get AXIS_SPECIFIED() {
        return Gravity.AXIS_SPECIFIED;
    },
    get AXIS_X_SHIFT() {
        return Gravity.AXIS_X_SHIFT;
    },
    get AXIS_Y_SHIFT() {
        return Gravity.AXIS_Y_SHIFT;
    },
    get BOTTOM() {
        return Gravity.BOTTOM;
    },
    get CENTER() {
        return Gravity.CENTER;
    },
    get CENTER_HORIZONTAL() {
        return Gravity.CENTER_HORIZONTAL;
    },
    get CENTER_VERTICAL() {
        return Gravity.CENTER_VERTICAL;
    },
    get CLIP_HORIZONTAL() {
        return Gravity.CLIP_HORIZONTAL;
    },
    get CLIP_VERTICAL() {
        return Gravity.CLIP_VERTICAL;
    },
    get DISPLAY_CLIP_HORIZONTAL() {
        return Gravity.DISPLAY_CLIP_HORIZONTAL;
    },
    get DISPLAY_CLIP_VERTICAL() {
        return Gravity.DISPLAY_CLIP_VERTICAL;
    },
    get END() {
        return Gravity.END;
    },
    get FILL() {
        return Gravity.FILL;
    },
    get FILL_HORIZONTAL() {
        return Gravity.FILL_HORIZONTAL;
    },
    get FILL_VERTICAL() {
        return Gravity.FILL_VERTICAL;
    },
    get HORIZONTAL_GRAVITY_MASK() {
        return Gravity.HORIZONTAL_GRAVITY_MASK;
    },
    get LEFT() {
        return Gravity.LEFT;
    },
    get NO_GRAVITY() {
        return Gravity.NO_GRAVITY;
    },
    get RELATIVE_HORIZONTAL_GRAVITY_MASK() {
        return Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK;
    },
    get RELATIVE_LAYOUT_DIRECTION() {
        return Gravity.RELATIVE_LAYOUT_DIRECTION;
    },
    get RIGHT() {
        return Gravity.RIGHT;
    },
    get START() {
        return Gravity.START;
    },
    get TOP() {
        return Gravity.TOP;
    },
    get VERTICAL_GRAVITY_MASK() {
        return Gravity.VERTICAL_GRAVITY_MASK;
    }
};
