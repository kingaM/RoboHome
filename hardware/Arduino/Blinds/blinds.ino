#include <WiFi.h>

#include <AFMotor.h>
#include <MyServer.h>


//Wifi Server
WiFiServer server(80);
MyServer myServer("name", "pass");

AF_DCMotor motor(3, MOTOR12_64KHZ); // create motor #2, 64KHz pwm

const int hallPin1 = 2;     // the number of the hall effect sensor pin
const int hallPin2 = 22;     // the number of the hall effect sensor pin
const int hallPin3 = 48;     // the number of the hall effect sensor pin

int hallState1 = 0;          // variable for reading the hall sensor status
int hallState2 = 0;          // variable for reading the hall sensor status
int hallState3 = 0;          // variable for reading the hall sensor status

void setup() {
  Serial.begin(9600);      // open the serial port at 9600 bps:
  
  myServer.setupWifi();   // Wifi
  server.begin();
  myServer.printWifiStatus();
  
  // initialize the hall effect sensor pin as an input:
  pinMode(hallPin1, INPUT);
  pinMode(hallPin2, INPUT);
  pinMode(hallPin3, INPUT);
  
  motor.setSpeed(200);     // set the speed to 200/255
}

void updateHallState(){
  hallState1 = digitalRead(hallPin1);
  hallState2 = digitalRead(hallPin2);
  hallState3 = digitalRead(hallPin3);
}

void getStatus1(){
  updateHallState();
  if (hallState1 == LOW) { 
    Serial.print("Open");
  } else if (hallState2 == LOW) {
    Serial.print("Middle");
  } else if (hallState3 == LOW) {
    Serial.print("Close");
  } else {
    Serial.print("Error");
  }
}

//Kinga
void getState(WiFiClient client) {
  if (hallState1 == 1) {
    myServer.sendStatus(client, "{state : 1}");
  } 
  else {
    myServer.sendStatus(client, "{state : 0}");
  }
}
////////

void openBlinds(){
  updateHallState();
  while(hallState3 == HIGH){
    motor.run(FORWARD);      // turn it on going forward
    updateHallState();
  }
  motor.run(RELEASE);
}

void closeBlinds(){
  updateHallState();
  while(hallState3 == HIGH){
    motor.run(FORWARD);      // turn it on going forward
    updateHallState();
  }
  motor.run(RELEASE);
}


/* Handles the RESTful command from the server
 * Args:
 * client -- WiFi client to send the respons to
 * cmd -- the RESTful command
 */
void handleCommand(WiFiClient client, char* cmd) {
  Serial.print("Input");
  if (strcmp(cmd, "state") == 0) {
    getState(client);
  } 
  else if (strcmp(cmd, "open") == 0) {
    openBlinds();
	  getState(client);
  }
  else if (strcmp(cmd, "close") == 0) {
    closeBlinds();
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

void loop(){
  // getStatus();
  // Serial.print("\n");
  //openBlinds();
  //delay(1000);
  listenToRequest();
  delay(1000);
}
