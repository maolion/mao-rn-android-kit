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

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleHardwareBackPress);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleHardwareBackPress);
    }

    render() {
        return (
            <Navigator
                ref={this._setNavigator}
                initialRoute={routes['home']}
                renderScene={this._renderScene} />
        );
    }

    _navigator = null;

    _handleHardwareBackPress = () => {
        let navigator = this._navigator;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        return false;
    };

    _setNavigator = component => {
        this._navigator = component;
    };

    _renderScene(route, navigator) {
        let target = routes[route.id];
        return (<target.component navigator={navigator} />)
    }
}

AppRegistry.registerComponent('example', () => App);
