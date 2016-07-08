package com.maornandroidkit.kits.widgets;


import android.content.Context;
import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.support.v4.widget.NestedScrollView;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.common.SystemClock;
import com.facebook.react.uimanager.MeasureSpecAssertions;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.NativeGestureUtil;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ReactScrollViewCommandHelper;
import com.facebook.react.views.scroll.ScrollEvent;
import com.facebook.react.views.scroll.ScrollEventType;
import com.facebook.react.views.view.ReactClippingViewGroup;
import com.facebook.react.views.view.ReactClippingViewGroupHelper;

import java.util.Map;


class MyNestedScrollView extends NestedScrollView implements ReactClippingViewGroup {
    private final OnScrollDispatchHelper onScrollDispatchHelper;
    private boolean removeClippedSubviews;
    private @Nullable Rect clippingRect;

    public static void emitScrollEvent(ViewGroup scrollView, int scrollX, int scrollY) {
        View contentView = scrollView.getChildAt(0);
        ReactContext reactContext = (ReactContext) scrollView.getContext();

        reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                ScrollEvent.obtain(
                        scrollView.getId(),
                        SystemClock.currentTimeMillis(),
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

    public MyNestedScrollView(Context context) {
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

        MyNestedScrollView.emitScrollEvent(this, x, y);
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

public class NestedScrollViewManager
        extends ViewGroupManager<MyNestedScrollView>
        implements ReactScrollViewCommandHelper.ScrollCommandHandler<MyNestedScrollView>
{
    private static final String NAME = "MaoKitsNestedScrollViewAndroid";

    private MyNestedScrollView view;


    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public MyNestedScrollView createViewInstance(ThemedReactContext context) {
        this.view = new MyNestedScrollView(context);
        this.view.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        return this.view;
    }

    @Override
    public @Nullable Map<String, Integer> getCommandsMap() {
        return ReactScrollViewCommandHelper.getCommandsMap();
    }

    @Override
    public void receiveCommand(
            MyNestedScrollView view,
            int commandId, @Nullable ReadableArray args
    ) {
        ReactScrollViewCommandHelper.receiveCommand(this, view, commandId, args);
    }

    @Override
    public void scrollTo(
            MyNestedScrollView view,
            ReactScrollViewCommandHelper.ScrollToCommandData data
    ) {
        int x = data.mDestX;
        int y = data.mDestY;

        if (data.mAnimated) {
            this.view.smoothScrollTo(x, y);
        } else {
            this.view.scrollTo(x, y);
        }
    }

    @Override
    public @Nullable Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.builder()
                .put("topScroll", MapBuilder.of("registrationName", "onScroll"))
                .put("topScrollBeginDrag", MapBuilder.of("registrationName", "onScrollBeginDrag"))
                .put("topScrollEndDrag", MapBuilder.of("registrationName", "onScrollEndDrag"))
                .put("topScrollAnimationEnd", MapBuilder.of("registrationName", "onScrollAnimationEnd"))
                .put("topMomentumScrollBegin", MapBuilder.of("registrationName", "onMomentumScrollBegin"))
                .put("topMomentumScrollEnd", MapBuilder.of("registrationName", "onMomentumScrollEnd"))
                .build();

    }


    @ReactProp(name = "showVerticalScrollIndicator")
    public void setShowVerticalScrollIndicator(MyNestedScrollView view, boolean value) {
        this.view.setVerticalScrollBarEnabled(value);
    }

    @ReactProp(name = ReactClippingViewGroupHelper.PROP_REMOVE_CLIPPED_SUBVIEWS)
    public void setRemoveClippedSubviews(MyNestedScrollView view, boolean removeClippedSubviews) {
        this.view.setRemoveClippedSubviews(removeClippedSubviews);
    }
}
