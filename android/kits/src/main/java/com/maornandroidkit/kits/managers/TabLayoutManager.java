package com.maornandroidkit.kits.managers;
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
import com.maornandroidkit.kits.Console;
import com.maornandroidkit.kits.R;
import com.maornandroidkit.kits.Utils;
import com.maornandroidkit.kits.widgets.MTabLayout;


import java.util.Map;

public class TabLayoutManager extends ViewGroupManager<MTabLayout> {
    private static final String NAME = "MaoKitsTabLayoutAndroid";
    private static final int COMMAND_SETUP_VIEW_PAGER = 1;
    private static final int COMMAND_SET_VIEW_SIZE = 2;

    private MTabLayout view;
    private ViewPager viewPager;
    private TabLayout.TabLayoutOnPageChangeListener tabPageChangeListener;
    private ViewPager.OnPageChangeListener viewPagerPageChangeListener;
    private boolean removedTabPageChangeListener;
    private View.OnClickListener tabClickListener;
    private int tabTextNormalColor;
    private int tabTextSelectedColor;
    private float tabTextSize;
    private int tabSidePadding;

    public String getName() {
        return TabLayoutManager.NAME;
    }

    public TabLayoutManager() {
        this.tabSidePadding = Utils.dpToPx(10);
    }

    @Override
    public MTabLayout createViewInstance(ThemedReactContext reactContext) {
        this.view = (MTabLayout) LayoutInflater.from(reactContext)
                .inflate(R.layout.m_tab_layout, null);

        this.initListeners();

        return this.view;
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
                this.setupViewPager(args.getInt(0), args.getArray(1));
                break;
            case TabLayoutManager.COMMAND_SET_VIEW_SIZE:
                this.setSize(args.getMap(0));
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
        this.view.removeAllTabs();
        this.populateTabLayoutWithTabs(tabs);
    }

    @ReactProp(name = "tabTextSize")
    public void setTabTextSize(MTabLayout view, int textSize) {
        this.tabTextSize = textSize;
        this.updateTabTextSize();
    }

    @ReactProp(name = "tabTextColor", customType = "Color")
    public void setTabTextColor(MTabLayout view, int color) {
        int selectedColor = this.view.getTabTextColors()
                .getColorForState(MTabLayout.getSelectedStateSet(), color);
        this.view.setTabTextColors(color, selectedColor);

    }


    @ReactProp(name = "tabSelectedTextColor", customType = "Color")
    public void setTabSelectedTextColor(MTabLayout view, int color) {
        this.tabTextNormalColor = view.getTabTextColors()
                .getColorForState(MTabLayout.getEmptyStateSet(), color);

        this.tabTextSelectedColor = color;
        this.setTabTextColor(this.view.getSelectedTabPosition(), color);
    }

    @ReactProp(name = "tabIndicatorColor", customType = "Color")
    public void setSelectedTabIndicatorColor(MTabLayout view, int color) {
        this.view.setSelectedTabIndicatorColor(color);
    }

    @ReactProp(name = "tabIndicatorHeight")
    public void setSelectedTabIndicatorHeight(MTabLayout view, int height) {
        this.view.setSelectedTabIndicatorHeight(Utils.dpToPx(height));
    }

    @ReactProp(name = "tabGravity")
    public void setTabGravity(MTabLayout view, String gravity) {
        if ("center".equals(gravity)) {
            this.view.setTabGravity(MTabLayout.GRAVITY_CENTER);
        } else if ("fill".equals(gravity)){
            this.view.setTabGravity(MTabLayout.GRAVITY_FILL);
        }
    }

    @ReactProp(name = "tabMode")
    public void setTabMode(MTabLayout view, String mode) {
        if ("fixed".equals(mode)) {
            this.view.setTabMode(MTabLayout.MODE_FIXED);
        } else if ("scrollable".equals(mode)) {
            this.view.setTabMode(MTabLayout.MODE_SCROLLABLE);
        }
    }

    @ReactProp(name = "tabSidePadding")
    public void setTabSidePadding(MTabLayout view, int padding) {
        padding = Utils.dpToPx(padding);
        this.tabSidePadding = padding;

        for (int i = 0, l = this.view.getTabCount(); i < l; i++) {
            View tabView = this.getTabView(i);

            if (tabView == null) {
                return;
            }

            tabView.setPadding(padding, 0, padding, 0);
        }
    }

    @ReactProp(name = "tabHeight")
    public void setHeight(MTabLayout view, int height) {
        this.view.setHeight(Utils.dpToPx(height));
    }

    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    private void setupViewPager(int viewPagerId, @Nullable ReadableArray tabs) {
        ViewPager viewPager = (ViewPager)this.view.getRootView().findViewById(viewPagerId);
        this.viewPager = viewPager;

        viewPager.addOnPageChangeListener(this.tabPageChangeListener);
        viewPager.addOnPageChangeListener(this.viewPagerPageChangeListener);

        if (tabs != null) {
            this.view.removeAllTabs();
            this.populateTabLayoutWithTabs(tabs);
        }
    }

    private void populateTabLayoutWithTabs(ReadableArray tabs) {
        try {
            final int selectedTabPosition = this.viewPager != null ?
                    this.viewPager.getCurrentItem() : 0;

            for (int i = 0, size = tabs.size(); i < size; i++) {
                ReadableMap tabMap = tabs.getMap(i);
                TabLayout.Tab tab = view.newTab();

                View tabView = null;
                if (tabMap.hasKey("text")) {
                    //tab.setText(tabMap.getString("text"));
                    tabView = LayoutInflater.from(
                            this.view.getContext()).inflate(R.layout.m_tab_layout_default_tab_view, null
                    );
                    TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
                    textView.setText(tabMap.getString("text"));
                    tab.setCustomView(tabView);
                    tabView = (View) tabView.getParent();
                    tabView.setOnClickListener(this.tabClickListener);
                    tabView.setTag(i);
                }

                this.view.addTab(tab);

                if (tabView == null) {
                    continue;
                }

                if (selectedTabPosition == i) {
                    this.setSelectedTabStyle(tabView);
                } else {
                    this.setUnselectTabStyle(tabView);
                }

                tabView.setPadding(this.tabSidePadding, 0, this.tabSidePadding, 0);
            }
            if (this.tabTextSize != 0) {
                this.updateTabTextSize();
            }
        } catch (Exception e) {
            //TODO: handle exception
        }
    }

    private void initListeners() {
        final TabLayoutManager _this = this;
        this.removedTabPageChangeListener = false;
        this.tabPageChangeListener = new TabLayout.TabLayoutOnPageChangeListener(this.view);

        this.tabClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int tabIndex = (int) view.getTag();
                if (_this.viewPager == null) {
                    return;
                }

                if (_this.viewPager.getCurrentItem() == tabIndex) {
                    return;
                }

                _this.removedTabPageChangeListener = true;
                _this.viewPager.removeOnPageChangeListener(_this.tabPageChangeListener);
                _this.viewPager.setCurrentItem(tabIndex, true);
            }
        };

        this.viewPagerPageChangeListener = new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrollStateChanged(int state) {
                if (!_this.removedTabPageChangeListener || state != 0 || _this.viewPager == null) {
                    return;
                }
                _this.removedTabPageChangeListener = false;
                _this.viewPager.addOnPageChangeListener(_this.tabPageChangeListener);
            }

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int position) {
            }
        };


        this.view.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                _this.setSelectedTabStyle(_this.getTabView(tab.getPosition()));
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                _this.setUnselectTabStyle(_this.getTabView(tab.getPosition()));
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });
    }

    private void setSelectedTabStyle(View tabView) {
        if (tabView == null) {
            return;
        }

        TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
        if (textView == null) {
            return;
        }

        if (this.tabTextSelectedColor != 0) {
            textView.setTextColor(this.tabTextSelectedColor);
        }
    }


    private void setUnselectTabStyle(View tabView) {
        if (tabView == null) {
            return;
        }

        TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
        if (textView == null) {
            return;
        }

        if (this.tabTextNormalColor != 0) {
            textView.setTextColor(this.tabTextNormalColor);
        }
    }

    private void setTabTextColor(int position, int color) {
        View tabView = this.getTabView(position);
        if (tabView == null) {
            return;
        }
        TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
        if (textView == null) {
            return;
        }
        textView.setTextColor(color);
    }


    private View getTabView(int position) {
        TabLayout.Tab tab;
        try {
            tab = this.view.getTabAt(position);
        } catch (Exception e) {
            return null;
        }
        if (tab == null || tab.getCustomView() == null) {
            return null;
        }
        View tabView = (View) tab.getCustomView().getParent();
        return tabView;
    }

    private void updateTabTextSize() {
        for (int i = 0, l = this.view.getTabCount(); i < l; i++) {
            View tabView = this.getTabView(i);
            if (tabView == null) {
                return;
            }

            TextView textView = (TextView) tabView.findViewById(R.id.tab_title);

            if (textView == null) {
                return;
            }

            textView.setTextSize(this.tabTextSize);
        }
    }

    private void setSize(ReadableMap sizeMap) {
        ViewGroup.LayoutParams params = (ViewGroup.LayoutParams) this.view.getLayoutParams();

        if (sizeMap.hasKey("width")) {
            try {
                String widthStr = sizeMap.getString("width");
                if ("match_parent".equals(widthStr)) {
                    params.width = ViewGroup.LayoutParams.MATCH_PARENT;

                } else if ("wrap_parent".equals(widthStr)) {
                    params.width = ViewGroup.LayoutParams.WRAP_CONTENT;
                }
            } catch (Exception e) {
                params.width = Utils.dpToPx(sizeMap.getInt("width"));
            }
        }

        if (sizeMap.hasKey("height")) {
            try {
                String heightStr = sizeMap.getString("height");
                if ("match_parent".equals(heightStr)) {
                    params.height = ViewGroup.LayoutParams.MATCH_PARENT;
                } else if ("wrap_parent".equals(heightStr)) {
                    params.height = ViewGroup.LayoutParams.WRAP_CONTENT;
                }
            } catch (Exception e) {
                params.height = Utils.dpToPx(sizeMap.getInt("height"));
            }
        }

        this.view.setLayoutParams(params);
    }
}
