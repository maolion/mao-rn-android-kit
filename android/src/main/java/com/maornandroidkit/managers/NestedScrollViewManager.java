package com.maornandroidkit.managers;

import android.support.annotation.Nullable;
import android.support.v4.widget.NestedScrollView;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ReactClippingViewGroupHelper;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.scroll.ReactScrollViewCommandHelper;

import com.maornandroidkit.Console;
import com.maornandroidkit.widgets.MNestedScrollView;

import java.util.Map;

public class NestedScrollViewManager
        extends ViewGroupManager<MNestedScrollView>
        implements ReactScrollViewCommandHelper.ScrollCommandHandler<MNestedScrollView>
{
    private static final String NAME = "MaoKitsNestedScrollViewAndroid";

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public MNestedScrollView createViewInstance(ThemedReactContext context) {
        MNestedScrollView view = new MNestedScrollView(context);
        view.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        return view;
    }

    @Override
    public @Nullable
    Map<String, Integer> getCommandsMap() {
        return ReactScrollViewCommandHelper.getCommandsMap();
    }

    @Override
    public void receiveCommand(
            MNestedScrollView view,
            int commandId, @Nullable ReadableArray args
    ) {
        ReactScrollViewCommandHelper.receiveCommand(this, view, commandId, args);
    }

    @Override
    public void scrollTo(
            MNestedScrollView view,
            ReactScrollViewCommandHelper.ScrollToCommandData data
    ) {
        int x = data.mDestX;
        int y = data.mDestY;

        if (data.mAnimated) {
            view.smoothScrollTo(x, y);
        } else {
            view.scrollTo(x, y);
        }
    }

    @Override
    public void scrollToEnd(
            MNestedScrollView view,
            ReactScrollViewCommandHelper.ScrollToEndCommandData data
    ) {
        Console.log("motherfuck");
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
    public void setShowVerticalScrollIndicator(MNestedScrollView view, boolean value) {
        view.setVerticalScrollBarEnabled(value);
    }

    @ReactProp(name = ReactClippingViewGroupHelper.PROP_REMOVE_CLIPPED_SUBVIEWS)
    public void setRemoveClippedSubviews(MNestedScrollView view, boolean removeClippedSubviews) {
        view.setRemoveClippedSubviews(removeClippedSubviews);
    }
}
