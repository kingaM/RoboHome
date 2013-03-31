package co.uk.robohome.voicerecognition;

import java.io.IOException;
import java.util.HashMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.AsyncTask;
import android.util.Log;

public class GetRequestAsync extends AsyncTask<String, String, String> {
	
	private HashMap<String, Room> rooms = new HashMap<String, Room>();
	
	private static final String TAG = "ASYNC_TASK_GET";

	    @Override
	    protected String doInBackground(String... uri) {
	        HttpClient httpclient = new DefaultHttpClient();
        	HttpGet httppost = new HttpGet("http://" + uri[0] + ":9090" + "/version/0.1/state/");
        	String json = null;
        	try {
				HttpResponse response = httpclient.execute(httppost);
				Log.d(TAG, "HTTP RESPONSE");
				Log.d(TAG, response.toString());
				HttpEntity resEntityGet = response.getEntity();  
			    if (resEntityGet != null) {  
			        // do something with the response
			        json = EntityUtils.toString(resEntityGet);
			        Log.i("GET RESPONSE", json);
			    }
			} catch (ClientProtocolException e) {
				//Log.d(TAG, "HTTP RESPONSE CLIENT");
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				//Log.d(TAG, "HTTP RESPONSE IO");
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	
        	return json;
        }

	    @Override
	    protected void onPostExecute(String json) {
	        super.onPostExecute(json);
	        JSONObject jObject = null;
			try {
				jObject = new JSONObject(json);
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
        	String s = "nothing";
			try {
				JSONArray roomsJSON = ((JSONObject) jObject.get("content")).getJSONArray("rooms");
						for(int i = 0; i < roomsJSON.length(); i++) {
							String roomName =  roomsJSON.getJSONObject(i).getString("name");
							int roomId =  roomsJSON.getJSONObject(i).getInt("id");
							Room room = new Room(roomId, roomName);
							JSONArray items = roomsJSON.getJSONObject(i).getJSONArray("items"); 
							for(int j = 0; j < items.length(); i++) {
								String name =  items.getJSONObject(j).getString("name");
								int id = items.getJSONObject(j).getInt("id");
								Item item = new Item(id, name);
								room.addItem(item);
							}
						rooms.put(roomName, room);
						}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	 Log.i("JSON", rooms.toString());
	    }


}
