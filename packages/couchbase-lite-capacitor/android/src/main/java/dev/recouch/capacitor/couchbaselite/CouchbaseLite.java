package dev.recouch.capacitor.couchbaselite;

import android.util.Log;

public class CouchbaseLite {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
