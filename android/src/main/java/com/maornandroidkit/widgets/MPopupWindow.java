package com.maornandroidkit.widgets;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;

import com.facebook.common.logging.FLog;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.touch.OnInterceptTouchEventListener;
import com.facebook.react.uimanager.JSTouchDispatcher;
import com.facebook.react.uimanager.RootView;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.views.view.ReactViewGroup;
import com.maornandroidkit.Console;
import com.maornandroidkit.Utils;

import java.util.ArrayList;

class PopupWindowContentView extends ReactViewGroup implements RootView {
    public PopupWindowContentView(Context context) {
        super(context);
    }

    @Override
    public void onChildStartedNativeGesture(MotionEvent event) {

    }
}

public class MPopupWindow extends ReactViewGroup {

    private PopupWindowContentView mPopupWindowContentView;
    private PopupWindow mPopupWindow;
    private ReactContext mReactContext;
    private JSTouchDispatcher mJSTouchDispatcher;
    private boolean mPopupWindowContentViewInited;

    public MPopupWindow(Context context) {
        super(context);
        mReactContext = (ReactContext) context;

        mPopupWindowContentView = new PopupWindowContentView(context);
        mPopupWindowContentView.setLayoutParams( new ReactViewGroup.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        // 因为 mPopupWindowContentView被设置成 PopupWindow的 contentView 之后 就不与当前 ReactRootView
        // 是同一棵元素的树节点上，所以这里需要在 触摸事件被触发的时候取 自己发送事件消息到前端的JS层上
        mPopupWindowContentView.setOnInterceptTouchEventListener(new OnInterceptTouchEventListener() {
            @Override
            public boolean onInterceptTouchEvent(ViewGroup v, MotionEvent event) {
                dispatchJSTouchEvent(event);
                return false;
            }
        });

        mJSTouchDispatcher = new JSTouchDispatcher(mPopupWindowContentView);

        mPopupWindow = new PopupWindow(context);
        ColorDrawable dw = new ColorDrawable(Color.TRANSPARENT);
        mPopupWindow.setBackgroundDrawable(dw);
        mPopupWindow.setContentView(mPopupWindowContentView);
        mPopupWindow.setHeight(WindowManager.LayoutParams.WRAP_CONTENT);
        mPopupWindow.setWidth(WindowManager.LayoutParams.WRAP_CONTENT);
        mPopupWindow.setFocusable(true);
        mPopupWindow.setOutsideTouchable(true);
        mPopupWindow.setTouchable(true);
        mPopupWindow.dismiss();
    }

    public void showPopAsDropdown(int viewId, int x, int y) {
        View anchor = this.getRootView().findViewById(viewId);

        this.initPopupWindowContentView();

        if (anchor == null) {
            this.showPopAsLocation(Gravity.START, x, y);
            return;
        }
        this.resize(x, y);
        mPopupWindow.showAsDropDown(anchor);
    }

    public void showPopAsLocation(int gravity, int x, int y) {
        this.initPopupWindowContentView();

        this.resize(x, y);
        this.mPopupWindow.showAtLocation(
                this.getRootView(),
                gravity,
                x,
                y
        );
    }

    public void hide() {
        this.mPopupWindow.dismiss();
    }

    private void resize(int x, int y) {
        this.mPopupWindow.update(
                x,
                y,
                mPopupWindowContentView.getChildAt(0).getWidth(),
                mPopupWindowContentView.getChildAt(0).getHeight()
        );
    }
    public void initPopupWindowContentView() {
        if (!mPopupWindowContentViewInited) {
            View view = this.getChildAt(0);
            if (view == null) {
                return;
            }
            this.removeView(view);

            mPopupWindowContentView.addView(view);
            mPopupWindowContentViewInited = true;
        }
    }

    @Override
    public void setFocusable(boolean focusable) {
        this.mPopupWindow.setFocusable(focusable);
    }

    public void setOutsideTouchable(boolean touchable) {
        mPopupWindow.setOutsideTouchable(touchable);
    }

    public void setTouchable(boolean touchable) {
        this.mPopupWindow.setTouchable(touchable);
    }

    private void dispatchJSTouchEvent(MotionEvent event) {
        EventDispatcher eventDispatcher = mReactContext.getNativeModule(UIManagerModule.class)
                .getEventDispatcher();
        mJSTouchDispatcher.handleTouchEvent(event, eventDispatcher);
    }

    @Override
    public void addView(View child, int index) {
        if (this.getChildCount() > 1) {
            throw new JSApplicationIllegalArgumentException(
                    "onlyChild must be passed a children with exactly one child"
            );
        }

        super.addView(child, index);
    }
}
