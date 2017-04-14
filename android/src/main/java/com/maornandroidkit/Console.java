package com.maornandroidkit;

import android.util.Log;

public class Console {
  public static void log(String message) {
    Log.i("MaoRNAndroidKits.INFO", message);
  }

  public static void error(String message) {
    Log.e("MaoRNAndroidKits.ERROR", message);
  }

  public static void warn(String message) {
    Log.w("MaoRNAndroidKits.WARN", message);
  }
}

// 需要一个view用来做自定义视图接收器

