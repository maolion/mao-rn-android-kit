import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ViewPagerAndroid,
    TouchableHighlight,
    ToolbarAndroid,
    ListView,
    RecyclerViewBackedScrollView,
    RefreshControl
} from 'react-native';

global.React = React;

import {
    CoordinatorLayoutAndroid,
    AppBarLayoutAndroid,
    TabLayoutAndroid,
    NestedScrollViewAndroid,
    ExtraDimensionsAndroid,
    PopupWindowAndroid,
    GravityAndroid
} from 'mao-rn-android-kit';

class MyListView extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows()),
            refreshing: false
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                /> }
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={this._renderSeparator} />
        );
    }
    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 3000);
    } 
    _genRows() {
        const dataBlob = [];
        for (let i = 0; i < 10; i++) {
            console.log(i);
            dataBlob.push('[Row ' + i + `] "React Native使你能够在Javascript和React的基础上获得完全一致的开发体验，构建世界一流的原生APP。 React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere) Facebook已经在多项产品中使用了React Native，并且将持续地投入建设React Native。"`);
        }
        return dataBlob;
    }
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.listItem}>
                <Text >
                {rowData}
                </Text>
            </View>
        );
    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={styles.separator} />
        );
    }
}

class App extends Component {
    componentDidMount() {
        this.coordinatorLayout.setScrollingViewBehavior(this.viewPager);
    }

    render() {
        

        return (
            <View style={styles.container}>
                <CoordinatorLayoutAndroid
                    ref={(component) => this.coordinatorLayout = component}
                    fitsSystemWindows={false} >
                    <AppBarLayoutAndroid
                        layoutParams={{
                            height: 56
                        }}
                        style={{ backgroundColor:"#2278F6" }}  >
                        <View
                            layoutParams={{
                                height: 56,
                                scrollFlags: (
                                    AppBarLayoutAndroid.SCROLL_FLAG_SCROLL | 
                                    AppBarLayoutAndroid.SCROLL_FLAG_ENTRY_ALWAYS |
                                    AppBarLayoutAndroid.SCROLL_FLAG_SNAP
                               )
                            }}
                            style={{ flexDirection: "row", height: 50, paddingLeft: 10, paddingRight: 10, backgroundColor: "transparent", justifyContent: "center" }}
                        >
                            <View style={{ flex: 1, justifyContent: "center"}}>
                                <Text style={{ color: "#fff" }}>Hello, World</Text>
                            </View>
                        </View>
                    </AppBarLayoutAndroid>
                    <ViewPagerAndroid
                        ref={(compoent) => this.viewPager = compoent}
                        style={{ flex: 1, backgroundColor: "transparent", height:  Dimensions.get('window').height - 70 }}
                        >
                        <MyListView />
                    </ViewPagerAndroid>
                    
                </CoordinatorLayoutAndroid>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        height: 400
    },
    instructions: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5
    },
    menu: {
        backgroundColor: "rgba(0, 0, 0, .9)",  
        width: 150,
        padding: 5
    },
    menuItem: {
        height: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    menuItemText : {
        color: "#fff",
        fontSize: 16
    },
    pageWrapper:  {
        padding: 5
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    },
    listItem: {
        padding: 5,
        backgroundColor: "#fff",
    }
});

AppRegistry.registerComponent('example', () => App);

