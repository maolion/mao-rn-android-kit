import { NativeModules } from 'react-native';

const Gravity: any =  NativeModules.MaoKitsGravityAndroid;

export default {
    get AXIS_CLIP(): number {
        return Gravity.AXIS_CLIP;
    },

    get AXIS_PULL_AFTER(): number {
        return Gravity.AXIS_PULL_AFTER;
    },

    get AXIS_PULL_BEFORE(): number {
        return Gravity.AXIS_PULL_BEFORE;
    },

    get AXIS_SPECIFIED(): number {
        return Gravity.AXIS_SPECIFIED;
    },

    get AXIS_X_SHIFT(): number {
        return Gravity.AXIS_X_SHIFT;
    },

    get AXIS_Y_SHIFT(): number {
        return Gravity.AXIS_Y_SHIFT;
    },

    get BOTTOM(): number {
        return Gravity.BOTTOM;
    },

    get CENTER(): number {
        return Gravity.CENTER;
    },

    get CENTER_HORIZONTAL(): number {
        return Gravity.CENTER_HORIZONTAL;
    },

    get CENTER_VERTICAL(): number {
        return Gravity.CENTER_VERTICAL;
    },

    get CLIP_HORIZONTAL(): number {
        return Gravity.CLIP_HORIZONTAL;
    },

    get CLIP_VERTICAL(): number {
        return Gravity.CLIP_VERTICAL;
    },

    get DISPLAY_CLIP_HORIZONTAL(): number {
        return Gravity.DISPLAY_CLIP_HORIZONTAL;
    },

    get DISPLAY_CLIP_VERTICAL(): number {
        return Gravity.DISPLAY_CLIP_VERTICAL;
    },

    get END(): number {
        return Gravity.END;
    },

    get FILL(): number {
        return Gravity.FILL;
    },

    get FILL_HORIZONTAL(): number {
        return Gravity.FILL_HORIZONTAL;
    },

    get FILL_VERTICAL(): number {
        return Gravity.FILL_VERTICAL;
    },

    get HORIZONTAL_GRAVITY_MASK(): number {
        return Gravity.HORIZONTAL_GRAVITY_MASK;
    },

    get LEFT(): number {
        return Gravity.LEFT;
    },

    get NO_GRAVITY(): number {
        return Gravity.NO_GRAVITY;
    },

    get RELATIVE_HORIZONTAL_GRAVITY_MASK(): number {
        return Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK;
    },

    get RELATIVE_LAYOUT_DIRECTION(): number {
        return Gravity.RELATIVE_LAYOUT_DIRECTION;
    },

    get RIGHT(): number {
        return Gravity.RIGHT;
    },

    get START(): number {
        return Gravity.START;
    },

    get TOP(): number {
        return Gravity.TOP;
    },

    get VERTICAL_GRAVITY_MASK(): number {
        return Gravity.VERTICAL_GRAVITY_MASK;
    }
};
