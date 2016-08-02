package com.maornandroidkit.kits.widgets;
import android.content.Context;
import android.graphics.Typeface;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.maornandroidkit.kits.Console;
import com.maornandroidkit.kits.R;

import org.w3c.dom.Text;

import java.util.Map;
import java.util.zip.Inflater;

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
    private ViewPager viewPager;
    private TabLayout.TabLayoutOnPageChangeListener tabPageChangeListener;
    private ViewPager.OnPageChangeListener viewPagerPageChangeListener;
    private boolean removedTabPageChangeListener;
    private View.OnClickListener tabClickListener;
    private int tabTextNormalColor;
    private int tabTextSelectedColor;
    private float tabTextSize;

    public String getName() {
        return TabLayoutManager.NAME;
    }

    @Override
    public TabLayout createViewInstance(ThemedReactContext reactContext) {
        this.view = new TabLayout(reactContext);
        this.initListeners();

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

    @ReactProp(name = "tabTextSize")
    public void setTabTextSize(TabLayout view, float textSize) {
        this.tabTextSize = textSize;
        this.updateTabTextSize();
    }

    @ReactProp(name = "tabTextColor", customType = "Color")
    public void setTabTextColor(TabLayout view, int color) {
        int selectedColor = this.view.getTabTextColors()
                .getColorForState(MyTabLayout.getSelectedStateSet(), color);
        this.view.setTabTextColors(color, selectedColor);
    }


    @ReactProp(name = "tabSelectedTextColor", customType = "Color")
    public void setTabSelectedTextColor(TabLayout view, int color) {
        this.tabTextNormalColor = view.getTabTextColors()
                .getColorForState(MyTabLayout.getEmptyStateSet(), color);

        this.tabTextSelectedColor = color;
        this.setTabTextColor(this.view.getSelectedTabPosition(), color);
        //this.view.setTabTextColors(normalColor, color);
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
        //this.view.setupWithViewPager(viewPager);
        this.viewPager = viewPager;
        viewPager.addOnPageChangeListener(this.tabPageChangeListener);
        viewPager.addOnPageChangeListener(this.viewPagerPageChangeListener);
        Console.log("tabs.size() = "+ (tabs != null ? tabs.size() : 0));
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
                            this.view.getContext()).inflate(R.layout.custom_tab, null
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

        //textView.setTypeface(textView.getTypeface(), Typeface.BOLD);
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

        //textView.setTypeface(textView.getTypeface(), Typeface.NORMAL);
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

}
