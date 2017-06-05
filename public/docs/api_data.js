define({ "api": [
  {
    "type": "get",
    "url": "/auctions/:id",
    "title": "get auction by id",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of auction maker</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "auctions.small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>slug of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "time_left",
            "description": "<p>time left of the auction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load list of auctions',\n    id: 23,\n    productId: '31fsa21',\n    title: 'Tamiya super cepat',\n       images: [\n          \"https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg\",\n          \"https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg\",\n          \"https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg\",\n          \"https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg\",\n          \"https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg\"\n       ],\n       running: true,\n       small_images: [\n            \"https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg\",\n            \"https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg\",\n            \"https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg\",\n            \"https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg\",\n            \"https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg\"\n       ]\n    category: 'Mainan',\n      slug: 'tamiya-sto-100-8hdpi0',\n      name: 'Diky Arga',\n    new: false,\n    weight: 1000,\n    description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n    min_price: 200000,\n    max_price: 3000000,\n    current_price: 600000,\n    kelipatan_bid: 20000,\n    start_date: '2017-04-16T18:22:54.846+07:00',\n    end_date: '2017-05-16T18:22:54.846+07:00',\n      time_left: 423913828,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'Auction with id 3 doesnt exist',\n    id: null,\n    productId: null,\n    title: null,\n      images: [],\n      running: false,\n      small_images: [],\n    category: null,\n      slug: null,\n      name: null,\n    new: false,\n    weight: 0,\n    description: null,\n    min_price: 0,\n    max_price: 0,\n    current_price: 0,\n    kelipatan_bid: 0,\n    start_date: null,\n    end_date: null,\n      time_left: 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsId",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/bid-history",
    "title": "get bid history",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load list of bid history',\n      auction_detail: {\n        id: 3,\n        title: 'Tamiya tanpa gaya gravitasi',\n        bid_count: 2\n      },\n   bid_history: [\n           {\n             name_of_bidder: 'Diky Arga',\n             avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',\n             name_of_bidder: 'Diky Arga',\n             bid_nominal: 70000,\n             bidding_time: '2017-05-17T18:22:54.846+07:00'\n           },\n           {\n             name_of_bidder: 'Eri Selalu',\n             avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',\n             bid_nominal: 60000,\n             bidding_time: '2017-05-16T18:22:54.846+07:00'\n           }\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'Auction with id 3 doesnt exist',\n      auction_detail: {\n        id: null,\n        title: null,\n        bid_count: 0\n      },\n   bid_history: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdBidHistory",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/bid-history"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/checkout-information",
    "title": "get information detail for checkout the auction",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "auction",
            "description": "<p>List of auctions.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auction.title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "auction.images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "auction.small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.categorynNme",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.time_left",
            "description": "<p>time left of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auction.new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auction.name",
            "description": "<p>name of auction maker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auction.slug",
            "description": "<p>slug of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auction.description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auction.kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auction.start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auction.end_date",
            "description": "<p>date end of auction, default is one week</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "finalPrice",
            "description": "<p>is the final price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "winnerName",
            "description": "<p>winner name of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>List of addresses of user, select as first / default when primary true</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "shipping",
            "description": "<p>shipping available for this auction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'Success load checkout information detail',\n  \"auction\": {\n         id: 23,\n         productId: '31fsa21',\n         title: 'Tamiya sto 100 cepat',\n            images: [\n               \"https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg\",\n               \"https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg\",\n               \"https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg\",\n               \"https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg\",\n               \"https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ],\n            running: true,\n            small_images: [\n                 \"https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ],\n         categoryName: 'Mainan',\n            time_left: 423913828,\n            name: 'Diky Arga',\n            slug: 'tamiya-sto-100-8hdpi0'\n         new: false,\n         weight: 1000,\n         description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n         min_price: 200000,\n         max_price: 3000000,\n         current_price: 600000,\n         kelipatan_bid: 20000,\n         start_date: '2017-04-16T18:22:54.846+07:00',\n         end_date: '2017-05-16T18:22:54.846+07:00'\n       },\n       \"finalPrice\": 600000,\n       \"winnerName\": 'Lalala',\n       \"addresses\": [\n         {\n           \"id\": 345,\n           \"primary\": false,\n           \"title\": \"bukan utama1\",\n           \"name\": \"tetsdfsdf\",\n           \"phone\": \"085645262611\",\n           \"address_attributes\": {\n             \"id\": 499,\n             \"address\": \"bukan utama bali\",\n             \"area\": \"Abiansemal\",\n             \"city\": \"Badung\",\n             \"province\": \"Bali\",\n             \"post_code\": \"80352\"\n           }\n         },\n         {\n           \"id\": 346,\n           \"primary\": true,\n           \"title\": \"utama\",\n           \"name\": \"yunus\",\n           \"phone\": \"085645272715\",\n           \"address_attributes\": {\n             \"id\": 500,\n             \"address\": \"alamat utama\",\n             \"area\": \"Babakan Madang\",\n             \"city\": \"Kab. Bogor\",\n             \"province\": \"Jawa Barat\",\n             \"post_code\": \"16810\"\n           }\n         }\n       ],\n       \"shipping\": [\n               {\n                   \"courier_name\": \"jne\",\n                   \"couriers\": [\n                       {\n                           \"service\": \"JNE REG\",\n                           \"price\": 36000,\n                           \"eta\": \"2\"\n                       }\n                   ]\n               }\n       ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'Fail load checkout information detail',\n  \"auction\": {},\n      \"finalPrice\": null,\n      \"winnerName\": null,\n      \"addresses\": [],\n      \"shipping\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdCheckoutInformation",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/checkout-information"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/current-price",
    "title": "get current price of the auction by id",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "currentPrice",
            "description": "<p>the lastest updated current price of auction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   currentPrice: 150000,\n   message: 'Success load current price of auction',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   currentPrice: null,\n   message: 'Auction with id 3 doesnt exist',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdCurrentPrice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/current-price"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/time-left",
    "title": "get time left of the auction by id",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "time_left",
            "description": "<p>time left of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load time left of auction',\n      time_left: 111000,\n    end_date: '2017-05-16T18:22:54.846+07:00'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'Auction with id 3 doesnt exist',\n      time_left: null,\n    end_date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdTimeLeft",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/time-left"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions?limit=5&&page=2",
    "title": "get all auctions",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "page",
            "description": "<p>page of pagination</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>limit per page</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "auctions",
            "description": "<p>List of auctions.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "auctions.images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "auctions.small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.categorynNme",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.time_left",
            "description": "<p>time left of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auctions.new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.name",
            "description": "<p>name of auction maker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.slug",
            "description": "<p>slug of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'Success load list of auctions',\n  \"page\": 2,\n     \"limit\": 5,\n  \"auctions\": [\n        {\n         id: 23,\n         productId: '31fsa21',\n         title: 'Tamiya sto 100 cepat',\n            images: [\n               \"https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg\",\n               \"https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg\",\n               \"https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg\",\n               \"https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg\",\n               \"https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ],\n            running: true,\n            small_images: [\n                 \"https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ],\n         categoryName: 'Mainan',\n            time_left: 423913828,\n            name: 'Diky Arga',\n            slug: 'tamiya-sto-100-8hdpi0'\n         new: false,\n         weight: 1000,\n         description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n         min_price: 200000,\n         max_price: 3000000,\n         current_price: 600000,\n         kelipatan_bid: 20000,\n         start_date: '2017-04-16T18:22:54.846+07:00',\n         end_date: '2017-05-16T18:22:54.846+07:00'\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'Fail load list of auctions',\n     \"page\": null,\n     \"limit\": null,\n  \"auctions\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsLimit5Page2",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions?limit=5&&page=2"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/search?query=tamiya",
    "title": "search auctions by title",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "auctions",
            "description": "<p>List of auctions.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.name",
            "description": "<p>name of auction maker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.images",
            "description": "<p>URL of images of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auctions.new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'Success load list of auctions by title Tamiya',\n  \"auctions\": [\n        {\n         id: 23,\n         productId: '31fsa21',\n         title: 'Tamiya super cepat',\n         name: 'Diky Arga',\n            images: [\n               \"https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg\",\n               \"https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg\",\n               \"https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg\",\n               \"https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg\",\n               \"https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ],\n            running: true,\n            small_images: [\n                 \"https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg\",\n                 \"https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg\",\n                 \"https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg\"\n            ]\n         category: 'Mainan',\n            time_left: 423913828,\n         new: false,\n         weight: 1000,\n         description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n         min_price: 200000,\n         max_price: 3000000,\n         current_price: 600000,\n         kelipatan_bid: 20000,\n         start_date: '2017-04-16T18:22:54.846+07:00',\n         end_date: '2017-05-16T18:22:54.846+07:00'\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'Fail load list of auctions',\n  \"auctions\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsSearchQueryTamiya",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/search?query=tamiya"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/slug/:slug",
    "title": "get auction by slug",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of auction maker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Slug URL of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "time_left",
            "description": "<p>time left of the auction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load list of auctions',\n    id: 23,\n    productId: '31fsa21',\n    title: 'Tamiya super cepat',\n    slug: 'kamera-antik-jaman-belanda-8853e3',\n     images: [\n        \"https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg\",\n        \"https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg\",\n        \"https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg\",\n        \"https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg\",\n        \"https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg\"\n     ],\n     running: true,\n     small_images: [\n          \"https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg\",\n          \"https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg\",\n          \"https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg\",\n          \"https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg\",\n          \"https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg\"\n     ],\n      categoryName: 'Mainan',\n      time_left: 423913828,\n      name: 'Diky Arga',\n    new: false,\n    weight: 1000,\n    description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n    min_price: 200000,\n    max_price: 3000000,\n    current_price: 600000,\n    kelipatan_bid: 20000,\n    start_date: '2017-04-16T18:22:54.846+07:00',\n    end_date: '2017-05-16T18:22:54.846+07:00'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'Auction with id 3 doesnt exist',\n    id: null,\n    productId: null,\n    title: null,\n    slug: null,\n    running: false,\n    images: [],\n    small_images: [],\n    categoryName: null,\n      time_left: 0,\n      name: null,\n    new: false,\n    weight: 0,\n    description: null,\n    min_price: 0,\n    max_price: 0,\n    current_price: 0,\n    kelipatan_bid: 0,\n    start_date: null,\n    end_date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsSlugSlug",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/slug/:slug"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auctions",
    "title": "create auctions",
    "group": "Auction",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": 2,\n  \"bukalapakId\": 231232131,\n  \"token\": \"IniToken\",\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"categoryId\": 145,\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"imagesId\": \"11122121, 11122333\",\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"endDateFromAndroid\": '25/05/2017 23:50',\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>bukalapakId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token of logged in user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction, note : Nama barang hanya boleh berupa huruf, angka, spasi dan simbol &amp; . -,</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product (minimal 30 char)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auctions</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "imagesId",
            "description": "<p>image_id after upload image to BL (array of ids)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is two day</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDateFromAndroid",
            "description": "<p>date end of auction, default is two day</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is two days after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 23,\n  \"productId\": '42dfs34',\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"images\": [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/lalalala.jpg?1352105447\"],\n  \"small_images: [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/IMG00475-20121105-1431.jpg\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/lalalala.jpg?1352105447\"],\n  \"categoryId\": 145,\n  \"category\": 'Mainan',\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"userId\": 2,\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'buat lelang berhasil',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"id\": null,\n   \"productId\": null,\n  \"title\": null,\n  \"images\": [],\n     \"small_images\": [],\n  \"categoryId\": null,\n  \"category\": null,\n  \"new\": false,\n  \"weight\": 0,\n  \"description\": null,\n  \"min_price\": 0,\n  \"max_price\": 0,\n  \"kelipatan_bid\": 0,\n  \"end_date\": null,\n  \"userId\": null,\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'Buat lelang gagal ):',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "PostAuctions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auctions/from-existing-product",
    "title": "create auctions from existing product",
    "group": "Auction",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": 2,\n  \"bukalapakId\": 231232131,\n  \"token\": \"IniToken\",\n  \"productId\": \"8rew31\",\n  \"min_price\": 50000,\n  \"kelipatan_bid\": 10000,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"endDateFromAndroid\": '25/05/2017 23:50',\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>bukalapakId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token of logged in user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>id of product in lapak</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is two day</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDateFromAndroid",
            "description": "<p>date end of auction, default is two day</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>array of URL of images of auction (full resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "small_images",
            "description": "<p>array of URL of images of auction (small resolution)</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is two days after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 23,\n  \"productId\": '42dfs34',\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"images\": [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/lalalala.jpg?1352105447\"],\n  \"small_images: [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/IMG00475-20121105-1431.jpg\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/lalalala.jpg?1352105447\"],\n  \"categoryId\": 145,\n  \"category\": 'Mainan',\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"userId\": 2,\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'buat lelang berhasil',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"id\": null,\n   \"productId\": null,\n  \"title\": null,\n  \"images\": [],\n     \"small_images\": [],\n  \"categoryId\": null,\n  \"category\": null,\n  \"new\": false,\n  \"weight\": 0,\n  \"description\": null,\n  \"min_price\": 0,\n  \"max_price\": 0,\n  \"kelipatan_bid\": 0,\n  \"end_date\": null,\n  \"userId\": null,\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'Buat lelang gagal ):',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "PostAuctionsFromExistingProduct",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/from-existing-product"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "login",
    "group": "Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"dikyarga\",\n   \"password\": \"this_is_my_password!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>id of user in BukaLapak</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full Name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatarUrl",
            "description": "<p>url of avatar of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "saldo",
            "description": "<p>Balance of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success or not ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for authorization</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "user_addresses",
            "description": "<p>array of addresses</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"avatarUrl\": 'https://secure.gravatar.com/avatar/c8a0457bfc1b881755588e05a6ce55f0.png',\n  \"saldo\": 123000,\n  \"basic_token\": 'Basic fjksafjkajkdsfsjfkdsafksafksa=',\n  \"token\": 'lalalalululululolololo',\n  \"user_addresses\": [{\n       \"id\": 345,\n       \"primary\": false,\n       \"title\": \"bukan utama1\",\n       \"name\": \"tetsdfsdf\",\n       \"phone\": \"085645262611\",\n       \"address_attributes\": {\n         \"id\": 499,\n         \"address\": \"Lalalalaa\",\n         \"area\": \"Kaliwungu\",\n         \"city\": \"Kendal\",\n         \"province\": \"Jawa Tengah\",\n         \"post_code\": \"51372\"\n       }\n     }],\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'login success',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"avatarUrl\": null,\n  \"saldo\": null,\n  \"basic_token\": null,\n  \"token\": null,\n     \"user_addresses\": [],\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'email atau password salah',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostAuthLogin",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auth/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "register",
    "group": "Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Diky Arga\",\n  \"email\": \"dikyarga.id@gmail.com\",\n  \"username\": \"dikyarga\",\n   \"password\": \"this_is_my_password!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>id of user in BukaLapak</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full Name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatarUrl",
            "description": "<p>url of avatar of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "saldo",
            "description": "<p>Balance of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success or not ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "user_addresses",
            "description": "<p>array of addresses</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for authorization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"avatarUrl\": 'https://secure.gravatar.com/avatar/c8a0457bfc1b881755588e05a6ce55f0.png',\n  \"saldo\": 123000,\n  \"token\": 'lalalalululululolololo',\n  \"user_addresses\": [{\n       \"id\": 345,\n       \"primary\": false,\n       \"title\": \"bukan utama1\",\n       \"name\": \"tetsdfsdf\",\n       \"phone\": \"085645262611\",\n       \"address_attributes\": {\n         \"id\": 499,\n         \"address\": \"Lalalalaa\",\n         \"area\": \"Kaliwungu\",\n         \"city\": \"Kendal\",\n         \"province\": \"Jawa Tengah\",\n         \"post_code\": \"51372\"\n       }\n     }],\n  \"basic_token\": 'Basic fjksafjkajkdsfsjfkdsafksafksa=',\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'login success',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"avatarUrl\": null,\n  \"saldo\": null,\n  \"token\": null,\n     \"user_addresses\": [],\n  \"basic_token\": null,\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'email atau password tidak valid',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostAuthRegister",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auth/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/bids",
    "title": "bid the auction",
    "group": "Bids",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"userid\": 2,\n  \"token\": \"IniToken\",\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userid",
            "description": "<p>userId of user</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token of logged in user</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"auctionId\": 101,\n  \"nextBid\": 120000,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "auctionId",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "nextBid",
            "description": "<p>nominal of bidding offered</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the bid</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctionId",
            "description": "<p>id of the auction bided</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bidding_time",
            "description": "<p>time of bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is bidding process success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>currently highest bid</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "minimum_next_bidding",
            "description": "<p>minimum nominal for the next bidding</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'bidding success',\n  \"success\": true,\n  \"status\": \"OK\",\n  \"id\": 2345,\n  \"auctionId\": 101,\n  \"username\": 'dikyarga',\n  \"name\": 'Diky Arga',\n  \"bidding_time\": '2017-04-16 17:12:40.126+08',\n  \"current_price\": 40000,\n  \"minimum_next_bidding\": 50000,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": 'bidding fail',\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"id\": null,\n  \"username\": null,\n  \"name\": null,\n  \"id\": null,\n  \"bidding_time\": null,\n  \"current_price\": null,\n  \"minimum_next_bidding\": null,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/bids.js",
    "groupTitle": "Bids",
    "name": "PostBids",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/bids"
      }
    ]
  },
  {
    "type": "get",
    "url": "/categories/",
    "title": "get all categories",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success or not ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>'OK' or 'ERROR'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categories",
            "description": "<p>list categories of auction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"status\": \"OK\",\n  \"message\": 'login success',\n     \"categories\": [{\n         \"id\": 2266,\n         \"name\": \"Perawatan & Kecantikan\",\n         \"url\": \"/c/perawatan-kecantikan\",\n         \"children\": [\n             {\n                 \"id\": 2650,\n                 \"name\": \"Softlens\",\n                 \"url\": \"/c/perawatan-kecantikan/softlens\"\n             },..]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"status\": \"ERROR\",\n  \"message\": 'gagal load categories karena : file not found',\n     \"categories\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/categories.js",
    "groupTitle": "Category",
    "name": "GetCategories",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/categories/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/ping",
    "title": "Ping server",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"status\": \"up\",\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Status",
    "name": "GetPing",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/ping"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "get user detail informations",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load detail of user',\n      user_detail: {\n        id: 3,\n        name: 'Diky Arga',\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'User with id 3 not found',\n      user_detail: {\n        id: null,\n        name: null,\n      }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersId",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id/auctions-joined",
    "title": "get list of auctions joined",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user_detail",
            "description": "<p>user detail information</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_detail.id",
            "description": "<p>id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_detail.name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_detail.username",
            "description": "<p>username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_detail.avatarUrl",
            "description": "<p>url of avatar of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_detail.auctionsJoinedCount",
            "description": "<p>counter of auction that joined by user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_detail.wonAuctionsCount",
            "description": "<p>counter of how many user won the auction joined</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "user_detail.auctionsJoined",
            "description": "<p>counter of how many user won the auction joined</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load list of auction joined',\n      user_detail: {\n        id: 3,\n        name: 'Diky Arga',\n        username: 'dikyarga',\n        avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',\n        auctionsJoinedCount: 5,\n        wonAuctionsCount: 2\n      },\n   auctionsJoined: [\n           {\n             auctionId: 2,\n             running: true,\n             isRunning: 1,\n             time_left: 109090998,\n             title: 'Gundam ukuran asli'\n           },\n           {\n             auctionId: 3,\n             running: false,\n             isRunning: 0,\n             time_left: 0,\n             title: 'Tamiya tanpa gravitasi'\n           },\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'User with id 3 not found',\n      user_detail: {\n        id: null,\n        username: null,\n        name: null,\n        avatarUrl: null,\n        auctionsJoinedCount: 0,\n        wonAuctionsCount: 0\n      },\n   auctionsJoined: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersIdAuctionsJoined",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/:id/auctions-joined"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id/existing-products-from-lapak",
    "title": "get list of product from existing lapak",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>products from existing lapak without product that already pick in BukaLelang</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success load product list of user lapak',\n   products: [\n        {\n              \"id\": \"mab5\",\n              \"category\": \"Suspension\",\n              \"category_id\": 78\n              \"category_structure\": [\"Sepeda\", \"Fork & Suspension\", \"Suspension\"],\n              \"name\": \"Testing BL App\",\n              \"active\": true,\n              \"city\": \"Jakarta Selatan\",\n              \"province\": \"DKI Jakarta\",\n              \"price\": 1250000,\n              \"weight\": \"1000\",\n              \"courier\": [\"JNE REG\"],\n              \"force_insurance\": false,\n              \"image_ids\": [2532736],\n              \"images\": [\n                \"https://s1.bukalapak.com/system/images/2/5/3/2/7/3/6/large/IMG_0205.JPG?1371219033\"\n              ],\n              \"small_images\": [\n                \"https://s1.bukalapak.com/system/images/2/5/3/2/7/3/6/small/IMG_0205.JPG?1371219033\"\n              ],\n              \"url\": \"https://www.bukalapak.com/p/sepeda/fork-suspension/suspension/mab5_-testing-bl-app\",\n              \"desc\": \"Test upload from BL App, please ignore\",\n              \"condition\": \"new\",\n              \"nego\": true,\n              \"seller_username\": \"meow\",\n              \"seller_name\": \"Me Oww\",\n              \"seller_id\": 15,\n              \"seller_avatar\": \"https://www.bukalapak.com/system/avatars/055/f87/412/9cf/0ec/36837/medium/xkcd.png?1387424302\",\n              \"seller_level\": \"Pedagang\",\n              \"seller_level_badge_url\": \"https://www.bukalapak.com/images/badge/seller/xhdpi/level-5.png\",\n              \"seller_positive_feedback\": 46,\n              \"seller_negative_feedback\": 31,\n              \"seller_term_condition\": \"Barang yang di beli tidak dapat dikembalikan.\",\n              \"seller_alert\": null,\n              \"payment_ready\": true,\n              \"specs\": {\n                \"merk_shock\": null,\n                \"size_shock\": null,\n                \"spring\": null\n              },\n              \"state_description\": [],\n              \"minimum_negotiable\": null,\n              \"for_sale\": true,\n              \"favorited\": false,\n              \"free_shipping_coverage\": [],\n              \"deal_info\": {\n                \"original_price\": 850000,\n                \"discount_price\": 765000,\n                \"discount_percentage\": 10,\n                \"state\": \"pending\"\n              },\n              \"deal_request_state\": \"can edit\",\n              \"product_sin\":  [\"Deskripsi tidak tepat\", \"Spesifikasi tidak tepat\"]\n            }\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'User with id 3 not found',\n   products: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersIdExistingProductsFromLapak",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/:id/existing-products-from-lapak"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/fcm-registration-token",
    "title": "store FCM registration token",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;OK&quot; or &quot;ERROR&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   status: \"OK\",\n   message: 'Success store FCM registration token of the user',\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"bukalapakId\": 38233231,\n   \"fcmRegistrationToken\": \"3Sad:DAdAD:ASLDA:DADA\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>bukalapakId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmRegistrationToken",
            "description": "<p>FCM registration token of user</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   status: \"ERROR\",\n   message: 'User with bukalapakId 3 not found',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "PostUsersFcmRegistrationToken",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/fcm-registration-token"
      }
    ]
  }
] });
