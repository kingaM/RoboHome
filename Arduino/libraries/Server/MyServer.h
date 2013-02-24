#include <WiFi.h>
#include "Arduino.h"

class MyServer
{
public:
    MyServer(char* name, char* password);
    void setupWifi();
    void printWifiStatus();
    void send404(WiFiClient client);
    void sendStatus(WiFiClient client, char* json);
    char** parse();
    int countSegments();
    char readClient(WiFiClient client);
private:
    char* ssid;     //  your network SSID (name) 
    char* pass;  // your network password
    int keyIndex;                 // your network key Index number (needed only for WEP)
    char cmd[15];
    char param1[15];
    boolean systemArmed;
    char buffer[128];
    int status;
    int STRING_BUFFER_SIZE;
};