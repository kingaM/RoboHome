package co.uk.robohome.voicerecognition;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.StrictMode;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends Activity implements OnClickListener {

	private TextView mText;
	private SpeechRecognizer sr;
	private static final String TAG = "MyStt3Activity";
	private static final String URL = "192.168.0.19";
	private static final String PORT = "9090";
	private HashMap<String, Room> rooms = new HashMap<String, Room>();

	// private ArrayList<Room> rooms = new ArrayList<Room>();

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Button speakButton = (Button) findViewById(R.id.btn_speak);
		mText = (TextView) findViewById(R.id.textView1);
		speakButton.setOnClickListener(this);
		GetRequestAsync a = new GetRequestAsync();
		a.execute(URL);
		sr = SpeechRecognizer.createSpeechRecognizer(this);
		sr.setRecognitionListener(new listener());
	}

	class listener implements RecognitionListener {
		public void onReadyForSpeech(Bundle params) {
			Log.d(TAG, "onReadyForSpeech");
		}

		public void onBeginningOfSpeech() {
			Log.d(TAG, "onBeginningOfSpeech");
		}

		public void onRmsChanged(float rmsdB) {
			// Log.d(TAG, "onRmsChanged");
		}

		public void onBufferReceived(byte[] buffer) {
			// Log.d(TAG, "onBufferReceived");
		}

		public void onEndOfSpeech() {
			Log.d(TAG, "onEndofSpeech");
		}

		public void onError(int error) {
			Log.d(TAG, "error " + error);
			mText.setText("error " + error);
		}

		public void onResults(Bundle results) {
			String str = new String();

			Log.d(TAG, "onResults " + results);
			ArrayList data = results
					.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
			data.add("lounge lounge door open");
			for (int i = 0; i < data.size(); i++) {
				int spaces = data.get(i).toString().length()
						- data.get(i).toString().replace(" ", "").length();

				Log.d(TAG, "parts:" + spaces);
				if (spaces >= 2) {
					String[] parts = data.get(i).toString().split(" ", 2);
					String roomName = parts[0];
					int index = parts[1].lastIndexOf(" ");
					String itemName = parts[1].substring(0, index);
					String action = parts[1].substring(index + 1);
					Log.d(TAG, "Room:" + roomName + " Item:" + itemName
							+ " Action:" + action);
					if (rooms.containsKey(roomName)) {
						if (rooms.get(roomName).inItems(itemName)) {
							String query = "http://" + URL + ":"
									+ PORT + "/version/0.1/rooms/"
									+ rooms.get(parts[0]).getId() + "/items/"
									+ rooms.get(roomName).getItemId(itemName) + "/" + action + "/";
							Log.d(TAG, query);
							new PostRequestAsync().execute(query);
						}
					}
				}
				str += data.get(i) + "\n";
			}
			mText.setText("results: " + str);

		}

		public void onPartialResults(Bundle partialResults) {
			Log.d(TAG, "onPartialResults");
		}

		public void onEvent(int eventType, Bundle params) {
			Log.d(TAG, "onEvent " + eventType);
		}
	}

	private class GetRequestAsync extends AsyncTask<String, String, String> {

		private static final String TAG = "ASYNC_TASK_GET";

		@Override
		protected String doInBackground(String... uri) {
			Log.d(TAG, "HTTP RESPONSE");
			HttpClient httpclient = new DefaultHttpClient();
			HttpGet httppost = new HttpGet("http://" + uri[0] + ":" + PORT
					+ "/version/0.1/state/");
			String json = null;
			try {
				HttpResponse response = httpclient.execute(httppost);
				Log.d(TAG, response.toString());
				HttpEntity resEntityGet = response.getEntity();
				if (resEntityGet != null) {
					json = EntityUtils.toString(resEntityGet);
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			return json;
		}

		@Override
		protected void onPostExecute(String json) {
			Log.d(TAG, "HTTP RESPONSE JSON");
			JSONObject jObject = null;
			rooms.clear();
			try {
				jObject = new JSONObject(json);
				JSONArray roomsJSON = ((JSONObject) jObject.get("content"))
						.getJSONArray("rooms");
				for (int i = 0; i < roomsJSON.length(); i++) {
					String roomName = roomsJSON.getJSONObject(i)
							.getString("name").toLowerCase();
					int roomId = roomsJSON.getJSONObject(i).getInt("id");
					Room room = new Room(roomId, roomName);
					JSONArray items = roomsJSON.getJSONObject(i).getJSONArray(
							"items");
					for (int j = 0; j < items.length(); j++) {
						String name = items.getJSONObject(j).getString("name");
						int id = items.getJSONObject(j).getInt("id");
						Item item = new Item(id, name);
						room.addItem(item);
					}
					rooms.put(roomName, room);
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
			Log.i("JSON", rooms.toString());
		}

	}
	
	private class PostRequestAsync extends AsyncTask<String, String, String> {

		private static final String TAG = "ASYNC_TASK_GET";

		@Override
		protected String doInBackground(String... uri) {
			HttpClient httpclient = new DefaultHttpClient();
			HttpPut httppost = new HttpPut(uri[0]);
			String json = null;
			try {
				Log.d(TAG, "HTTP POST");
				HttpResponse response = httpclient.execute(httppost);
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			return json;
		}

	}

	public void onClick(View v) {

		if (v.getId() == R.id.btn_speak) {
			Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
			intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
					RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
			intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE,
					"co.uk.robohome.voicerecognition");

			intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
			sr.startListening(intent);
		}
	}
}