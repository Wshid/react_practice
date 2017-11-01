var express = require('express');
var app=express(); // express 생성

var morgan=require('morgan');
app.use(morgan('dev'));

var user = require('./routes/user');
app.use('/user', user);

var bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use('/', express.static('public'));

// 미들웨어 정의
/*
var myLogger = (req, res, next)=>{ // next가 다른곳으로 넘기는 callback
    console.log(req.url);
    next();
};
app.use(myLogger); 
*/
app.listen(8080, ()=>{
    console.log('Example App is listening on port 8080');
});

