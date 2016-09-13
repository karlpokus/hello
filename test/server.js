var http = require('http'),
    server = http.createServer(),
    dataparser = function(req, cb){
      var data = '';
      req
        .on('error', cb)
        .on('data', function(chunk){
          data += chunk;
        })
        .on('end', function(){
        
          // urlencoded
          if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            cb(null, data);
            
            // json
          } else if (req.headers['content-type'] === 'application/json') {
            try {
              data = JSON.parse(data);
              data.cats++;
              cb(null, data);
            } catch(e) {
              cb(e.message);
            }
            
            // wrong header
          } else {
            cb('Wrong header set');
          }
        })
    };

server.on('request', function(req, res){
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.end('hi!');
  }
  if (req.method === 'POST' && req.url === '/inc') {
    dataparser(req, function(err, data){
      if (err) {
        res.statusCode = 500;
        res.end(err);
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
      }
    });
  }
});

module.exports = server;
