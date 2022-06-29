# CMRS Hardware
The hardware used for CMRS is the ESP8266-based IoT socket. 6 IoT sockets are needed as there are 6 coffee machines at the coffee school venue. Each IoT socket is made of an ESP8266 Arduino board, a relay, and a suitable socket for the coffee machine plug. The ESP8266 board is connected to the Wi-Fi at the venue, thus it can connect to the CMRS database and MQTT server. The relay is between the ESP8266 board and the socket's live wire, which allows the coffee machines to be controlled through the app by the users.

## Arduino Dependencies
### Boards
- esp8266 (by ESP8266 Community version 2.5.2)   
 
To add the boards, open Tools -> Board:"Some Arduino Board" -> Boards Manager. Then search esp8266, and install.

### Libraries
- PubSubClient (by Nick O'Leary Version 2.8.0)

To add the library, open Tools -> Manage Libraries. Then search PubSubClient, and install.   
If it cannot be found in the Library Manager, please download it form this repository or from [knolleary/pubsubclient](https://github.com/knolleary/pubsubclient).   
To import zip Arduino libraries, please refer to this guide [Installing Libraries](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries).
