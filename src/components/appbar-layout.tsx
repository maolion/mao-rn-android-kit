import * as React from 'react';
import { PureComponent } from 'react';
import {
  UIManager,
  View,
  findNodeHandle,
  requireNativeComponent
} from 'react-native';

import Layout from './layout';
import {
  AppBarViewProperties,
  ViewGroupProperties
} from './types';

const MaoKitsAppBarLayoutAndroidManager = UIManager.MaoKitsAppBarLayoutAndroid;
const Constants: Dictionary<number> = MaoKitsAppBarLayoutAndroidManager.Constants;

const DEFAULT_PROPS: any = {
    scrollFlags: 0
};

export interface AppBarLayoutProps extends AppBarViewProperties {
}

export default class AppBarLayout extends PureComponent<AppBarLayoutProps, any> {

  componentDidMount() {
      Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
  }

  componentDidUpdate() {
      Layout.setChildrenLayoutParams(this, MaoKitsAppBarLayoutAndroidManager, DEFAULT_PROPS);
  }

  render() {
    return (
      <RCTAppBarLayout
          {...this.props}
      >
      {this.props.children}
      </RCTAppBarLayout>
    );
  }

  static SCROLL_FLAG_ENTRY_ALWAYS = Constants.SCROLL_FLAG_ENTRY_ALWAYS;
  static SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED = Constants.SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED;
  static SCROLL_FLAG_EXIT_UNTIL_COLLAPSED = Constants.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED;
  static SCROLL_FLAG_SCROLL = Constants.SCROLL_FLAG_SCROLL;
  static SCROLL_FLAG_SNAP = Constants.SCROLL_FLAG_SNAP;
  static propTypes = Object.assign({}, AppBarViewProperties);
}

const RCTAppBarLayout: any = requireNativeComponent(
  'MaoKitsAppBarLayoutAndroid',
  AppBarLayout,
  {
      nativeOnly: {}
  }
);
