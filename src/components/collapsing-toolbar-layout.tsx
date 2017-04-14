import * as React from 'react';

import {
  PropTypes,
  PureComponent
} from 'react';

import {
  UIManager,
  View,
  findNodeHandle,
  requireNativeComponent
} from 'react-native';

import Layout from './layout';
import {
  LayoutParams,
  ViewGroupProperties
} from './types';

const MaoKitsCollapsingToolbarLayoutManager: any = UIManager.MaoKitsCollapsingToolbarLayoutAndroid;
const Constants: Dictionary<number> = MaoKitsCollapsingToolbarLayoutManager.Constants;

export interface CollapsingToolbarLayoutLayoutParams extends LayoutParams {
  collapseMode?: CollapsingToolbarLayout.CollapseMode;
  collapseParallaxMultiplier?: number;
}

export interface CollapsingToolbarLayoutProps extends ViewGroupProperties {
  contentScrimColor?: string;
  collapsedTitleGravity?: number;
  tcollapsedTitleColor?: string;
  expandedTitleColor?: string;
  expandedTitleGravity?: number;
  expandedTitleMargin?: number[];
  expandedTitleMarginStart?: number;
  expandedTitleMarginTop?: number;
  expandedTitleMarginEnd?: number;
  expandedTitleMarginBottom?: number;
  scrimAnimationDuration?: number;
  scrimVisibleHeightTrigger?: number;
  scrimsShown?: boolean;
  scrimsShownAnimate?: boolean;
  statusBarScrimColor?: string;
  title?: string;
  titleEnable?: boolean;
}

export class CollapsingToolbarLayout extends PureComponent<CollapsingToolbarLayoutProps, any> {
  componentDidMount() {
    Layout.setChildrenLayoutParams(this, MaoKitsCollapsingToolbarLayoutManager);
  }

  componentDidUpdate() {
    Layout.setChildrenLayoutParams(this, MaoKitsCollapsingToolbarLayoutManager);
  }

  render() {
    let props = Object.assign({}, this.props);
    props.expandedTitleMargin = props.expandedTitleMargin || [];

    props.expandedTitleMargin[0] = props.expandedTitleMarginStart || props.expandedTitleMargin[0] || 0;
    props.expandedTitleMargin[1] = props.expandedTitleMarginTop || props.expandedTitleMargin[1] || 0;
    props.expandedTitleMargin[2] = props.expandedTitleMarginEnd || props.expandedTitleMargin[2] || 0;
    props.expandedTitleMargin[3] = props.expandedTitleMarginBottom || props.expandedTitleMargin[3] || 0;

    delete props.expandedTitleMarginStart;
    delete props.expandedTitleMarginTop;
    delete props.expandedTitleMarginEnd;
    delete props.expandedTitleMarginBottom;

    props.scrimsShown = [
      !!props.scrimsShown,
      !!props.scrimsShownAnimate
    ] as any;

    delete props.scrimsShownAnimate;

    return (
      <RCTCollapsingToolbarLayout
        {...props}
      >
        {this.props.children}
      </RCTCollapsingToolbarLayout>
    );
  }

  static propTypes = Object.assign({
    contentScrimColor: PropTypes.string,
    collapsedTitleGravity: PropTypes.number,
    collapsedTitleColor: PropTypes.string,
    expandedTitleColor: PropTypes.string,
    expandedTitleGravity: PropTypes.number,
    expandedTitleMargin: PropTypes.arrayOf(PropTypes.number),
    expandedTitleMarginStart: PropTypes.number,
    expandedTitleMarginTop: PropTypes.number,
    expandedTitleMarginEnd: PropTypes.number,
    expandedTitleMarginBottom: PropTypes.number,
    scrimAnimationDuration: PropTypes.number,
    scrimVisibleHeightTrigger: PropTypes.number,
    scrimsShown: PropTypes.arrayOf(PropTypes.bool),
    scrimsShownAnimate: PropTypes.bool,
    statusBarScrimColor: PropTypes.string,
    title: PropTypes.string,
    titleEnable: PropTypes.bool
  }, ViewGroupProperties);
}

const RCTCollapsingToolbarLayout: any = requireNativeComponent(
  'MaoKitsCollapsingToolbarLayoutAndroid',
  CollapsingToolbarLayout,
  {
    nativeOnly: {}
  }
);

export namespace CollapsingToolbarLayout {

  export enum CollapseMode {
    COLLAPSE_MODE_OFF = Constants.COLLAPSE_MODE_OFF,
    COLLAPSE_MODE_PARALLAX = Constants.COLLAPSE_MODE_PARALLAX,
    COLLAPSE_MODE_PIN = Constants.COLLAPSE_MODE_PIN
  }
}

export default CollapsingToolbarLayout;
