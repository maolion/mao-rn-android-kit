package com.maornandroidkit.kits.widgets;

import android.support.annotation.Nullable;
import android.support.design.widget.AppBarLayout;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.HashMap;
import java.util.Map;

public class AppBarLayoutManager extends ViewGroupManager<AppBarLayout> {
    public static final String NAME = "MaoKitsAppBarLayoutAndroid";
    public static final int COMMAND_SET_CHILDREN_LAYOUT_PARAMS = 1;

    private AppBarLayout view;

    @Override
    public String getName() {
        return AppBarLayoutManager.NAME;
    }

    @Override
    public AppBarLayout createViewInstance(ThemedReactContext context) {
        this.view = new AppBarLayout(context);
        this.view.setLayoutParams(new AppBarLayout.LayoutParams(
                AppBarLayout.LayoutParams.MATCH_PARENT,
                AppBarLayout.LayoutParams.WRAP_CONTENT
        ));

        return this.view;
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
                this.setChildrenLayoutParamsCommand(args.getArray(0));
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
        this.view.setFitsSystemWindows(fitsSystemWindows);
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    private void setChildrenLayoutParamsCommand(@Nullable ReadableArray params) {
        for (int i = 0, size = params.size(); i < size; i++) {
            ReadableMap paramMap = params.getMap(i);
            View view = this.view.getChildAt(paramMap.getInt("childIndex"));

            AppBarLayout.LayoutParams layoutParams = (AppBarLayout.LayoutParams) view.getLayoutParams();

            int width = layoutParams.width;
            int height = layoutParams.height;

            if (paramMap.hasKey("width")) {
                try {
                    String widthStr = paramMap.getString("width");
                    if ("match_parent".equals(widthStr)) {
                        width = AppBarLayout.LayoutParams.MATCH_PARENT;
                    } else if ("wrap_parent".equals(widthStr)) {
                        width = AppBarLayout.LayoutParams.WRAP_CONTENT;
                    }
                } catch (Exception e) {
                    width = paramMap.getInt("width");
                }
            }

            if (paramMap.hasKey("height")) {
                try {
                    String heightStr = paramMap.getString("height");
                    if ("match_parent".equals(heightStr)) {
                        height = AppBarLayout.LayoutParams.MATCH_PARENT;
                    } else if ("wrap_parent".equals(heightStr)) {
                        height = AppBarLayout.LayoutParams.WRAP_CONTENT;
                    }
                } catch (Exception e) {
                    height = paramMap.getInt("height");
                }
            }

            layoutParams = new AppBarLayout.LayoutParams(width, height);

            if (paramMap.hasKey("scrollFlags")) {
                layoutParams.setScrollFlags(paramMap.getInt("scrollFlags"));
            }

            view.setLayoutParams(layoutParams);
        }
    }
}

