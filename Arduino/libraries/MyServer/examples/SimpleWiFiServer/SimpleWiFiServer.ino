#include <MyServer.h>
#include <WiFi.h>

WiFiServer server(80);

MyServer myServer("name", "pass");

void handleCommand(WiFiClient client, char* cmd) {
    if (strcmp(cmd, "status") == 0) {
      Serial.println("status");
      myServer.sendStatus(client, "{}");
    } else if (strcmp(cmd, "arm") == 0) {
      Serial.println("arm");
    } else if (strcmp(cmd, "disarm") == 0) {
      Serial.println("disarm");
    } else {
      myServer.send404(client);
    }  
}

void setup() {
  myServer.setupWifi();
  server.begin();
  myServer.printWifiStatus();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        
        char c = myServer.readClient(client);
        int nSegments = myServer.countSegments();
        char **pathsegments = myServer.parse();

        if (c == '\n' && currentLineIsBlank) {
          handleCommand(client, pathsegments[0]);     
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();
    Serial.println("Client disonnected");
  }
}


