package com.maornandroidkit.managers;

import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.PopupWindow;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.PointerEvents;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;
import com.maornandroidkit.Console;
import com.maornandroidkit.widgets.MPopupWindow;

import java.util.Locale;
import java.util.Map;

public class PopupWindowManager extends ViewGroupManager<MPopupWindow> {
    public static final String NAME = "MaoKitsPopupWindowAndroid";

    public static final int COMMAND_SHOW_POPUP_AS_DROPDOWN = 1;
    public static final int COMMAND_SHOW_POPUP_AS_LOCATION = 2;
    public static final int COMMAND_HIDE_POPUP = 3;

    public String getName() {
        return PopupWindowManager.NAME;
    }
    @Override
    public MPopupWindow createViewInstance(ThemedReactContext context) {

        return new MPopupWindow(context);
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "showPopupAsDropdown",
                PopupWindowManager.COMMAND_SHOW_POPUP_AS_DROPDOWN,
                "showPopupAsLocation",
                PopupWindowManager.COMMAND_SHOW_POPUP_AS_LOCATION,
                "hidePopup",
                PopupWindowManager.COMMAND_HIDE_POPUP
        );
    }

    @Override
    public void receiveCommand(MPopupWindow view, int commandType, @Nullable ReadableArray args) {

        switch (commandType) {
            case PopupWindowManager.COMMAND_SHOW_POPUP_AS_DROPDOWN:
                view.showPopAsDropdown(
                        args.getInt(0),
                        args.getInt(1),
                        args.getInt(2)
                );
                break;

            case PopupWindowManager.COMMAND_SHOW_POPUP_AS_LOCATION:
                view.showPopAsLocation(
                        args.getInt(0),
                        args.getInt(1),
                        args.getInt(2)
                );
                break;
            case PopupWindowManager.COMMAND_HIDE_POPUP:
                view.hide();
                break;
            default:
                throw new JSApplicationIllegalArgumentException(String.format(
                        "Unsupported commadn %d received by $s",
                        commandType,
                        this.getClass().getSimpleName()
                ));
        }
    }

    @ReactProp(name = "focusable")
    public void setFocusable(MPopupWindow view, boolean focusable) {
        view.setFocusable(focusable);
    }

    @ReactProp(name = "outsideTouchable")
    public void setOutsideTouchable(MPopupWindow view, boolean touchable) {
        view.setOutsideTouchable(touchable);
    }

    @ReactProp(name = "touchable")
    public void setTouchable(MPopupWindow view, boolean touchable) {
        view.setTouchable(touchable);
    }

    @ReactProp(name = "hitSlop")
    public void setHitSlop(final ReactViewGroup view, @Nullable ReadableMap hitSlop) {
        if (hitSlop == null) {
            view.setHitSlopRect(null);
        } else {
            view.setHitSlopRect(new Rect(
                    (int) PixelUtil.toPixelFromDIP(hitSlop.getDouble("left")),
                    (int) PixelUtil.toPixelFromDIP(hitSlop.getDouble("top")),
                    (int) PixelUtil.toPixelFromDIP(hitSlop.getDouble("right")),
                    (int) PixelUtil.toPixelFromDIP(hitSlop.getDouble("bottom"))
            ));
        }
    }
}
