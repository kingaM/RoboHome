#include <MyServer.h>
#include <WiFi.h>

WiFiServer server(80);
MyServer myServer("name", "pass");
int reedOpenPin = 5;
int reedClosePin = 6;
boolean currentOpen = LOW;
boolean currentClose = LOW;
boolean motionDetected = false;
boolean newMotion = false;

int calibrationTime = 30;        
long unsigned int lowIn;         
long unsigned int pause = 3000;  

boolean lockLow = true;
boolean takeLowTime = true;  
boolean takeHighTime = true;  

int pir1Pin = 2;
int pir2Pin = 3;

/* Sends state back to the server, depending on the readings
 * Args:
 * client -- WiFi client to send the respons to
 */
void getState(WiFiClient client) {
  if (currentOpen == 1 && currentClose == 0) {
    myServer.sendStatus(client, "{state : 1}");
  } 
  else {
    myServer.sendStatus(client, "{state : 0}");
  }
}

/* Helper function to reduce the inaccuracies in readings
 * Args:
 * pin -- the pin number
 */
boolean debounce(int pin)
{
  boolean current = digitalRead(pin);
  delay(5);
  current = digitalRead(pin);
  return current;
}

/* A stub method for opening the door, not implemented yet
 */
void openDoor() {
  /*while(currentOpen!=1) {
   motor.run();
   currentOpen = debounce(reedOpenPin);
   } */
}

/* A stub method for closing the door, not implemented yet
 */
void closeDoor() {
  /*while(currentClose!=1) {
   motor.run();
   currentClose = debounce(reedOpenPin);
   } */
}

/* Handles the RESTful command from the server
 * Args:
 * client -- WiFi client to send the respons to
 * cmd -- the RESTful command
 */
void handleCommand(WiFiClient client, char* cmd) {
  if (strcmp(cmd, "state") == 0) {
    Serial.println(currentOpen);
    Serial.println(currentClose);
    getState(client);
  } 
  else if (strcmp(cmd, "open") == 0) {
    openDoor();
	  getState(client);
  }
  else if (strcmp(cmd, "close") == 0) {
    closeDoor();
	  getState(client);
  }
  else {
    myServer.send404(client);
  }  
}

/* Listenes for request from the server
 */
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

/* Checks if there is new motion detected on a given PIR
 * Args:
 * pirPin -- the pin number for the pir sensor to check
 */
int pir(int pirPin) {

  if(digitalRead(pirPin) == HIGH){
    if(lockLow){  
      lockLow = false;
      newMotion = true;      
      motionDetected = true;
      delay(50);
    }         
    takeLowTime = true;
  }

  if(digitalRead(pirPin) == LOW){       
    if(takeLowTime){
      lowIn = millis();       
      takeLowTime = false;
    }

    if(!lockLow && millis() - lowIn > pause){  
      lockLow = true;
      newMotion = true;     
      motionDetected = false;
      delay(50);
    }
  }
}

void setup() {
  myServer.setupWifi();
  server.begin();
  myServer.printWifiStatus();
  pinMode(reedOpenPin, INPUT);
  digitalWrite(reedOpenPin, LOW);
  pinMode(reedClosePin, INPUT);
  digitalWrite(reedClosePin, LOW);
  pinMode(pir1Pin, INPUT);
  digitalWrite(pir1Pin, LOW);
  pinMode(pir2Pin, INPUT);
  digitalWrite(pir2Pin, LOW);
  Serial.print("calibrating sensor ");
  for(int i = 0; i < calibrationTime; i++){
    Serial.print(".");
    delay(1000);
  }
  Serial.println(" done");
  delay(50);
}

void loop() {
  listenToRequest();
  currentOpen = debounce(reedOpenPin);
  currentClose = debounce(reedClosePin);
  if (currentOpen == 1 && currentClose == 0) {
    Serial.println("{state : 1}");
  } 
  else {
    Serial.println("{state : 0}");
  }
  pir(pir1Pin);
  pir(pir2Pin);
  Serial.print("Motion Detected: ");
  Serial.println(motionDetected);
  if(newMotion && motionDetected) {
    Serial.println("NEW MOTION DETECTED"); 
    //Stub for future motor integration
    //openDoor();
    //delay(100000);
    //closeDoor();
  }
  newMotion = false;
  delay(1000);
}

