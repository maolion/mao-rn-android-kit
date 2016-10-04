package com.maornandroidkit.widgets;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.maornandroidkit.Console;
import com.maornandroidkit.R;
import com.maornandroidkit.Utils;

public class MTabLayout extends TabLayout {
    public static int[] getSelectedStateSet() {
        return TabLayout.SELECTED_STATE_SET;
    }

    public static int[] getEmptyStateSet() {
        return TabLayout.EMPTY_STATE_SET;
    }

    private int mHeight;


    private ViewPager mViewPager;
    private TabLayout.TabLayoutOnPageChangeListener mTabPageChangeListener;
    private ViewPager.OnPageChangeListener mViewPagerPageChangeListener;
    private boolean mRemovedTabPageChangeListener;
    private View.OnClickListener mTabClickListener;
    private int mTabTextNormalColor = Color.argb(60, 0, 0, 0);
    private int mTabTextSelectedColor = Color.argb(100, 0, 0, 0);
    private float mTabTextSize;
    private int mTabSidePadding;

    public MTabLayout(Context context) {
        this(context, null);
    }

    public MTabLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        mTabSidePadding = Utils.dpToPx(10);
        initListeners();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        if (mHeight != 0) {
            heightMeasureSpec = MeasureSpec.makeMeasureSpec(
                    mHeight,
                    MeasureSpec.EXACTLY
            );
        }

        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setHeight(int height) {
        mHeight = Utils.dpToPx(height);
        requestLayout();
    }

    public void setTabSidePadding(int padding) {
        padding = Utils.dpToPx(padding);
        mTabSidePadding = padding;

        for (int i = 0, l = getTabCount(); i < l; i++) {
            View tabView = getTabView(i);

            if (tabView == null) {
                return;
            }

            tabView.setPadding(padding, 0, padding, 0);
        }
    }

    public void setSize(ReadableMap sizeMap) {
        ViewGroup.LayoutParams params = (ViewGroup.LayoutParams) getLayoutParams();

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

        setLayoutParams(params);
    }

    public void setTabTextSize(int textSize) {
        mTabTextSize = textSize;
        updateTabTextSize();
    }

    public void setTabSelectedTextColor(int color) {
        mTabTextSelectedColor = color;
        updateTabTextColor();
    }

    public void setTabTextColor(int color) {
        mTabTextNormalColor = color;
        updateTabTextColor();
    }

    public void setupViewPager(int viewPagerId, @Nullable ReadableArray tabs) {
        ViewPager viewPager = (ViewPager)getRootView().findViewById(viewPagerId);
        mViewPager = viewPager;

        viewPager.addOnPageChangeListener(mTabPageChangeListener);
        viewPager.addOnPageChangeListener(mViewPagerPageChangeListener);

        if (tabs != null) {
            removeAllTabs();
            setTabs(tabs);
        }
    }


    public void setTabs(ReadableArray tabs) {
        try {
            final int selectedTabPosition = mViewPager != null ?
                    mViewPager.getCurrentItem() : 0;

            for (int i = 0, size = tabs.size(); i < size; i++) {
                ReadableMap tabMap = tabs.getMap(i);
                TabLayout.Tab tab = newTab();

                View tabView = null;
                if (tabMap.hasKey("text")) {
                    //tab.setText(tabMap.getString("text"));
                    tabView = LayoutInflater.from(
                            getContext()).inflate(R.layout.m_tab_layout_default_tab_view, null
                    );
                    TextView textView = (TextView) tabView.findViewById(R.id.tab_title);
                    textView.setText(tabMap.getString("text"));
                    tab.setCustomView(tabView);
                    tabView = (View) tabView.getParent();
                    tabView.setOnClickListener(mTabClickListener);
                    tabView.setTag(i);
                }

                addTab(tab);

                //Log.i("debug", "hello");
                if (tabView == null) {
                    continue;
                }

                if (selectedTabPosition == i) {
                    setSelectedTabStyle(tabView);
                } else {
                    setUnselectTabStyle(tabView);
                }

                tabView.setPadding(mTabSidePadding, 0, mTabSidePadding, 0);
            }
            if (mTabTextSize != 0) {
                updateTabTextSize();
            }
        } catch (Exception e) {
            //TODO: handle exception
        }

        ViewGroup tabWrap =  (ViewGroup) getChildAt(0);
        for (int i = 0, l = tabWrap.getChildCount(); i < l; i++) {
            ViewGroup viewGroup = (ViewGroup) tabWrap.getChildAt(i);
            for (int i2 = 0, l2 = viewGroup.getChildCount(); i2 < l2; i2++) {
                View view = viewGroup.getChildAt(i2);
                if (view instanceof LinearLayout) {
                    continue;
                }
                viewGroup.removeView(view);
            }
        }
    }


    private void initListeners() {
        mRemovedTabPageChangeListener = false;
        mTabPageChangeListener = new TabLayout.TabLayoutOnPageChangeListener(this);

        mTabClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int tabIndex = (int) view.getTag();
                if (mViewPager == null) {
                    return;
                }

                if (mViewPager.getCurrentItem() == tabIndex) {
                    return;
                }

                mRemovedTabPageChangeListener = true;
                mViewPager.removeOnPageChangeListener(mTabPageChangeListener);
                mViewPager.setCurrentItem(tabIndex, true);
            }
        };

        mViewPagerPageChangeListener = new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrollStateChanged(int state) {
                if (!mRemovedTabPageChangeListener || state != 0 || mViewPager == null) {
                    return;
                }
                mRemovedTabPageChangeListener = false;
                mViewPager.addOnPageChangeListener(mTabPageChangeListener);
            }

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int position) {
            }
        };


        setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                setSelectedTabStyle(getTabView(tab.getPosition()));
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                setUnselectTabStyle(getTabView(tab.getPosition()));
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

        if (mTabTextSelectedColor != 0) {
            textView.setTextColor(mTabTextSelectedColor);
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

        if (mTabTextNormalColor != 0) {
            textView.setTextColor(mTabTextNormalColor);
        }
    }
    private void setTabTextColor(int position, int color) {
        View tabView = getTabView(position);
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
            tab = getTabAt(position);
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
        for (int i = 0, l = getTabCount(); i < l; i++) {
            View tabView = getTabView(i);
            if (tabView == null) {
                return;
            }

            TextView textView = (TextView) tabView.findViewById(R.id.tab_title);

            if (textView == null) {
                return;
            }

            textView.setTextSize(mTabTextSize);
        }
    }

    private void updateTabTextColor() {
        for (int i = 0, l = getTabCount(); i < l; i++) {
            View tabView = getTabView(i);
            if (tabView == null) {
                return;
            }

            TextView textView = (TextView) tabView.findViewById(R.id.tab_title);

            if (textView == null) {
                return;
            }
            if (getSelectedTabPosition() == i && mTabTextSelectedColor != 0) {
                textView.setTextColor(mTabTextSelectedColor);
            } else if (mTabTextNormalColor != 0) {
                textView.setTextColor(mTabTextNormalColor);
            }
        }
    }


}
