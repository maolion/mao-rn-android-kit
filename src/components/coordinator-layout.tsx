import * as React from 'react';
import { PureComponent } from 'react';
import {
  UIManager,
  View,
  findNodeHandle,
  requireNativeComponent
} from 'react-native';

import AppBarLayout from './appbar-layout';
import Layout from './layout';
import { ViewGroupProperties } from './types';

export interface CoordinatorLayoutProps extends ViewGroupProperties {

}

const MaoKitsCoordinatorLayoutManager: any = UIManager.MaoKitsCoordinatorLayoutAndroid;
const COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = MaoKitsCoordinatorLayoutManager.Commands.setScrollingViewBehavior;
const COMMAND_RESET_BEHOVIOR = MaoKitsCoordinatorLayoutManager.Commands.resetBehavior;

export default class CoordinatorLayout extends PureComponent<CoordinatorLayoutProps, any> {
  componentDidMount() {
    Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
  }

  componentDidUpdate() {
    Layout.setChildrenLayoutParams(this, MaoKitsCoordinatorLayoutManager);
  }

  render() {
    return (
      <RCTCoordinatorLayout
        {...this.props}
      >
        {this.props.children}
      </RCTCoordinatorLayout>
    );
  }

  setScrollingViewBehavior(view: any) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      COMMAND_SET_SCROLLING_VIEW_BEHAVIOR,
      [findNodeHandle(view)]
    );
  }

  resetBehavior(appbar: AppBarLayout, nestedScrollEnabled = true, smoothly: boolean = false) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      COMMAND_RESET_BEHOVIOR,
      [findNodeHandle(appbar), nestedScrollEnabled, smoothly]
    );
  }

  static propTypes = Object.assign({}, ViewGroupProperties);
}

const RCTCoordinatorLayout: any = requireNativeComponent(
  'MaoKitsCoordinatorLayoutAndroid',
  CoordinatorLayout,
  {
    nativeOnly: {}
  }
);
