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
    ToolbarAndroid
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

class App extends Component<any, any> {
    componentDidMount() {
        this.coordinatorLayout.setScrollingViewBehavior(this.viewPager);
        this.tabLayout.setViewPager(this.viewPager, [
            { text : "tab1" },
            { text: "tab2" },
            { text: "tab3" },
            { text: "tab4" },
            { text: "tab5" },
            { text: "tab6" },
            { text: "tab7" },
            { text: "tab8" },
            { text: "tab9" },
            { text: "tab10" },
            { text : "tab11" },
            { text: "tab12" },
            { text: "tab13" },
            { text: "tab14" },
            { text: "tab15" },
            { text: "tab16" },
            { text: "tab17" },
            { text: "tab18" },
            { text: "tab19" },
            { text: "tab20" },
        ]);
    }

    render() {
        

        return (
            <View style={styles.container}>
                <CoordinatorLayoutAndroid
                    ref={(component) => this.coordinatorLayout = component}
                    fitsSystemWindows={false} >
                    <AppBarLayoutAndroid
                        layoutParams={{
                            height: 94
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
                            <View style={{ marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                                <TouchableHighlight 
                                    underlayColor="rgba(0, 0, 0, .1)" 
                                    style={{ padding: 15 }} 
                                    onPress={() => this.popupWindow1.showAsLocation(GravityAndroid.BOTTOM, 0, 0)} >
                                    <Text style={{ color: "#fff" }}>A</Text>
                                </TouchableHighlight>
                                
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                                <TouchableHighlight 
                                    ref="dropdown_toggle"
                                    underlayColor="rgba(0, 0, 0, .1)" 
                                    style={{ padding: 15 }} 
                                    onPress={() => this.popupWindow2.showAsDropdown(this.refs['dropdown_toggle'], 0, 56)} >
                                    <Text style={{ color: "#fff" }}>B</Text>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <TabLayoutAndroid 
                            ref={(component) => this.tabLayout = component}
                            tabMode="scrollable"
                            tabSelectedTextColor="#fff"
                            tabIndicatorColor="#fff"
                            tabTextColor="rgba(255, 255, 255, .6)"
                            tabIndicatorHeight={1}
                            tabTextSize={16}
                            tabSidePadding={10}
                            tabHeight={38} />
                    </AppBarLayoutAndroid>
                    <ViewPagerAndroid
                        ref={(compoent) => this.viewPager = compoent}
                        style={{ flex: 1, backgroundColor: "transparent", height:  Dimensions.get('window').height - 70 }}
                        >
                        {this.getPages()}
                    </ViewPagerAndroid>
                    
                </CoordinatorLayoutAndroid>
                
                <PopupWindowAndroid 
                    ref={component => this.popupWindow1 = component}>
                    <View 
                        style={{ backgroundColor: "rgba(0, 0, 0, .9)", alignItems: "center", justifyContent: "center", width: ExtraDimensionsAndroid.getAppClientWidth(), height: 200 }}>
                        <TouchableHighlight
                            underlayColor="#bbb"
                            style={{ height: 50, width: 100, alignItems: "center", backgroundColor: "#e4e4e4", justifyContent: "center" }}
                            onPress={() => { this.popupWindow1.hide(); }} >
                            <Text style={{ color: "#000" }}>Touch me</Text>
                        </TouchableHighlight>
                    </View>
                </PopupWindowAndroid>
                <PopupWindowAndroid 
                    ref={component => this.popupWindow2 = component}>
                        <View style={styles.menu}>
                            <TouchableHighlight
                                style={styles.menuItem}
                                underlayColor="rgba(255, 255, 255, .1)"
                                onPress={() => this.popupWindow2.hide()}
                                >
                                <Text style={styles.menuItemText}>menu item1</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.menuItem}
                                underlayColor="rgba(0, 0, 0, .1)"
                                underlayColor="rgba(255, 255, 255, .1)"
                                onPress={() => this.popupWindow2.hide()}
                                >
                                <Text style={styles.menuItemText}>menu item2</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.menuItem}
                                underlayColor="rgba(0, 0, 0, .1)"
                                underlayColor="rgba(255, 255, 255, .1)"
                                onPress={() => this.popupWindow2.hide()}
                                >
                                <Text style={styles.menuItemText}>menu item3</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.menuItem}
                                underlayColor="rgba(0, 0, 0, .1)"
                                underlayColor="rgba(255, 255, 255, .1)"
                                onPress={() => this.popupWindow2.hide()}
                                >
                                <Text style={styles.menuItemText}>menu item4</Text>
                            </TouchableHighlight>
                        </View>
                </PopupWindowAndroid>

            </View>
        );
    }

    getPages() {
        const pages = [];
        for (let i = 0; i < 20; i++) {
            pages.push(<View key={i}>
                <NestedScrollViewAndroid 
                    style={{
                        height: Dimensions.get('window').height - 70
                    }}>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                </NestedScrollViewAndroid>
            </View>);
        }
        return pages;
    }

    getText() {
        return 'React Native使你能够在Javascript和React的基础上获得完全一致的开发体验，构建世界一流的原生APP。 React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere) Facebook已经在多项产品中使用了React Native，并且将持续地投入建设React Native。';
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
    }
});

console.log(
    'screen width:', 
    ExtraDimensionsAndroid.getScreenWidth()
);

console.log(
    'screen height:', 
    ExtraDimensionsAndroid.getScreenHeight()
);

console.log(
    'status bar height:', 
    ExtraDimensionsAndroid.getStatusBarHeight()
);

console.log(
    'soft menu bar height:', 
    ExtraDimensionsAndroid.getSoftMenuBarHeight()
);

console.log(
    'smart bar height:', 
    ExtraDimensionsAndroid.getSmartBarHeight()
);

console.log(
    'app client height:', 
    ExtraDimensionsAndroid.getAppClientHeight()
);

console.log(
    'app client width:', 
    ExtraDimensionsAndroid.getAppClientWidth()
);

// if (__DEV__) {
//   require('react-native/Libraries/Devtools/setupDevtools')();
// }

AppRegistry.registerComponent('example', () => App);

