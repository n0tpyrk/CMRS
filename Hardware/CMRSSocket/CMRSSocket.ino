/***Hardware - C - CMRSScoket.ino***/
#include <PubSubClient.h>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>

// WiFi config
const char* ssid = "WiFi-SSID";
const char* password = "password";

// the topic path on the server
char* topic = (char*)"device/control";
char* topicPublish = (char*)"device/sensor";

// IoT broker server
const char *server = "soldier.cloudmqtt.com";

WiFiClient wifiClient;
PubSubClient client(wifiClient);
char message_buff[100];

// a callback function to interprete server messages
void callback(char *topic_w, byte *payload_w, unsigned int length_w){
  int i = 0;
  for(i=0; i<length_w; i++) {
    message_buff[i] = payload_w[i];
  }
  message_buff[i] = '\0';
  String msgString = String(message_buff);
  Serial.println("Payload: " + msgString);
  
  // power switch control for 6 sockets
  // socket - pin
  //      1 - 15
  //      2 - 13
  //      3 - 12
  //      4 - 14
  //      5 - 16
  //      6 - 10
  if(msgString == "dev1-on"){
    Serial.println("Device 1 on");
    digitalWrite(15, LOW);
  } else if(msgString == "dev1-off"){
    Serial.println("Device 1 off");
    digitalWrite(15, HIGH);    
  } else if(msgString == "dev2-on"){
    Serial.println("Device 2 on");
    digitalWrite(13, LOW);
  } else if(msgString == "dev2-off"){
    Serial.println("Device 2 off");    
    digitalWrite(13, HIGH);
  }else if(msgString == "dev3-on"){
    Serial.println("Device 3 on");
    digitalWrite(12, LOW);
  } else if(msgString == "dev3-off"){
    Serial.println("Device 3 off");    
    digitalWrite(12, HIGH);
  }else if(msgString == "dev4-on"){
    Serial.println("Device 4 on");
    digitalWrite(14, LOW);
  } else if(msgString == "dev4-off"){
    Serial.println("Device 4 off");    
    digitalWrite(14, HIGH);
  }else if(msgString == "dev5-on"){
    Serial.println("Device 5 on");
    digitalWrite(16, LOW);
  } else if(msgString == "dev5-off"){
    Serial.println("Device 5 off");    
    digitalWrite(16, HIGH);
  } else if(msgString == "dev6-on"){
    Serial.println("Device 6 on");
    digitalWrite(10, LOW);
  } else if(msgString == "dev6-off"){
    Serial.println("Device 6 off");    
    digitalWrite(10, HIGH);
  }
}

void setup() {
  
  pinMode(0, OUTPUT);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  delay(100);

  // connect to WiFi
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  // for the port number, please refer to the Cloud MQTT settings
  client.setServer(server, 16891); 
  client.setCallback(callback);
  
  Serial.print(ssid);
  Serial.println(" connected!");

  // Cloud MQTT credential
  char* clientID = "cmrs-esp8266";
  char* username = "username";
  char* password = "password";
  Serial.print("Connecting to ");
  Serial.print(server);
  Serial.print(" as ");
  Serial.println(clientID);

  // connect to the IoT broker server
  if (client.connect(clientID,username,password)) {
    Serial.println("Connected to MQTT broker");
    Serial.print("Topic is: ");
    Serial.println(topic);
    if (client.subscribe(topic)){
      Serial.println("Successfully subscribed");
    }
  }
  else {
    Serial.println("MQTT connect failed");
    Serial.println("Will reset and try again...");
    abort();
  }
}

void loop() {
  client.loop();
}



/*** References ***/
// https://github.com/vynci/esp8266-relay
// https://github.com/knolleary/pubsubclient