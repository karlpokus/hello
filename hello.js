var http = require('http'),
    url = require('url'),
    wat = Object.prototype.toString;

module.exports = function(method, urlArg, data, cb){
  var opts = {};

  // simple remote with no data
  if (typeof data === 'function') {
    cb = data;
  }
  // simple remotes
  if (arguments.length === 3 || arguments.length === 4) {
    opts.method = method;
    opts.hostname = url.parse(urlArg).hostname;
    opts.path = url.parse(urlArg).path;
  }
  // custom remote && localhost
  if (arguments.length === 2 && wat.call(method) === '[object Object]' && typeof urlArg === 'function') {
    opts = method;
    cb = urlArg;
  }

  var req = http.request(opts, function(res){
    var data = '',
        out = {raw: res};

    res
      .setEncoding('utf8')
      .on('error', cb)
      .on('data', function(chunk){
        data += chunk;
      })
      .on('end', function(){
        try {
          out.data = JSON.parse(data);
        } catch(e) {
          out.data = data;
        }
        cb(null, out);
      });

  }).on('error', function(e){
    cb(e.message);
  });

  if (wat.call(data) === '[object Object]' || opts.data) {
    req.write(JSON.stringify(data || opts.data));

    if (!opts.headers) {
      opts.headers = {};

      if (!opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/json';
      }
    }      
  }
  req.end();
}
