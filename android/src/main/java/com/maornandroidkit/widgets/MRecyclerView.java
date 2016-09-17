package com.maornandroidkit.widgets;


import android.content.Context;
import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.support.v4.widget.NestedScrollView;
import android.support.v7.widget.RecyclerView;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.SystemClock;
import com.facebook.react.uimanager.MeasureSpecAssertions;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.NativeGestureUtil;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ScrollEvent;
import com.facebook.react.views.scroll.ScrollEventType;
import com.facebook.react.views.view.ReactClippingViewGroup;
import com.facebook.react.views.view.ReactClippingViewGroupHelper;

public class MRecyclerView extends RecyclerView implements ReactClippingViewGroup {
    private final OnScrollDispatchHelper onScrollDispatchHelper;
    private boolean removeClippedSubviews;
    private
    @Nullable
    Rect clippingRect;

    public static void emitScrollEvent(ViewGroup scrollView, int scrollX, int scrollY) {
        View contentView = scrollView.getChildAt(0);
        ReactContext reactContext = (ReactContext) scrollView.getContext();

        reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                ScrollEvent.obtain(
                        scrollView.getId(),
                        ScrollEventType.SCROLL,
                        scrollX,
                        scrollY,
                        contentView.getWidth(),
                        contentView.getHeight(),
                        scrollView.getWidth(),
                        scrollView.getHeight()
                )
        );
    }

    public MRecyclerView(Context context) {
        super(context);
        this.onScrollDispatchHelper = new OnScrollDispatchHelper();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        MeasureSpecAssertions.assertExplicitMeasureSpec(widthMeasureSpec, heightMeasureSpec);
        this.setMeasuredDimension(
                MeasureSpec.getSize(widthMeasureSpec),
                MeasureSpec.getSize(heightMeasureSpec)
        );
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        this.scrollTo(
                this.getScrollX(),
                this.getScrollY()
        );
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (this.removeClippedSubviews) {
            this.updateClippingRect();
        }
    }

    @Override
    protected void onScrollChanged(int x, int y, int oldx, int oldy) {
        super.onScrollChanged(x, y, oldx, oldy);

        if (this.onScrollDispatchHelper.onScrollChanged(x, y)) {
            if (this.removeClippedSubviews) {
                this.updateClippingRect();
            }
        }

        MNestedScrollView.emitScrollEvent(this, x, y);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
        if (super.onInterceptTouchEvent(event)) {
            NativeGestureUtil.notifyNativeGestureStarted(this, event);
            return true;
        }
        return false;
    }

    @Override
    public void setRemoveClippedSubviews(boolean removeClippedSubviews) {
        if (removeClippedSubviews && this.clippingRect == null) {
            this.clippingRect = new Rect();
        }
        this.removeClippedSubviews = removeClippedSubviews;
        this.updateClippingRect();
    }

    @Override
    public boolean getRemoveClippedSubviews() {
        return this.removeClippedSubviews;
    }

    @Override
    public void updateClippingRect() {
        if (this.removeClippedSubviews) {
            return;
        }
        ReactClippingViewGroupHelper.calculateClippingRect(this, this.clippingRect);
        View contentView = this.getChildAt(0);
        if (contentView instanceof ReactClippingViewGroup) {
            ((ReactClippingViewGroup) contentView).updateClippingRect();
        }
    }

    @Override
    public void getClippingRect(Rect outClippingRect) {
        outClippingRect.set(this.clippingRect);
    }
}