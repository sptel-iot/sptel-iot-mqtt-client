var mqtt = require("mqtt");
const fs = require("fs");
//CA certificate
var CA_File = fs.readFileSync("./secure/ca.pem");

//if using client certificates
var PRIVATE_KEY = fs.readFileSync("./secure/Sensor-device-001.key");
var CERT = fs.readFileSync("./secure/Sensor-device-001.crt");

var options = {
  rejectUnauthorized: false,
  //define your client certificates
  key: PRIVATE_KEY,
  cert: CERT,
  ca: CA_File,
};

//use the MQTT broker of your Instance
var client = mqtt.connect(
  "mqtt://dlc-mqtt-<YOUR-INSTANCE-ID>.iot.sptel.com.sg:8883",
  options
);

client.on("connect", function () {
  s;
  var date = new Date();

  // device_id and time is manadatory while publishing
  var data = JSON.stringify({
    device_id: "27f67d8c56ce73f2", // replace with device_id generated from IoT Portal
    time: date.toISOString(),
    data: "test_message", //Publish your payload here
  });

  // Publish all your data to "messages" topic

  client.publish("messages", data);
  console.log("message successfully published to SPTel IoT Platform via MQTT");
});
