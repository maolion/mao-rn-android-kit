package com.maornandroidkit.managers;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.Console;
import com.maornandroidkit.R;
import com.maornandroidkit.Utils;
import com.maornandroidkit.widgets.MTabLayout;


import java.util.Map;

public class TabLayoutManager extends ViewGroupManager<MTabLayout> {
    private static final String NAME = "MaoKitsTabLayoutAndroid";
    private static final int COMMAND_SETUP_VIEW_PAGER = 1;
    private static final int COMMAND_SET_VIEW_SIZE = 2;

    public String getName() {
        return TabLayoutManager.NAME;
    }

    @Override
    public MTabLayout createViewInstance(ThemedReactContext reactContext) {
        return (MTabLayout) LayoutInflater.from(reactContext)
                .inflate(R.layout.m_tab_layout, null);
    }

    @Override
    public Map<String, Integer>getCommandsMap() {
        return MapBuilder.of(
                "setupViewPager",
                TabLayoutManager.COMMAND_SETUP_VIEW_PAGER,
                "setViewSize",
                TabLayoutManager.COMMAND_SET_VIEW_SIZE
        );
    }

    @Override
    public void receiveCommand(MTabLayout view, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
            case TabLayoutManager.COMMAND_SETUP_VIEW_PAGER:
                view.setupViewPager(args.getInt(0), args.getArray(1), args.getBoolean(2));
                break;
            case TabLayoutManager.COMMAND_SET_VIEW_SIZE:
                view.setSize(args.getMap(0));
                break;
            default:
                throw new JSApplicationIllegalArgumentException(String.format(
                        "Unsupported commadn %d received by $s",
                        commandType,
                        this.getClass().getSimpleName()
                ));
        }
    }

    @ReactProp(name = "tabs")
    public void setTabs(MTabLayout view, ReadableArray tabs) {
        view.removeAllTabs();
        view.setTabs(tabs);
    }

    @ReactProp(name = "tabTextSize")
    public void setTabTextSize(MTabLayout view, double textSize) {
        view.setTabTextSize(Utils.dp2px(textSize));
    }

    @ReactProp(name = "tabTextColor", customType = "Color")
    public void setTabTextColor(MTabLayout view, int color) {
        view.setTabTextColor(color);
    }


    @ReactProp(name = "tabSelectedTextColor", customType = "Color")
    public void setTabSelectedTextColor(MTabLayout view, int color) {
        view.setTabSelectedTextColor(color);
    }

    @ReactProp(name = "tabIndicatorColor", customType = "Color")
    public void setSelectedTabIndicatorColor(MTabLayout view, int color) {
        view.setSelectedTabIndicatorColor(color);
    }

    @ReactProp(name = "tabIndicatorHeight")
    public void setSelectedTabIndicatorHeight(MTabLayout view, double height) {
        view.setSelectedTabIndicatorHeight(Utils.dp2px(height));
    }

    @ReactProp(name = "tabGravity")
    public void setTabGravity(MTabLayout view, String gravity) {
        if ("center".equals(gravity)) {
            view.setTabGravity(MTabLayout.GRAVITY_CENTER);
        } else if ("fill".equals(gravity)){
            view.setTabGravity(MTabLayout.GRAVITY_FILL);
        }
    }

    @ReactProp(name = "tabMode")
    public void setTabMode(MTabLayout view, String mode) {
        if ("fixed".equals(mode)) {
            view.setTabMode(MTabLayout.MODE_FIXED);
        } else if ("scrollable".equals(mode)) {
            view.setTabMode(MTabLayout.MODE_SCROLLABLE);
        }
    }

    @ReactProp(name = "tabSidePadding")
    public void setTabSidePadding(MTabLayout view, double padding) {
        view.setTabSidePadding(Utils.dp2px(padding));
    }

    @ReactProp(name = "tabHeight")
    public void setHeight(MTabLayout view, double height) {
        view.setHeight(Utils.dp2px(height));
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }


}
