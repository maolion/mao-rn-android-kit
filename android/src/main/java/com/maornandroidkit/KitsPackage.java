package com.maornandroidkit;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.maornandroidkit.managers.AppBarLayoutManager;
import com.maornandroidkit.managers.CollapsingToolbarLayoutManager;
import com.maornandroidkit.managers.CoordinatorLayoutManager;
import com.maornandroidkit.managers.NestedScrollViewManager;
import com.maornandroidkit.managers.PopupWindowManager;
import com.maornandroidkit.managers.TabLayoutManager;
import com.maornandroidkit.modules.ExtraDimensionsModule;
import com.maornandroidkit.modules.GravityModule;
import com.maornandroidkit.modules.LayoutParamsModule;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class KitsPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(
            new ExtraDimensionsModule(reactContext),
            new GravityModule(reactContext),
            new LayoutParamsModule(reactContext)
    );
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
            new NestedScrollViewManager(),
            new PopupWindowManager(),
            new CollapsingToolbarLayoutManager()
    );
  }
}
