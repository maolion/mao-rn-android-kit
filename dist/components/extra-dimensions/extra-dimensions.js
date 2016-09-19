import { NativeModules } from 'react-native';
const ExtraDimensions = NativeModules['MaoKitsExtraDimensionsAndroid'];
export function getScreenHeight() {
    return ExtraDimensions['SCREEN_HEIGHT'];
}
export function getScreenWidth() {
    return ExtraDimensions['SCREEN_WIDTH'];
}
export function getSmartBarHeight() {
    return ExtraDimensions['SMART_BAR_HEIGHT'];
}
export function getSoftMenuBarHeight() {
    return ExtraDimensions['SOFT_MENU_BAR_HEIGHT'];
}
export function getStatusBarHeight() {
    return ExtraDimensions['STATUS_BAR_HEIGHT'];
}
export function getAppClientWidth() {
    return getScreenWidth();
}
export function getAppClientHeight() {
    return (getScreenHeight() -
        getSmartBarHeight() -
        getSoftMenuBarHeight());
}
