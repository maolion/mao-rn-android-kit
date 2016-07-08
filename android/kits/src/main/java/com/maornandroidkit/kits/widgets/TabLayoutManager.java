package com.maornandroidkit.kits.widgets;
import android.content.Context;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.kits.Console;

import java.util.Map;

class MyTabLayout extends TabLayout {

    public static int[] getSelectedStateSet() {
        return TabLayout.SELECTED_STATE_SET;
    }

    public static int[] getEmptyStateSet() {
        return TabLayout.EMPTY_STATE_SET;
    }

    public MyTabLayout(Context context) {
        super(context);
    }

}

public class TabLayoutManager extends ViewGroupManager<TabLayout> {
    private static final String NAME = "MaoKitsTabLayoutAndroid";
    private static final int COMMAND_SETUP_VIEW_PAGER = 1;

    private TabLayout view;

    @Override
    public String getName() {
        return TabLayoutManager.NAME;
    }

    @Override
    public TabLayout createViewInstance(ThemedReactContext reactContext) {
        this.view = new TabLayout(reactContext);
        return this.view;
    }

    @Override
    public Map<String, Integer>getCommandsMap() {
        return MapBuilder.of(
                "setupViewPager",
                TabLayoutManager.COMMAND_SETUP_VIEW_PAGER
        );
    }

    @Override
    public void receiveCommand(TabLayout view, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
            case TabLayoutManager.COMMAND_SETUP_VIEW_PAGER:
                this.setupViewPager(args.getInt(0), args.getArray(1));
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
    public void addView(TabLayout view, View child, int index) {
        this.view.addTab(this.view.newTab().setCustomView(child));
    }

    @Override
    public int getChildCount(TabLayout view) {
        return this.view.getTabCount();
    }

    @Override
    public View getChildAt(TabLayout view, int index) {
        TabLayout.Tab tab = this.view.getTabAt(index);
        return tab.getCustomView();
    }

    @Override
    public void removeViewAt(TabLayout view, int index) {
        this.view.removeTabAt(index);
    }

    @ReactProp(name = "tabs")
    public void setTabs(TabLayout view, ReadableArray tabs) {
        this.view.removeAllTabs();
        this.populateTabLayoutWithTabs(tabs);
    }

    @ReactProp(name = "tabTextColor", customType = "Color")
    public void setTabTextColor(TabLayout view, int color) {
        int selectedColor = this.view.getTabTextColors()
                .getColorForState(MyTabLayout.getSelectedStateSet(), color);
        this.view.setTabTextColors(color, selectedColor);
    }

    @ReactProp(name = "tabSelectedTextColor", customType = "color")
    public void setTabSelectedTextColor(TabLayout view, int color) {
        int normalColor = view.getTabTextColors()
                .getColorForState(MyTabLayout.getEmptyStateSet(), color);
        this.view.setTabTextColors(normalColor, color);
    }

    @ReactProp(name = "tabIndicatorColor", customType = "Color")
    public void setSelectedTabIndicatorColor(TabLayout view, int color) {
        this.view.setSelectedTabIndicatorColor(color);
    }

    @ReactProp(name = "tabIndicatorHeight")
    public void setSelectedTabIndicatorHeight(TabLayout view, int height) {
        this.view.setSelectedTabIndicatorHeight(height);
    }

    @ReactProp(name = "tabGravity")
    public void setTabGravity(TabLayout view, String gravity) {
        if ("center".equals(gravity)) {
            this.view.setTabGravity(TabLayout.GRAVITY_CENTER);
        } else if ("fill".equals(gravity)){
            this.view.setTabGravity(TabLayout.GRAVITY_FILL);
        }
    }

    @ReactProp(name = "tabMode")
    public void setTabMode(TabLayout view, String mode) {
        if ("fixed".equals(mode)) {
            this.view.setTabMode(TabLayout.MODE_FIXED);
        } else if ("scrollable".equals(mode)) {
            this.view.setTabMode(TabLayout.MODE_SCROLLABLE);
        }
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    private void setupViewPager(int viewPagerId, @Nullable ReadableArray tabs) {
        ViewPager viewPager = (ViewPager)this.view.getRootView().findViewById(viewPagerId);
        this.view.setupWithViewPager(viewPager);
        Console.log("tabs.size() = "+ (tabs != null ? tabs.size() : 0));
        if (tabs != null) {
            this.view.removeAllTabs();
            this.populateTabLayoutWithTabs(tabs);
        }
    }

    private void populateTabLayoutWithTabs(ReadableArray tabs) {
        try {
            for (int i = 0, size = tabs.size(); i < size; i++) {
                ReadableMap tabMap = tabs.getMap(i);
                TabLayout.Tab tab = view.newTab();
                if (tabMap.hasKey("text")) {
                    tab.setText(tabMap.getString("text"));
                }

                this.view.addTab(tab);
            }
        } catch (Exception e) {
            //TODO: handle exception
        }
    }
}
