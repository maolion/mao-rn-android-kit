import { NativeModules } from 'react-native';

const ExtraDimensions: any =  NativeModules.MaoKitsExtraDimensionsAndroid;

/**
 * 获取设备实际屏幕高度
 */
export function getScreenHeight() {
    return ExtraDimensions.SCREEN_HEIGHT;
}

/**
 * 获取设备实际屏幕宽度
 */
export function getScreenWidth() {
    return ExtraDimensions.SCREEN_WIDTH;
}

/**
 * 获取魅族SmartBar高度
 */
export function getSmartBarHeight() {
    return ExtraDimensions.SMART_BAR_HEIGHT;
}

/**
 * 获取软键盘导航按钮高度
 */
export function getSoftMenuBarHeight() {
    return ExtraDimensions.SOFT_MENU_BAR_HEIGHT;
}

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight() {
    return ExtraDimensions.STATUS_BAR_HEIGHT;
}

/**
 * 获取APP可视容器宽度
 */
export function getAppClientWidth() {
    return getScreenWidth();
}

/**
 * 获取APP可视容器高度
 */
export function getAppClientHeight() {
    return (
        getScreenHeight() -
        getSmartBarHeight() -
        getStatusBarHeight() -
        getSoftMenuBarHeight()
    );
}

export default {
    getScreenHeight,
    getScreenWidth,
    getSmartBarHeight,
    getSoftMenuBarHeight,
    getStatusBarHeight,
    getAppClientWidth,
    getAppClientHeight
};
