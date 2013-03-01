#include <MyServer.h>
#include <WiFi.h>

WiFiServer server(80);

int ip[] = {192,168,0,101};

MyServer myServer("comp2007group7", "michaelb", ip, 9090);

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
  myServer.postToServer(1);
  WiFiClient client = server.available();
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        
        char c = myServer.readClient(client);
        int nSegments = myServer.countSegments();
        char **pathsegments = myServer.parse();

        if (c == '\n' && nSegments > 0) {
          handleCommand(client, pathsegments[0]);
          while(client.available()) {
            c = client.read();
          }
          break;     
        }
      }
    }
    delay(1);
    client.stop();
    Serial.println("Client disonnected");
  }
}


