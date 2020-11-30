# nodejs-course

- `npm install`
- `npm start` - run Express Server on default port 3003 
- `npm run clean` - can be used to restore initial dataset
- `node src/httpsServer` - run custom HTTP Server on default port 8000

***

## Request examples

**Get all events:**
`curl http://localhost:3003/events`

**Get event by ID:**
`curl http://localhost:3003/events/3`

**Create event:**
```
curl --request POST 'http://localhost:3003/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"PE",
    "description":"",
    "datetime":"2020-11-11T10:30:00.000Z",
    "location":"odessa",
    "repeat":"yearly",
    "room":12,
    "link":"",
    "id":100
}'
```

**Update event:**
```
curl --request PUT 'http://localhost:3003/events/3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "3",
    "title": "yobaboba",
    "datetime": "2020-11-08T14:14:58.000Z",
    "repeat": "dayly",
    "location": "odessa",
    "room": "33"
}'
```

**Delete event:**
`curl --request DELETE 'http://localhost:3003/events/3'`

***

## Request examples for custom HTTP Server

`curl http://localhost:8000/`

`curl http://localhost:8000/events`

`curl http://localhost:8000/events/1`

`curl http://localhost:8000/users`

`curl http://localhost:8000/users/1`

`curl http://localhost:8000/foo`

```
curl --request POST 'http://localhost:8000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "event10"
}'
```

```
curl --request POST 'http://localhost:8000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "event10"
}'
```

### Authorization requests examples

`curl --request POST 'http://localhost:3003/login'`

```
curl --request GET 'http://localhost:3003/refresh_tokens' \
--header 'Authorization: Bearer <your_refresh_token>'
```

```
curl --request GET 'http://localhost:3003/check_access' \
--header 'Authorization: Bearer <your_access_token>'
```
