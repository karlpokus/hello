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
          try {
            data = JSON.parse(data);
            data.cats++;
            cb(null, data);
          } catch(e) {
            cb(e.message);
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
