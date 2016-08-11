package com.maornandroidkit.kits;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.maornandroidkit.kits.managers.AppBarLayoutManager;
import com.maornandroidkit.kits.managers.CoordinatorLayoutManager;
import com.maornandroidkit.kits.managers.NestedScrollViewManager;
import com.maornandroidkit.kits.managers.TabLayoutManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class KitsPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new CoordinatorLayoutManager(),
                new AppBarLayoutManager(),
                new TabLayoutManager(),
                new NestedScrollViewManager()
        );
    }
}
