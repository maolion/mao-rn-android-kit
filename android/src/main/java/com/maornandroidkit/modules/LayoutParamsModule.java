package com.maornandroidkit.modules;

import android.view.ViewGroup;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class LayoutParamsModule extends ReactContextBaseJavaModule {
  private static final String NAME = "MaoKitsLayoutParamsAndroid";

  public LayoutParamsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return LayoutParamsModule.NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();

    constants.put("MATCH_PARENT", ViewGroup.LayoutParams.MATCH_PARENT);
    constants.put("WRAP_CONTENT", ViewGroup.LayoutParams.WRAP_CONTENT);

    return constants;
  }
}
