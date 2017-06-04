var admin = require("firebase-admin");
let _ = require('lodash')
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
      if (listOfBidder[i].User.fcmRegistrationToken != null) {
        registrationToken.push(listOfBidder[i].User.fcmRegistrationToken)
      }
    }

    // See the "Defining the message payload" section above for details
    // on how to define a message payload.
    var payload = {
      notification: {
        title: "Ada yang nge-bid lebih tinggi dari kamu!",
        body: "Gawat! " + _.truncate(highestBidDetail.Auction.title, {
            length: 20,
            separator: ' '
          }) + " di bid lebih tinggi!"
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
  },
  sendPNToWinner: (user, auction) => {
    let registrationToken = user.fcmRegistrationToken
    var payload = {
      notification: {
        title: "Selamat km menang lelang " + auction.title,
        body: "Checkout " + _.truncate(auction.title, {
            length: 25,
            separator: ' '
          }) + " sekarang juga!"
      },
      data: {
        slug: auction.slug
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

function titleTrimmer(title) {

}
