import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    BackAndroid,
    TouchableHighlight,
    Text
} from 'react-native';

import routes from './routes';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this._navigator = null;

        this._setNavigator = component => {
            this._navigator = component;
        }

        BackAndroid.addEventListener('hardwareBackPress', () => {
            let navigator = this._navigator;

            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }

            return false;
        });
    }

    render() {
        return (
            <Navigator
                ref={this._setNavigator}
                initialRoute={routes['home']}
                renderScene={this._renderScene} />
        );
    }

    _renderScene(route, navigator) {
        let target = routes[route.id];
        return (<target.component navigator={navigator} />)
    }
}



AppRegistry.registerComponent('example', () => App);
