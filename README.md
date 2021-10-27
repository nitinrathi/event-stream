# event-stream
A system to accept event streams and take actions when certain conditions are met.

## Setup steps
 - start redis `docker run -d --name container-redis -p 127.0.0.1:6379:6379 --rm redis`
 - set node version `nvm use` (optional)
 - install deps `npm install`
 - start `npm start`

## generating events
 - `node load.js`
### matching tag

```bash
curl --location --request POST 'http://localhost:3333/events' \
--header 'content-type: application/json' \
--data-raw '{
    "user-name": "Nitin",
    "location": "Mumbai",
    "text": "Hi",
    "tags": ["happy"]
}'
```
### matching location
```bash
curl --location --request POST 'http://localhost:3333/events' \
--header 'content-type: application/json' \
--data-raw '{
    "user-name": "Nitin",
    "location": "Pune",
    "text": "Hi",
    "tags": []
}'
```
### 10th event by user
```bash
for run in {1..10}; do
  curl --location --request POST 'http://localhost:3333/events' \
  --header 'content-type: application/json' \
  --data-raw '{
      "user-name": "Nitin",
      "location": "Delhi",
      "text": "Hi!!!",
      "tags": []
  }'
  sleep 0.2
done
```

## Conditions and actions

### Conditions

* Simply put, `conditions` are functions which take event and return `true` when that condition is fulfilled.
This works well when conditions are stateless, meaning we can determine if the condition is fulfilled just by looking at that event.

But like in the case when we wanted 10th event from a user to trigger an action, we wanted some context along with event

So conditions are function that take a context and return a function which then takes an event and return a Promise which would either resolve to `true` or `false`

So every condition function looks like the following
```javascript
const condition = (context) => (event) => Promise.resolve(true/false)
```

Incase of 10th event from a user,`context` has a function `incr` which helps us determine the count of events by user till that point, it looks as following

```javascript
const every10thEvent =
  ({ incr }) =>
  (event) =>

  incr(`counts::${event["user-name"]}`)
  .then(count => count && count % 10 === 0);
```

### actions

Actions are function which look like following and are called when corresponding condition is fulfilled

```javascript
const action = (event) => Promise.resolve(event);
```

#### note on the implementation of every10thEvent condition

In this case we wanted to trigger an action when we receive the 10th event from the user, but this condition is `every` 10th event.
Since `redis.incr` actually sets the value of key to zero when called for the first time, this condition is actually called on every 11th, 21st and so on events.

