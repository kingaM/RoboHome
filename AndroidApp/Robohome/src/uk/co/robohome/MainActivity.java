package uk.co.robohome;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.webkit.WebView;

public class MainActivity extends Activity {

	private String url;
	private WebView webView;
	private SharedPreferences prefs;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity_main);

		prefs = PreferenceManager.getDefaultSharedPreferences(this);
		url = prefs.getString("web", getString(R.string.url));

		webView = (WebView) findViewById(R.id.webView);
		webView.setBackgroundColor(Color.TRANSPARENT);
		webView.getSettings().setLightTouchEnabled(true);
		webView.getSettings().setBuiltInZoomControls(true);
		webView.loadUrl(url);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.optionsmenu, menu);
		return true; 
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.reload:
			url = prefs.getString("weburl", getString(R.string.url));
			webView.loadUrl(url);
			break;
		case R.id.itemPrefs:
			startActivityForResult(new Intent(this,	SettingsActivity.class), 0);
			webView.loadUrl(url);
			break;
		}
		return true;
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	protected void onPause() {
		super.onPause();
	}
}
