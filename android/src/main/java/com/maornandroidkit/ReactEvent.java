package com.maornandroidkit;

import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;


public class ReactEvent extends Event<ReactEvent> {

    public static void emit(@NonNull View view, @NonNull int viewTag, @NonNull String eventName) {
        emit(view, viewTag, eventName);
    }

    public static void emit(@NonNull View view, @NonNull String eventName) {
        emit(view, new ReactEvent(view.getId(), eventName));
    }

    public static void emit(@NonNull View view, @NonNull Event event) {
        ReactContext reactContext = (ReactContext) view.getContext();

        event.dispatch(reactContext.getJSModule(RCTEventEmitter.class));
    }

    private String mEventName;
    public ReactEvent(int viewTag, String eventName) {
        super();
        mEventName = eventName;
        super.init(viewTag);
    }

    @Override
    public String getEventName() {
        return mEventName;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    protected WritableMap serializeEventData() {
        WritableMap event = Arguments.createMap();
        return event;
    }
}