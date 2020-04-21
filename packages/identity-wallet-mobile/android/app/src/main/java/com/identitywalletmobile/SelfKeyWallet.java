package com.identitywalletmobile;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import org.matomo.sdk.*;

public class SelfKeyWallet extends ReactContextBaseJavaModule  {
    private static String userId = "123";
    public SelfKeyWallet(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getUserId(
        Callback successCallback) {

        // https://github.com/BonifyByForteil/react-native-matomo/blob/master/android/src/main/java/de/bonify/reactnativematomo/MatomoModule.java
        // Tracker tracker = TrackerBuilder.createDefault("http://domain.tld/matomo.php", 1).build(Matomo.getInstance());


        // Instantiate the RequestQueue.

        successCallback.invoke(null, userId);
    }

    @Override
    public String getName() {
        return "SelfKeyWallet";
    }

}