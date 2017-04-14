import * as React from 'react';
import { UIManager, findNodeHandle } from 'react-native';
import { ViewGroupProperties } from './types';

export default class Layout {
  static setChildrenLayoutParams(
    component: React.Component<ViewGroupProperties, any>,
    manager: any,
    defaultParams?: any): void {

    if (!component || !manager) {
      return;
    }

    let currentChildrelLayoutParams = (component as any).__currentChildLayoutParams;

    let nextChildrelLayoutParams: any[] = [];
    const hasDefaultParams = !!defaultParams;

    React.Children.map(component.props.children || [], (child: any, index: number) => {
      if (!child.props.layoutParams && !hasDefaultParams) {
        return;
      }

      nextChildrelLayoutParams.push(Object.assign(
        {},
        defaultParams,
        child.props.layoutParams,
        { childIndex: index }
      ));
    });

    if (!nextChildrelLayoutParams.length) {
      return;
    }

    if (layoutParamsIsEqualTo(currentChildrelLayoutParams, nextChildrelLayoutParams)) {
      return;
    }

    (component as any).__currentChildLayoutParams = nextChildrelLayoutParams;

    UIManager.dispatchViewManagerCommand(
      findNodeHandle(component),
      manager.Commands.setChildrenLayoutParams,
      [nextChildrelLayoutParams]);
  }
}

function layoutParamsIsEqualTo<T>(params1: T[], params2: T[]) {
  if (!params1 || !params2) {
    return false;
  }

  if (params1.length !== params2.length) {
    return false;
  }

  for (let i = 0, l = params1.length; i < l; i++) {
    if (!paramIsEqualTo(params1[i], params2[i])) {
      return false;
    }
  }

  return true;
}

function paramIsEqualTo(param1: any, param2: any) {
  for (let key of Object.keys(param1)) {
    if (param1[key] !== param2[key]) {
      return false;
    }
  }

  return true;
}
