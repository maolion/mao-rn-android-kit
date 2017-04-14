import { NativeModules } from 'react-native';

const LayoutParams: any = NativeModules.MaoKitsLayoutParamsAndroid;

export default {
  get MATCH_PARENT() {
    return LayoutParams.MATCH_PARENT;
  },

  get WRAP_CONTENT() {
    return LayoutParams.WRAP_CONTENT;
  }
};
