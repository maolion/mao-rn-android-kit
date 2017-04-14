package com.maornandroidkit.managers;

import android.support.annotation.Nullable;
import android.support.design.widget.CollapsingToolbarLayout;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.Console;
import com.maornandroidkit.Utils;
import com.maornandroidkit.widgets.MCollapsingToolbarLayout;

import java.util.HashMap;
import java.util.Map;


public class CollapsingToolbarLayoutManager extends ViewGroupManager<MCollapsingToolbarLayout> {
  private static final String NAME = "MaoKitsCollapsingToolbarLayoutAndroid";
  public static final int COMMAND_SET_CHILDREN_LAYOUT_PARAMS = 1;

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public MCollapsingToolbarLayout createViewInstance(ThemedReactContext context) {
    MCollapsingToolbarLayout view = new MCollapsingToolbarLayout(context);
    view.setLayoutParams(new MCollapsingToolbarLayout.LayoutParams(
            MCollapsingToolbarLayout.LayoutParams.MATCH_PARENT,
            MCollapsingToolbarLayout.LayoutParams.MATCH_PARENT
    ));

    return view;
  }

  @Override
  public void receiveCommand(MCollapsingToolbarLayout view, int commandType, @Nullable ReadableArray args) {
    switch (commandType) {
      case CollapsingToolbarLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS:
        this.setChildrenLayoutParamsCommand(view, args.getArray(0));
        break;
      default:
        throw new JSApplicationIllegalArgumentException(String.format(
                "Unsupported commadn %d received by $s",
                commandType,
                this.getClass().getSimpleName()
        ));
    }
  }

  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.of(
            "setChildrenLayoutParams",
            CollapsingToolbarLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS
    );
  }

  @Override
  public Map<String, Object> getExportedViewConstants() {
    final Map<String, Object> constants = new HashMap<>();

    constants.put("COLLAPSE_MODE_OFF", MCollapsingToolbarLayout.LayoutParams.COLLAPSE_MODE_OFF);
    constants.put("COLLAPSE_MODE_PARALLAX", MCollapsingToolbarLayout.LayoutParams.COLLAPSE_MODE_PARALLAX);
    constants.put("COLLAPSE_MODE_PIN", MCollapsingToolbarLayout.LayoutParams.COLLAPSE_MODE_PIN);

    return constants;
  }

  @ReactProp(name = "contentScrimColor", customType = "Color")
  public void setContentScrimColor(MCollapsingToolbarLayout view, int color) {
    view.setContentScrimColor(color);
  }

  @ReactProp(name = "collapsedTitleGravity")
  public void setCollapsedTitleGravity(MCollapsingToolbarLayout view, int gravity) {
    view.setCollapsedTitleGravity(gravity);
  }

  @ReactProp(name = "collapsedTitleColor", customType = "Color")
  public void setCollapsedTitleColor(MCollapsingToolbarLayout view, int color) {
    view.setCollapsedTitleTextColor(color);
  }

  @ReactProp(name = "expandedTitleColor", customType = "Color")
  public void setExpandedTitleColor(MCollapsingToolbarLayout view, int color) {
    view.setExpandedTitleColor(color);
  }

  @ReactProp(name = "expandedTitleGravity")
  public void setExpandedTitleGravity(MCollapsingToolbarLayout view, int gravity) {
    view.setExpandedTitleGravity(gravity);
  }

  @ReactProp(name = "expandedTitleMargin")
  public void setExpandedTitleMargin(MCollapsingToolbarLayout view, ReadableArray args) {
    int start = Utils.dp2px(args.getInt(0));
    int top = Utils.dp2px(args.getInt(1));
    int end = Utils.dp2px(args.getInt(2));
    int bottom = Utils.dp2px(args.getInt(3));
    view.setExpandedTitleMargin(start, top, end, bottom);
  }

  @ReactProp(name = "scrimAnimationDuration")
  public void setScrimAnimationDuration(MCollapsingToolbarLayout view, int duration) {
    view.setScrimAnimationDuration(duration);
  }

  @ReactProp(name = "scrimVisibleHeightTrigger")
  public void setScrimVisibleHeightTrigger(MCollapsingToolbarLayout view, int height) {
    view.setScrimVisibleHeightTrigger(Utils.dp2px(height));
  }

  @ReactProp(name = "scrimsShown")
  public void setScrimsShown(MCollapsingToolbarLayout view, ReadableArray args) {
    boolean shown = args.getBoolean(0);
    boolean animate = args.getBoolean(1);

    view.setScrimsShown(shown, animate);
  }

  @ReactProp(name = "statusBarScrimColor", customType = "Color")
  public void setStatusBarScrimColor(MCollapsingToolbarLayout view, int color) {
    view.setStatusBarScrimColor(color);
  }

  @ReactProp(name = "title")
  public void setTitle(MCollapsingToolbarLayout view, String title) {
    view.setTitle(title);
  }

  @ReactProp(name = "titleEnable")
  public void setTitleEnable(MCollapsingToolbarLayout view, boolean enable) {
    view.setTitleEnabled(enable);
  }

  public boolean needsCustomLayoutForChildren() {
    return true;
  }

  private void setChildrenLayoutParamsCommand(MCollapsingToolbarLayout view, @Nullable ReadableArray params) {
    for (int i = 0, size = params.size(); i < size; i++) {
      ReadableMap paramMap = params.getMap(i);
      View childView = view.getChildAt(paramMap.getInt("childIndex"));

      MCollapsingToolbarLayout.LayoutParams layoutParams = (MCollapsingToolbarLayout.LayoutParams) childView.getLayoutParams();

      int width = paramMap.hasKey("width") ?
              Utils.dp2px(paramMap.getDouble("width")) : layoutParams.width;

      int height = paramMap.hasKey("height") ?
              Utils.dp2px(paramMap.getInt("height")) : layoutParams.height;

      layoutParams = new MCollapsingToolbarLayout.LayoutParams(width, height);

      if (paramMap.hasKey("collapseMode")) {
        int collapseMode = paramMap.getInt("collapseMode");
        layoutParams.setCollapseMode(collapseMode);
      }

      if (paramMap.hasKey("collapseParallaxMultiplier")) {
        int collapseParallaxMultiplier = paramMap.getInt("collapseParallaxMultiplier");
        layoutParams.setParallaxMultiplier(collapseParallaxMultiplier);
      }

      childView.setLayoutParams(layoutParams);
    }
  }
}