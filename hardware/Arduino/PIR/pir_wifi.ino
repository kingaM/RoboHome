#include <MyServer.h>
#include <WiFi.h>

WiFiServer server(80);
MyServer myServer("comp2007group7", "michaelb");

long unsigned int lowIn;
long unsigned int pause = 5000;

int pirPin = 2;
int calibrationTime = 10;

boolean lockLow = true; 
boolean takeLowTime; 

void setup(){
  myServer.setupWifi();
  server.begin();
  myServer.printWifiStatus();
  
  Serial.print("Calibrating sensor ");
  for(int i=0; i < calibrationTime; i++){
    Serial.print(".");
    delay(1000);
  }
  
  Serial.println(" done");
  Serial.println("Sensor Active");
  delay(50);
  
  pinMode(pirPin, INPUT);
  digitalWrite(pirPin, LOW);
}

void loop(){
  listenToRequest();
  if(digitalRead(pirPin) == HIGH){
    if(lockLow){
      lockLow = false; 
      Serial.println("motion detected at ");
      Serial.print(millis()/1000);
      Serial.println(" sec");
      delay(50);
    }
    takeLowTime = true;

    if(digitalRead(pirPin) == LOW){
      if(takeLowTime){
        lowIn = millis();
        takeLowTime = false;
      }

      if(!lockLow && millis() - lowIn > pause){
        lockLow = true;
        Serial.print("motion ended at ");
        Serial.print((millis() - pause)/1000);
        Serial.println(" sec");
        delay(50);
      }  
    }
  }
}


void handleCommand(WiFiClient client, char* cmd) {
  if (strcmp(cmd, "state") == 0) {
    String json;
    if( digitalRead(pirPin) == HIGH)
      myServer.sendStatus(client, "{state: 1}");
    else
      myServer.sendStatus(client, "{state: 0}");
  } 
  else {
    myServer.send404(client);
  }  
}

void listenToRequest() {
  WiFiClient client = server.available();
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = myServer.readClient(client);
        int nSegments = myServer.countSegments();
        char **pathsegments = myServer.parse();

        if (nSegments > 0) {
          Serial.println(pathsegments[0]);
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







