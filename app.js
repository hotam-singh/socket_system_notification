var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql').createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '902819'
});

mysql.connect(function (err) {
    if (err) {
        console.log('error : ' + err);
        throw err;
    } else {
        console.log('database connected successfully');
    }
});

mysql.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) {
        console.log('error : ' + err);
        throw err;
    } else {
        console.log('database created successfully');
        mysql.query('use test');
        var posts = 'CREATE TABLE IF NOT EXISTS ' +
            'posts(usernsme varchar(20), post varchar(50));';
        mysql.query(posts, function (err) {
            if (err) {
                console.log('error : ' + err);
                throw err;
            } else {
                console.log('table created successfully');
            }
        });
    }
});

/* var sql = fs.readFileSync('./db.sql').toString().split(/;\n/);
mysql.query(sql[1], function(err, result) {
    if(err) {
        throw err;
    }
    console.log('result : ' + result);
}) */




var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
}); 

var server = app.listen(8082);
var io = require('socket.io').listen(server);
require('./sockets')(app, io);
console.log('server running on port 8082');