package com.maornandroidkit;


import android.content.Context;

import com.facebook.react.uimanager.PixelUtil;

public class Utils {

    public static int dp2px(double dp) {
        return Math.round(PixelUtil.toPixelFromDIP(dp));
    }

    public static int px2sp(double sp) {
        return Math.round(PixelUtil.toPixelFromSP(sp));
    }
}
