package com.maornandroidkit.kits.widgets;

import android.content.Context;
import android.support.design.widget.TabLayout;
import android.util.AttributeSet;
import android.view.View;

import com.facebook.react.uimanager.PixelUtil;
import com.maornandroidkit.kits.Console;

public class MTabLayout extends TabLayout {
    public static int[] getSelectedStateSet() {
        return TabLayout.SELECTED_STATE_SET;
    }

    public static int[] getEmptyStateSet() {
        return TabLayout.EMPTY_STATE_SET;
    }

    private int height;

    public MTabLayout(Context context) {
        super(context);
    }

    public MTabLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
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
        this.height = height;
        this.requestLayout();
    }
}

