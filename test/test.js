var test = require('tape'),
    hello = require('../hello'),
    server = require('./server');

server.listen(8080);
test.onFinish(server.close.bind(server));

test('GET remote no data', function(t){
  hello('GET', 'https://gaston-api.herokuapp.com/echoJS', function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.status, 'ok', 'res.data');
    t.end();
  });
});

test('POST remote with data', function(t){
  hello('POST', 'https://gaston-api.herokuapp.com/inc', {cats: 1}, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.cats, 2, 'res.data');
    t.end();
  });
});

test('GET localhost no data', function(t){
  hello({
    method: 'GET',
    port: 8080
  }, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data, 'hi!', 'res.data');
    t.end();
  });
});

test('POST localhost with data', function(t){
  hello({
    method: 'POST',
    data: {cats: 5},
    path: '/inc',
    port: 8080
  }, function(err, res){
    t.false(err, 'err');
    t.equal(res.raw.statusCode, 200, 'res.raw');
    t.equal(res.data.cats, 6, 'res.data');
    t.end();
  });
});
