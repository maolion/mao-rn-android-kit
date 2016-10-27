package com.maornandroidkit.managers;

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
import com.facebook.react.uimanager.RootView;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.Utils;
import com.maornandroidkit.widgets.MCoordinatorLayout;

import java.util.Map;

public class CoordinatorLayoutManager extends ViewGroupManager<MCoordinatorLayout> {

    public static final String NAME = "MaoKitsCoordinatorLayoutAndroid";
    public static final int COMMAND_SET_CHILDREN_LAYOUT_PARAMS = 1;
    public static final int COMMAND_SET_SCROLLING_VIEW_BEHAVIOR = 2;
    public static final int COMMAND_RESET_BEHAVIOR = 3;

    @Override
    public String getName() {
        return CoordinatorLayoutManager.NAME;
    }

    @Override
    public MCoordinatorLayout createViewInstance(ThemedReactContext context) {
        MCoordinatorLayout layout = new MCoordinatorLayout(context);
        layout.setLayoutParams(new CoordinatorLayout.LayoutParams(
                CoordinatorLayout.LayoutParams.MATCH_PARENT,
                CoordinatorLayout.LayoutParams.MATCH_PARENT
        ));
        return layout;
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "setChildrenLayoutParams",
                CoordinatorLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS,
                "setScrollingViewBehavior",
                CoordinatorLayoutManager.COMMAND_SET_SCROLLING_VIEW_BEHAVIOR,
                "resetBehavior",
                CoordinatorLayoutManager.COMMAND_RESET_BEHAVIOR
        );
    }

    @Override
    public void receiveCommand(MCoordinatorLayout layout, int commandType, @Nullable ReadableArray args) {
        View rootView = layout.getRootView();

        switch (commandType) {
            case CoordinatorLayoutManager.COMMAND_SET_CHILDREN_LAYOUT_PARAMS:
                this.setChildrenLayoutParamsCommand(layout, args.getArray(0));
                break;
            case CoordinatorLayoutManager.COMMAND_SET_SCROLLING_VIEW_BEHAVIOR:
                layout.setScrollingViewBehavior(rootView.findViewById(args.getInt(0)));
                break;
            case CoordinatorLayoutManager.COMMAND_RESET_BEHAVIOR:
                Log.i("args.getInt(0)", args.getInt(0) + ".");
                layout.resetBehavior(
                        (AppBarLayout) rootView.findViewById(args.getInt(0)),
                        args.getBoolean(1),
                        args.getBoolean(2)
                );
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
    public void setFitsSystemWindows(MCoordinatorLayout layout, boolean fitsSystemWindows) {
        layout.setFitsSystemWindows(fitsSystemWindows);
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    private void setChildrenLayoutParamsCommand(MCoordinatorLayout layout, @Nullable ReadableArray params) {
        for (int i = 0, size = params.size(); i < size; i++) {
            ReadableMap paramMap = params.getMap(i);
            View childView = layout.getChildAt(paramMap.getInt("childIndex"));
            CoordinatorLayout.LayoutParams layoutParams = (CoordinatorLayout.LayoutParams)childView.getLayoutParams();
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
                    width = Utils.dp2px(paramMap.getDouble("width"));
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
                    height = Utils.dp2px(paramMap.getDouble("height"));
                }
            }

            childView.setLayoutParams(new CoordinatorLayout.LayoutParams(width, height));
        }
    }

}
