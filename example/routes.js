import * as React from 'react';
import Home from './components/home';
import CoordinatorLayout from './components/coordinator-layout';

export default {
    'home': route('home', Home),
    'coordinator-layout': route('coordinator-layout', CoordinatorLayout)
};

function route(id, component) {
    return {
        id,
        component
    }
}
