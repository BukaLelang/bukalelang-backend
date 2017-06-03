var admin = require("firebase-admin");
require('dotenv').config()

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FCM_URL
});

module.exports = {
  sendPushNotificationToUserAfterBidLose: (listOfBidder, highestBidDetail) => {

    // This registration token comes from the client FCM SDKs.
    var registrationToken = []

    let listOfBidderLength = listOfBidder.length
    for (var i = 0; i < listOfBidderLength; i++) {
      registrationToken.push(listOfBidder[i].User.fcmRegistrationToken)
    }

    // See the "Defining the message payload" section above for details
    // on how to define a message payload.
    var payload = {
      notification: {
        title: "Ada yang nge-bid lebih tinggi dari kamu!",
        body: "Ada yang nge-bid lebih tinggi dari kamu!"
      },
      data: {
        slug: highestBidDetail.Auction.slug
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
