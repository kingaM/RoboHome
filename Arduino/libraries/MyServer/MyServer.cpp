/*
  MyServer.cpp - Library for setting up a server and parsing RESTful commands
  Created by Kinga Mrugala, February 2013
  Based on: http://www.jotschi.de/Technik/2012/04/21/arduino-ethernet-shield-simple-rest-api-example.html
  and: http://arduino.cc/en/Tutorial/WiFiWebServer
*/

#include <WiFi.h>
#include "MyServer.h"
#include "Arduino.h"

/**
  * Creates an instance of MyServer object 
  * Args:
  * name -- name of the network to connect to
  * password -- password of the network
  */
MyServer::MyServer(char* name, char* password) {
  ssid = name;
  pass = password;
  status = WL_IDLE_STATUS;
  systemArmed = true;
  keyIndex = 0;
  STRING_BUFFER_SIZE = 128;
}

/**
  * Sets up the WiFi 
  */
void MyServer::setupWifi() {
    Serial.begin(9600); 
    if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present"); 
    while(true);
  } 
  
  while ( status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  } 
}


/**
  * Prints the SSID, IP and RSSI of the WiFi
  */
void MyServer::printWifiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

/**
  * Sends a 404 respons to the WiFi Client
  * Args:
  * client -- the WiFi Client to send the data to
  */
void MyServer::send404(WiFiClient client) {
     client.println("HTTP/1.1 404 OK");
     client.println("Content-Type: text/html");
     client.println("Connnection: close");
     client.println();
}

/**
  * Sends status to the WiFi Client, with a 200 Header
  * Args:
  * client -- the WiFi Client to send the data to
  * json -- the JSON object to send back to the client
  */
void MyServer::sendStatus(WiFiClient client, char* json) {
 
   client.println("HTTP/1.1 200 OK");
   client.println("Content-Type: application/json");
   client.println("Connnection: close");
   client.println();
   client.println(json);
}

/**
 * Parse the buffer and return an array which contains all path segments
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

/**
 * Count the elements in the buffer and return the number of elements
 */
int MyServer::countSegments() {
  int p = 0;
  int count = 0;
  while (buffer[p] != '\0') {
    if (buffer[p] == '/') {
      count++;
    }
    p++;
  }
  count--;
  return count;
}

/**
  * Reads the request from a client and stores it in a buffer
  * Args:
  * client -- the WiFi Client to send the data to
  * Returns the last character from the buffer
  */
char MyServer::readClient(WiFiClient client) {
  char c;
  int bufindex = 0; 
  buffer[0] = client.read();
  buffer[1] = client.read();
  bufindex = 2;
  while (buffer[bufindex-2] != '\r' && buffer[bufindex-1] != '\n') { 
      c = client.read();
      if (bufindex<STRING_BUFFER_SIZE) {
        buffer[bufindex] = c;
      }
      bufindex++;
  }
  bufindex = 0;
  buffer = (char**)realloc(buffer, sizeof(char *) * STRING_BUFFER_SIZE + 1);
  return c;
}
