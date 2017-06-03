var admin = require("firebase-admin");
require('dotenv').config()

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FCM_URL
});

module.exports = {
  sendPushNotificationToUserAfterBidLose: (listOfBidder, highestBidDetail) => {

    console.log('list of bidder : ', listOfBidder);
    // This registration token comes from the client FCM SDKs.
    var registrationToken = "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...";

    // See the "Defining the message payload" section above for details
    // on how to define a message payload.
    var payload = {
      notification: {
        title: "Ada yang nge-bid lebih tinggi dari kamu!",
        body: "Ayo bid lebih tinggi lagi!"
      }
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };

    // Send a message to the device corresponding to the provided
    // registration token with the provided options.
    admin.messaging().sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
    });
  }
}
