/**
 * @author Kinga Mrugala (C)2012, Intergraph Poland
 *
 */

package uk.co.robohome;

import java.util.List;

import android.os.Bundle;
import android.preference.EditTextPreference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceFragment;
import android.text.InputType;

public class SettingsActivity extends PreferenceActivity {
    @Override
    public void onBuildHeaders(List<Header> target) {
        loadHeadersFromResource(R.xml.prefsheaders, target);
    }
}