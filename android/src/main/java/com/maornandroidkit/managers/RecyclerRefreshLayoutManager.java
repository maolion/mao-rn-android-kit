package com.maornandroidkit.managers;


import com.dinuscxj.refresh.RecyclerRefreshLayout;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.maornandroidkit.widgets.MRecyclerRefreshLayout;

public class RecyclerRefreshLayoutManager extends ViewGroupManager<MRecyclerRefreshLayout> {
    public static final String NAME = "MaoKitsRecyclerRefreshLayout";

    public String getName() {
        return RecyclerRefreshLayoutManager.NAME;
    }

    public MRecyclerRefreshLayout createViewInstance(ThemedReactContext context) {
        MRecyclerRefreshLayout recyclerRefreshLayout = new MRecyclerRefreshLayout(context);
        
        return recyclerRefreshLayout;
    }

}
