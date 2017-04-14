package com.maornandroidkit.managers;

import android.support.annotation.Nullable;
import android.support.design.widget.AppBarLayout;
import android.text.Layout;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.yoga.YogaValue;
import com.maornandroidkit.Console;
import com.maornandroidkit.Utils;

import java.util.HashMap;
import java.util.Map;

public class AppBarLayoutManager extends ViewGroupManager<AppBarLayout> {
  public static final String NAME = "MaoKitsAppBarLayoutAndroid";
  public static final int COMMAND_SET_CHILDREN_LAYOUT_PARAMS = 1;

  private LayoutShadowNode layoutShadowNode;

  @Override
  public String getName() {
    return AppBarLayoutManager.NAME;
  }

  @Override
  public LayoutShadowNode createShadowNodeInstance() {
    layoutShadowNode = super.createShadowNodeInstance();
    return layoutShadowNode;
  }

  @Override
  public AppBarLayout createViewInstance(ThemedReactContext context) {
    AppBarLayout view = new AppBarLayout(context);

    view.setLayoutParams(new AppBarLayout.LayoutParams(
            AppBarLayout.LayoutParams.MATCH_PARENT,
            AppBarLayout.LayoutParams.WRAP_CONTENT
    ));

    return view;
  }

  @Override
  public void onAfterUpdateTransaction(AppBarLayout view) {
    int height = (int)layoutShadowNode.getStyleHeight().value;
    int width = (int)layoutShadowNode.getStyleWidth().value;
    ViewGroup.LayoutParams lp = view.getLayoutParams();

    lp.width = width != 0 ? width : lp.width;
    lp.height = height != 0 ? height : lp.height;
    Console.log(lp.width + ", " + lp.height);
    view.setLayoutParams(lp);
  }

  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.of(
            "setChildrenLayoutParams",
            AppBarLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS
    );
  }

  @Override
  public void receiveCommand(AppBarLayout view, int commandType, @Nullable ReadableArray args) {
    switch (commandType) {
      case AppBarLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS:
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
  public Map<String, Object> getExportedViewConstants() {
    final Map<String, Object> constants = new HashMap<>();

    constants.put("SCROLL_FLAG_ENTRY_ALWAYS", AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS);
    constants.put("SCROLL_FLAG_ENTRY_ALWAYS_COLLAPSED", AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED);
    constants.put("SCROLL_FLAG_EXIT_UNTIL_COLLAPSED", AppBarLayout.LayoutParams.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED);
    constants.put("SCROLL_FLAG_SCROLL", AppBarLayout.LayoutParams.SCROLL_FLAG_SCROLL);
    constants.put("SCROLL_FLAG_SNAP", AppBarLayout.LayoutParams.SCROLL_FLAG_SNAP);
    return constants;
  }

  @ReactProp(name = "fitsSystemWindows")
  public void setFitsSystemWindows(AppBarLayout view, boolean fitsSystemWindows) {
    view.setFitsSystemWindows(fitsSystemWindows);
  }

  public boolean needsCustomLayoutForChildren() {
    return true;
  }

  private void setChildrenLayoutParamsCommand(AppBarLayout view, @Nullable ReadableArray params) {
    for (int i = 0, size = params.size(); i < size; i++) {
      ReadableMap paramMap = params.getMap(i);
      View childView = view.getChildAt(paramMap.getInt("childIndex"));

      AppBarLayout.LayoutParams layoutParams = (AppBarLayout.LayoutParams) childView.getLayoutParams();

      int width = paramMap.hasKey("width") ?
              Utils.dp2px(paramMap.getDouble("width")) : layoutParams.width;

      int height = paramMap.hasKey("height") ?
              Utils.dp2px(paramMap.getInt("height")) : layoutParams.height;

      layoutParams = new AppBarLayout.LayoutParams(width, height);

      if (paramMap.hasKey("scrollFlags")) {
        layoutParams.setScrollFlags(paramMap.getInt("scrollFlags"));
      }

      childView.setLayoutParams(layoutParams);
    }
  }
}

