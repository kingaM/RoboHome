#include <MyServer.h>
#include <WiFi.h>

WiFiServer server(80);
MyServer myServer("virginmedia6048706", "ehfekscx");
int reedOpenPin = 8;
int reedClosePin = 9;
boolean currentOpen = LOW;
boolean currentClose = LOW;
int openState = 1;
int closeState = 0;

void handleCommand(WiFiClient client, char* cmd) {
    if (strcmp(cmd, "status") == 0) {
      Serial.println(currentOpen);
      Serial.println(currentClose);
    } else {
      myServer.send404(client);
    }  
}

boolean debounce(boolean last, int pin)
{
  boolean current = digitalRead(pin);
  if (last != current)
  {
    delay(5);
    current = digitalRead(pin);
  }
  return current;
}

void setup() {
  myServer.setupWifi();
  server.begin();
  myServer.printWifiStatus();
  pinMode(reedOpenPin, INPUT);
  pinMode(reedClosePin, INPUT);
}

void respondToRequest() {
  
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

void loop() {
  respondToRequest();
  currentOpen = debounce(lastOpen, reedOpenPin);
  currentClose = debounce(lastClose, reedClosePin);
  if (currentOpen == LOW) {
    openState = 0;
  } else {
     openState = 1;
  }
  
  if (currentClose == LOW) {
    closeState = 0;
  } else {
     closeState = 1;
  }
}


