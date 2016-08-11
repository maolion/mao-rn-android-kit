package com.maornandroidkit.kits.managers;

import android.support.annotation.Nullable;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.kits.Utils;

import java.util.Map;

public class CoordinatorLayoutManager extends ViewGroupManager<CoordinatorLayout> {

    public static final String NAME = "MaoKitsCoordinatorLayoutAndroid";
    public static final int COMMAND_SET_CHILDREN_LAYOUT_PARAMS = 1;
    public static final int COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = 2;

    private CoordinatorLayout view;

    @Override
    public String getName() {
        return CoordinatorLayoutManager.NAME;
    }

    @Override
    public CoordinatorLayout createViewInstance(ThemedReactContext context) {
        this.view = new CoordinatorLayout(context);
        this.view.setLayoutParams(new CoordinatorLayout.LayoutParams(
                CoordinatorLayout.LayoutParams.MATCH_PARENT,
                CoordinatorLayout.LayoutParams.MATCH_PARENT
        ));
        return this.view;
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "setChildrenLayoutParams",
                CoordinatorLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS,
                "setScrollingViewBehavior",
                CoordinatorLayoutManager.COMMAND_SET_SCROLLING_VIEW_BEHAVIOR
        );
    }

    @Override
    public void receiveCommand(CoordinatorLayout view, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
            case CoordinatorLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS:
                this.setChildrenLayoutParamsCommand(args.getArray(0));
                break;
            case CoordinatorLayoutManager.COMMAND_SET_SCROLLING_VIEW_BEHAVIOR:
                this.setScrollingViewBehavior(args.getInt(0));
                break;
            default:
                throw new JSApplicationIllegalArgumentException(String.format(
                        "Unsupported commadn %d received by $s",
                        commandType,
                        this.getClass().getSimpleName()
                ));
        }
    }

    @ReactProp(name = "fitsSystemWindows")
    public void setFitsSystemWindows(CoordinatorLayout view, boolean fitsSystemWindows) {
        this.view.setFitsSystemWindows(fitsSystemWindows);
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    private void setChildrenLayoutParamsCommand(@Nullable ReadableArray params) {
        for (int i = 0, size = params.size(); i < size; i++) {
            ReadableMap paramMap = params.getMap(i);
            View view = this.view.getChildAt(paramMap.getInt("childIndex"));
            CoordinatorLayout.LayoutParams layoutParams = (CoordinatorLayout.LayoutParams)view.getLayoutParams();
            int width = layoutParams.width;
            int height = layoutParams.height;

            if (paramMap.hasKey("width")) {
                try {
                    String widthStr = paramMap.getString("width");
                    if ("match_parent".equals(widthStr)) {
                        width = CoordinatorLayout.LayoutParams.MATCH_PARENT;
                    } else if ("wrap_parent".equals(widthStr)) {
                        width = CoordinatorLayout.LayoutParams.WRAP_CONTENT;
                    }
                } catch (Exception e) {
                    width = Utils.dpToPx(paramMap.getInt("width"));
                }
            }

            if (paramMap.hasKey("height")) {
                try {
                    String heightStr = paramMap.getString("height");
                    if ("match_parent".equals(heightStr)) {
                        height = CoordinatorLayout.LayoutParams.MATCH_PARENT;
                    } else if ("wrap_parent".equals(heightStr)) {
                        height = CoordinatorLayout.LayoutParams.WRAP_CONTENT;
                    }
                } catch (Exception e) {
                    height = Utils.dpToPx(paramMap.getInt("height"));
                }
            }

            view.setLayoutParams(new CoordinatorLayout.LayoutParams(width, height));
        }
    }

    private void setScrollingViewBehavior(int viewId) {
        try {
            View view = this.view.getRootView().findViewById(viewId);
            CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) view.getLayoutParams();
            params.setBehavior(new AppBarLayout.ScrollingViewBehavior());
            view.requestLayout();
        } catch (Exception e) {
            //TODO: handle exception
        }
    }

}
