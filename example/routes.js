import * as React from 'react';

import Home from './components/home';
import Example1 from './components/example-1';
import CoordinatorLayout from './components/coordinator-layout';
import TabLayout from './components/tab-layout';
import Popupwindow from './components/popupwindow';
import ExtraDimensions from './components/extra-dimensions';

export default {
  'example-1': route('example-1', Example1),
  'home': route('home', Home),
  'coordinator-layout': route('coordinator-layout', CoordinatorLayout),
  'tab-layout': route('tab-layout', TabLayout),
  'popupwindow': route('popupwindow', Popupwindow),
  'extra-dimensions': route('extra-dimensions', ExtraDimensions),
};

function route(id, component) {
  return {
    id,
    component
  }
}
