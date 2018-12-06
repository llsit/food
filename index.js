var express = require('express');
var app = express();

var food = require('./router/food');
var type = require('./router/type');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send('Welcome to food!!')
})

app.use('/food', food)
app.use('/type', type)

app.listen(3000, function () {
    console.log('Express running on port 3000')
}); 