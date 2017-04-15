## Backend for Buka Lelang

### Tech Stack
- ExpressJS
- Postgres
- Sequelize
- WebSocket using Socket.IO

### Install Guide

```
$ git clone https://github.com/BukaLelang/bukalelang-backend.git
$ cd bukalelang-backend
$ npm install
$ cp .env.example .env
- get config from admin
$ npm run dev
```

note :

to run npm run dev, you need nodemon, if you don't it, install it globally :
```
npm install -g nodemon
```

### Usage
```
Create database on PgAdmin with name bukalelang-db
Create login roles (Optional):
  username: bukalelang,
  password: bukalelang

ON TERMINAL :
$ Sequelize db:migrate
$ Sequelize db:seed:all
```

to use sequelize command, you need sequelize-cli,
```
npm install -g sequelize-cli
```

### Run Test
```
$ mocha               <- to run all Test
$ mocha test/auth.js  <- to run a test
```

install mocha globally first, if you don't have it :
```
npm install -g mocha
```

### Contributor
- [Diky Arga Anggara](http://github.com/dikyarga)
- [Eri Irawan](http://github.com/MrEi91)
- [Bambang Handoko](https://github.com/mrhandoko)
- [Endy](https://github.com/pisanggoreng)
