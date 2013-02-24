#include <WiFi.h>
#include "MyServer.h"
#include "Arduino.h"

MyServer::MyServer(char* name, char* password) {
  ssid = name;
  pass = password;
  status = WL_IDLE_STATUS;
  systemArmed = true;
  keyIndex = 0;
  STRING_BUFFER_SIZE = 128;
}

void MyServer::setupWifi() {
    Serial.begin(9600); 
    if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present"); 
    while(true);
  } 
  
  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:    
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  } 
}

void MyServer::printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void MyServer::send404(WiFiClient client) {
     client.println("HTTP/1.1 404 OK");
     client.println("Content-Type: text/html");
     client.println("Connnection: close");
     client.println();
}

void MyServer::sendStatus(WiFiClient client, char* json) {
 
   // Send a standard http response header
   client.println("HTTP/1.1 200 OK");
   client.println("Content-Type: application/json");
   client.println("Connnection: close");
   client.println();
   client.println(json);
}

/**
 * Parse the string and return an array which contains all path segments
 */
char** MyServer::parse() {

    char ** messages;
    messages = (char**)malloc(sizeof(char *));
    char *p;
    p = strtok(buffer, " ");
    unsigned int i = 0;
    while (p != NULL) {
      p = strtok(NULL, "/");
      char *sp;
      boolean last = false;
      sp = strchr(p, ' ');
      if (sp != NULL) {
            *sp++ = '\0';
        last = true;
      }
      messages[i] = p;
      i++;
      if (last) {
        break;
      }
      messages = (char**)realloc(messages, sizeof(char *) * i + 1);
    }

    messages[i] = '\0';
    return messages;
}


int MyServer::countSegments() {
  int p = 0;
  int count = 0;
  while (buffer[p] != '\0') {
    if (buffer[p] == '/') {
      count++;
    }
    p++;
  }
  // We don't want to count the / in 'HTTP/1.1'
  count--;
  return count;
}

char MyServer::readClient(WiFiClient client) {
  char c;
  int bufindex = 0; // reset buffer
  buffer[0] = client.read();
  buffer[1] = client.read();
  bufindex = 2;
  // Read the first line to determin the request page
  while (buffer[bufindex-2] != '\r' && buffer[bufindex-1] != '\n') { 
      // read full row and save it in buffer
      c = client.read();
      if (bufindex<STRING_BUFFER_SIZE) {
        buffer[bufindex] = c;
      }
      bufindex++;
  }
  // Clean buffer for next row
  bufindex = 0;
    return c;
}
