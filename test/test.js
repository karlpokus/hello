var test = require('tape'),
    hello = require('../hello'),
    server = require('./server');

server.listen(8080);
test.onFinish(server.close.bind(server));

test('GET remote no data', function(t){
  var url = 'https://gaston-api.herokuapp.com/echoJS';

  hello('GET', url, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.status, 'ok', 'res.data');
    t.end();
  });
});

test('POST remote with data', function(t){
  var url = 'https://gaston-api.herokuapp.com/inc',
      data = {cats: 1};

  hello('POST', url, data, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.cats, 2, 'res.data');
    t.end();
  });
});

test('GET localhost no data', function(t){
  var opts = {
    method: 'GET',
    port: 8080
  };

  hello(opts, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data, 'hi!', 'res.data');
    t.end();
  });
});

test('POST localhost with data', function(t){
  var opts = {
    method: 'POST',
    data: {cats: 5},
    path: '/inc',
    port: 8080
  };

  hello(opts, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.cats, 6, 'res.data');
    t.end();
  });
});
