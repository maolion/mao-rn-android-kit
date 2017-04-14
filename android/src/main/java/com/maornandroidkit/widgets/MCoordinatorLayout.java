package com.maornandroidkit.widgets;


import android.content.Context;
import android.support.annotation.NonNull;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

public class MCoordinatorLayout extends CoordinatorLayout {
  private final static int RESET_BEHOVIOR_Y_POS = -10000000;
  private boolean mNestedScrollEnabled = true;
  private AppBarLayout.Behavior.DragCallback mBehaviorDragCallback;

  public MCoordinatorLayout(Context context) {
    super(context);
  }

  public MCoordinatorLayout(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public void setScrollingViewBehavior(View view) {
    try {
      CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) view.getLayoutParams();
      params.setBehavior(new AppBarLayout.ScrollingViewBehavior());
      view.requestLayout();
    } catch (Exception e) {
      //TODO: handle exception
    }
  }

  public void resetBehavior(AppBarLayout appbar, boolean nestedScrollEnabled, boolean smoothly) {
    CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) appbar.getLayoutParams();
    AppBarLayout.Behavior behavior = (AppBarLayout.Behavior) params.getBehavior();

    if (behavior == null) {
      return;
    }

    if (!smoothly) {
      int[] consumed = new int[2];
      behavior.onNestedPreScroll(this, appbar, null, 0, RESET_BEHOVIOR_Y_POS, consumed);
    } else {
      behavior.onNestedFling(this, appbar, null, 0, RESET_BEHOVIOR_Y_POS, true);
    }

    mNestedScrollEnabled = nestedScrollEnabled;

    if (mBehaviorDragCallback == null) {
      mBehaviorDragCallback = new AppBarLayout.Behavior.DragCallback() {
        @Override
        public boolean canDrag(@NonNull AppBarLayout appBarLayout) {
          return mNestedScrollEnabled;
        }
      };
    }
    behavior.setDragCallback(mBehaviorDragCallback);
  }

  @Override
  public boolean onStartNestedScroll(View child, View target, int nestedScrollAxes) {
    return mNestedScrollEnabled && super.onStartNestedScroll(child, target, nestedScrollAxes);
  }

  public boolean isNestedScrollEnabled() {
    return mNestedScrollEnabled == true;
  }

}
