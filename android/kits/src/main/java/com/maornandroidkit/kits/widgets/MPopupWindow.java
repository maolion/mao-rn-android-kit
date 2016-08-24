package com.maornandroidkit.kits.widgets;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.maornandroidkit.kits.Console;
import com.maornandroidkit.kits.Utils;


public class MPopupWindow extends LinearLayout {
    private LinearLayout popView;

    private PopupWindow pop;

    public MPopupWindow(Context context) {
        super(context);

        this.popView = new LinearLayout(context);
        this.popView.setOrientation(LinearLayout.VERTICAL);
        this.pop = new PopupWindow(context);
        ColorDrawable dw = new ColorDrawable(Color.TRANSPARENT);

        this.pop.setBackgroundDrawable(dw);
        this.pop.setContentView(this.popView);
        this.pop.setHeight(WindowManager.LayoutParams.WRAP_CONTENT);
        this.pop.setWidth(WindowManager.LayoutParams.WRAP_CONTENT);

        this.popView.setLayoutParams( new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ) );

        this.pop.setFocusable(true);
        this.pop.setOutsideTouchable(true);
        this.pop.dismiss();
        Console.log("Fuck");
    }

    public void showPopAsDropdown(int viewId, int x, int y) {
        View anchor = this.getRootView().findViewById(viewId);
        if (anchor == null) {
            this.showPopAsLocation(Gravity.START, x, y);
            return;
        }
        Console.log("show dropdown" + this.popView.getChildCount());
        this.resize(x, y);
        this.pop.showAsDropDown(anchor);
    }

    public void showPopAsLocation(int gravity, int x, int y) {
        Console.log("show location" + this.popView.getChildCount());
        this.resize(x, y);
        this.pop.showAtLocation(
                this.getRootView(),
                gravity,
                Utils.dpToPx(x),
                Utils.dpToPx(y)
        );
    }

    public void hide() {
        this.pop.dismiss();
    }

    private void resize(int x, int y) {
        this.pop.update(
                Utils.dpToPx(x),
                Utils.dpToPx(y),
                this.popView.getChildAt(0).getWidth(),
                this.popView.getChildAt(0).getHeight()
        );
    }

    @Override
    public void setFocusable(boolean focusable) {
        this.pop.setFocusable(focusable);
    }

    public void setOutsideTouchable(boolean touchable) {
        this.pop.setOutsideTouchable(touchable);
    }

    public void setTouchable(boolean touchable) {
        this.pop.setTouchable(touchable);
    }

    @Override
    public void addView(View child, int index) {
        this.popView.addView(child, index);
        if (this.popView.getChildCount() > 1) {
            throw new JSApplicationIllegalArgumentException(
                    "onlyChild must be passed a children with exactly one child"
            );
        }
    }

    @Override
    public int getChildCount() {
        return this.popView.getChildCount();
    }

    @Override
    public View getChildAt(int index) {
        return this.popView.getChildAt(index);
    }

    @Override
    public void removeViewAt( int index) {
        this.popView.removeViewAt(index);
    }
}
