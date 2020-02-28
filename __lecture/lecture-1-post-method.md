# 3.4.1 - Express Methods

---

## But First, review yesterday's workshop

---

## GET

`GET` requests are meant to _fetch_ data from ...

// serve data static

---

The service initiating the request is usually a browser, or some sort of frontend that needs the data at this endpoint.

As we've seen `GET` can also submit date, but this data is sent via query parameters.

```
GET 200 /handleData?firstName=Homer&password=doh_wtf
```

---

`GET` requests are not secure, in the sense that any data sent with the request is

- visible all along its merry way to the server
- cached in browser history.

_In the context of Node, the `get` is our server answering a simple request for information._

---

## POST

- `POST` requests are meant to submit data to the server as well.
- `POST` submits data as part of the request object. Hence, the use of `req.body` in our code.



but they also expect something in return. Sometimes it's data, and sometimes it's simply an 'OK' from the service that it received the information.

---

[More on Express routing](https://expressjs.com/en/guide/routing.html)

---

## On to GIT!!!!!


