import * as React from 'react';
import { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    myButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'visible'
    },
    text: {
    }
});

export default class MyButton extends Component {
    render() {
        let btnContent = null;

        if (this.props.children) {
            btnContent = this.props.children;
        } else {
            btnContent = (
                <Text
                    style={[{ color: this.props.color || '#000' }, styles.text]} >
                    {this.props.text}
                </Text>
            );
        }

        return (
            <TouchableHighlight
                {...this.props}
                style={[styles.myButton, this.props.style]}
                underlayColor={this.props.underlayColor || 'rgba(0, 0, 0, .2)'}>
                {btnContent}
            </TouchableHighlight>
        )
    }
}
