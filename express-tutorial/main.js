var express = require('express');
var app=express(); // express 생성


var user = require('./routes/user');
app.use('/user', user);

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.listen(8080, ()=>{
    console.log('Example App is listening on port 8080');
});

