/*
  MyServer.h - Library for setting up a server and parsing RESTful commands
  Created by Kinga Mrugala, February 2013
  Based on: http://www.jotschi.de/Technik/2012/04/21/arduino-ethernet-shield-simple-rest-api-example.html
  and: http://arduino.cc/en/Tutorial/WiFiWebServer
*/

#include <WiFi.h>
#include "Arduino.h"

class MyServer
{
public:
    MyServer(char* name, char* password, int* _ip, int port);
    void setupWifi();
    void printWifiStatus();
    void send404(WiFiClient client);
    void sendStatus(WiFiClient client, char* json);
    char** parse();
    int countSegments();
    char readClient(WiFiClient client);
    int postToServer(int);
private:
    char* ssid;   
    char* pass;
    int* ip;  
    int port;
    int keyIndex;                
    char cmd[15];
    char param1[15];
    boolean systemArmed;
    char buffer[128];
    int status;
    int STRING_BUFFER_SIZE;
};