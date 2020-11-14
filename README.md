# nodejs-course

## Home Task 3

- `npm install`
- `npm run clean` - can be used to restore initial dataset

**NOTE**: Endpoint `event-batch` is not implememnted because `events` enpoint (with possible filtering by location) already implemented using streams.

### Request examples

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
curl --request DELETE 'http://localhost:3003/events/3'