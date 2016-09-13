var http = require('http'),
    url = require('url'),
    wat = Object.prototype.toString;

module.exports = function(method, urlArg, data, cb){
  var opts = {}, dataToWrite;

  // simple remote with no data - (str, str, fn)
  if (typeof data === 'function') {
    cb = data;
  }
  // simple remotes - (str, str [, {}], fn)
  if (arguments.length === 3 || arguments.length === 4) {
    opts.method = method;
    opts.hostname = url.parse(urlArg).hostname;
    opts.path = url.parse(urlArg).path;
  }
  // custom remote && localhost - ({}, fn)
  if (arguments.length === 2 && wat.call(method) === '[object Object]' && typeof urlArg === 'function') {
    opts = method;
    cb = urlArg;
  }
  // headers
  if (!opts.headers) {
    opts.headers = {};  
  }
  // data
  if (wat.call(data) === '[object Object]' || wat.call(opts.data) === '[object Object]') {
    opts.headers['Content-Type'] = 'application/json';
    dataToWrite = JSON.stringify(data || opts.data);
  }
  if (typeof opts.data === 'string') {
    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    dataToWrite = opts.data;
  }
  // the request
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
  if (dataToWrite) {
    req.write(dataToWrite);
  }
  req.end();
}
