package com.maornandroidkit.kits.widgets;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.maornandroidkit.kits.Console;
import com.maornandroidkit.kits.R;
import com.maornandroidkit.kits.Utils;

public class MTabLayout extends TabLayout {
    public static int[] getSelectedStateSet() {
        return TabLayout.SELECTED_STATE_SET;
    }

    public static int[] getEmptyStateSet() {
        return TabLayout.EMPTY_STATE_SET;
    }

    private int height;


    private ViewPager viewPager;
    private TabLayout.TabLayoutOnPageChangeListener tabPageChangeListener;
    private ViewPager.OnPageChangeListener viewPagerPageChangeListener;
    private boolean removedTabPageChangeListener;
    private View.OnClickListener tabClickListener;
    private int tabTextNormalColor;
    private int tabTextSelectedColor;
    private float tabTextSize;
    private int tabSidePadding;

    public MTabLayout(Context context) {
        this(context, null);
    }

    public MTabLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.tabSidePadding = Utils.dpToPx(10);
        this.initListeners();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        if (this.height != 0) {
            heightMeasureSpec = MeasureSpec.makeMeasureSpec(
                    this.height,
                    MeasureSpec.EXACTLY
            );
        }

        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setHeight(int height) {
        this.height = Utils.dpToPx(height);
        this.requestLayout();
    }

    public void setTabSidePadding(int padding) {
        padding = Utils.dpToPx(padding);
        this.tabSidePadding = padding;

        for (int i = 0, l = this.getTabCount(); i < l; i++) {
            View tabView = this.getTabView(i);

            if (tabView == null) {
                return;
            }

            tabView.setPadding(padding, 0, padding, 0);
        }
    }

    public void setSize(ReadableMap sizeMap) {
        ViewGroup.LayoutParams params = (ViewGroup.LayoutParams) this.getLayoutParams();

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

        this.setLayoutParams(params);
    }

    public void setTabTextSize(int textSize) {
        this.tabTextSize = textSize;
        this.updateTabTextSize();
    }

    public void setTabSelectedTextColor(int color) {
        this.tabTextNormalColor = this.getTabTextColors()
                .getColorForState(MTabLayout.getEmptyStateSet(), color);

        this.tabTextSelectedColor = color;
        this.setTabTextColor(this.getSelectedTabPosition(), color);
    }

    public void setTabTextColor(int color) {
        int selectedColor = this.getTabTextColors()
                .getColorForState(MTabLayout.getSelectedStateSet(), color);
        this.setTabTextColors(color, selectedColor);
    }

    public void setupViewPager(int viewPagerId, @Nullable ReadableArray tabs) {
        ViewPager viewPager = (ViewPager)this.getRootView().findViewById(viewPagerId);
        this.viewPager = viewPager;

        viewPager.addOnPageChangeListener(this.tabPageChangeListener);
        viewPager.addOnPageChangeListener(this.viewPagerPageChangeListener);

        if (tabs != null) {
            this.removeAllTabs();
            this.setTabs(tabs);
        }
    }


    public void setTabs(ReadableArray tabs) {
        try {
            final int selectedTabPosition = this.viewPager != null ?
                    this.viewPager.getCurrentItem() : 0;

            for (int i = 0, size = tabs.size(); i < size; i++) {
                ReadableMap tabMap = tabs.getMap(i);
                TabLayout.Tab tab = this.newTab();

                View tabView = null;
                if (tabMap.hasKey("text")) {
                    //tab.setText(tabMap.getString("text"));
                    tabView = LayoutInflater.from(
                            this.getContext()).inflate(R.layout.m_tab_layout_default_tab_view, null
                    );
                    TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
                    textView.setText(tabMap.getString("text"));
                    tab.setCustomView(tabView);
                    tabView = (View) tabView.getParent();
                    tabView.setOnClickListener(this.tabClickListener);
                    tabView.setTag(i);
                }

                this.addTab(tab);

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
        final MTabLayout _this = this;
        this.removedTabPageChangeListener = false;
        this.tabPageChangeListener = new TabLayout.TabLayoutOnPageChangeListener(this);

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


        this.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
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
            tab = this.getTabAt(position);
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
        for (int i = 0, l = this.getTabCount(); i < l; i++) {
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

