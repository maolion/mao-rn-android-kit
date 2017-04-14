package com.maornandroidkit.modules;


import android.view.Gravity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class GravityModule extends ReactContextBaseJavaModule {
  private static final String NAME = "MaoKitsGravityAndroid";

  public GravityModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return GravityModule.NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("AXIS_CLIP", Gravity.AXIS_CLIP);
    constants.put("AXIS_PULL_AFTER", Gravity.AXIS_PULL_AFTER);
    constants.put("AXIS_PULL_BEFORE", Gravity.AXIS_PULL_BEFORE);
    constants.put("AXIS_SPECIFIED", Gravity.AXIS_SPECIFIED);
    constants.put("AXIS_X_SHIFT", Gravity.AXIS_X_SHIFT);
    constants.put("AXIS_Y_SHIFT", Gravity.AXIS_Y_SHIFT);
    constants.put("BOTTOM", Gravity.BOTTOM);
    constants.put("CENTER", Gravity.CENTER);
    constants.put("CENTER_HORIZONTAL", Gravity.CENTER_HORIZONTAL);
    constants.put("CENTER_VERTICAL", Gravity.CENTER_VERTICAL);
    constants.put("CLIP_HORIZONTAL", Gravity.CLIP_HORIZONTAL);
    constants.put("CLIP_VERTICAL", Gravity.CLIP_VERTICAL);
    constants.put("DISPLAY_CLIP_HORIZONTAL", Gravity.DISPLAY_CLIP_HORIZONTAL);
    constants.put("DISPLAY_CLIP_VERTICAL", Gravity.DISPLAY_CLIP_VERTICAL);
    constants.put("END", Gravity.END);
    constants.put("FILL", Gravity.FILL);
    constants.put("FILL_HORIZONTAL", Gravity.FILL_HORIZONTAL);
    constants.put("FILL_VERTICAL", Gravity.FILL_VERTICAL);
    constants.put("HORIZONTAL_GRAVITY_MASK", Gravity.HORIZONTAL_GRAVITY_MASK);
    constants.put("VERTICAL_GRAVITY_MASK", Gravity.VERTICAL_GRAVITY_MASK);
    constants.put("RELATIVE_LAYOUT_DIRECTION", Gravity.RELATIVE_LAYOUT_DIRECTION);
    constants.put("RIGHT", Gravity.RIGHT);
    constants.put("START", Gravity.START);
    constants.put("TOP", Gravity.TOP);

    return constants;
  }
}
