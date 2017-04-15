define({ "api": [
  {
    "type": "post",
    "url": "/auctions",
    "title": "create auctions",
    "group": "Auction",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"categoryId\": 145,\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"start_date\": 2017-07-14T00:00:00Z,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"creator_id\": 2,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
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
            "description": "<p>Title of auction</p>"
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
            "description": "<p>description of product</p>"
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
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
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
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
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
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 23,\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"categoryId\": 145,\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"start_date\": 2017-07-14T00:00:00Z,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"creator_id\": 2,\n  \"success\": true,\n  \"message\": 'buat lelang berhasil',\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n[{\n   \"id\": null,\n  \"title\": null,\n  \"categoryId\": null,\n  \"new\": false,\n  \"weight\": 0,\n  \"description\": null,\n  \"min_price\": 0,\n  \"max_price\": 0,\n  \"kelipatan_bid\": 0,\n  \"start_date\": null,\n  \"end_date\": null,\n  \"creator_id\": null,\n  \"success\": false,\n  \"message\": 'Buat lelang gagal ):',\n}]",
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
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"saldo\": 123000,\n  \"token\": 'lalalalululululolololo',\n  \"success\": true,\n  \"message\": 'login success',\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n[{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"saldo\": null,\n  \"token\": null,\n  \"success\": false,\n  \"message\": 'email atau password salah',\n}]",
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
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"saldo\": 123000,\n  \"token\": 'lalalalululululolololo',\n  \"success\": true,\n  \"message\": 'login success',\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n[{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"saldo\": null,\n  \"token\": null,\n  \"success\": false,\n  \"message\": 'email sudah terdaftar',\n}]",
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
    "url": "/users",
    "title": "List all users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>'s list</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "users.updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "users.created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"username\": \"Diky Arga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}]",
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
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsers",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users"
      }
    ]
  }
] });
