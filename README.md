# The Boxscore

## This project include both NodeJS server `(backend)` and ReactJS APP `(frontend)` for show boxscore data.

## Installation

```
git clone https://github.com/sahidhossen/typescript-boxscore.git
```

## Backend Server

```
Please confirm that you have run mongodb server on your local machine before start the project and configure ".env" file.
```

1. cd `backend-server`
2. To install npm packages run `npm install` or `yarn install`
3. Also change the `.env` file for `mongodb` configuration. `(If needed)`
4. Start project with `npm start` Or `yarn start`
5. It will start the backend server at `5000` port

```
It will automatically create database and run  feed command to insert necessary feeds for API.
```

To test the server hit this API-
[http://localhost:5000/game-type/](http://localhost:5000/game-type/)

## Frontend

1. cd `frontend`
2. To install npm packages run `npm install` or `yarn install`
3. It will start frontend server at `3000` port

---

## API Documentation

I have added only two REST API end-point for display data. `game-type` and `game-score` for show `boxscore` data in front-end and all feed data inserted from backend.

I have created database relationship that we can expand in future. I have only complete `game-type` and `game-score` but I can easily add other if needed.

```
Base Url: http://localhost:5000
```

### **Fetch game-type data for all game list**

Each game list has a gameId for show boxscore

`GET: /game-type`

```
{
  success: true,
  data: []
}
```

### **Fetch gamescore data for each game**

`GET: /game-score/{gameID}`

```
{
  success: true,
  data: {
    game: {}
    gamescore: []
  }
}
```

---

### Cache Management

---

`/game-score/{gameID}` API end-point manage `cache` in mongoDB.
It store all gamescore data into cache by gameId. If you hit this API route within `15` second then it will fetch data from `cache` table.
If you see in browser console it will show source data from `cache` and `cache time` if data fetch from `cache` table.
