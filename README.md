# hello
A node http.request wrapper with some sugar like `url`, `data` and json parsing.

# install
```
$ npm i hello-http
```

# api
### simple remote request
`hello(method, url [, data], cb)`

`method` *string*

`url` *string*

`data` *object* stringified to json by default and appropriate headers set. Optional

### custom remote request or localhost
`hello({method, hostname, headers [, port, path, data]}, cb)`

`method` *string*

`hostname` *string* defaults to `localhost`

`port` *number* Required if requesting `localhost`. Defaults to 80

`path` *string* Defaults to `/`

`data` *object* or *string*. Parsed as json or urlencoded and appropriate headers set. Optional

`headers` *object* Will be empty unless `data` is set.

All options in the [original api](https://nodejs.org/api/http.html#http_http_request_options_callback) is supported.

### cb(err, res)
`err` null or an error message

`res.raw` unparsed response. Includes headers and statuscodes.

`res.data` parsed json by default. Otherwise the body string.

# test
```
$ npm test
```

# Todos
- [x] tests
- [x] npm
- use on gaston

# licence
MIT
