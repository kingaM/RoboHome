#include <AFMotor.h>

AF_Stepper motor(48, 2);

// constants won't change. They're used here to set pin numbers:
const int hallPin = 2;     // the number of the hall effect sensor pin
const int ledPin =  13;     // the number of the LED pin
// variables will change:
int hallState = 0;          // variable for reading the hall sensor status

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);      
  // initialize the hall effect sensor pin as an input:
  pinMode(hallPin, INPUT);
  motor.setSpeed(100);
}

void loop(){
  // read the state of the hall effect sensor:
  hallState = digitalRead(hallPin);

  if (hallState == LOW) {     
    // turn LED on:    
    digitalWrite(ledPin, HIGH);
    motor.step(100, FORWARD, DOUBLE); 
  } 
  else {
    // turn LED off:
    digitalWrite(ledPin, LOW); 
  }
}
