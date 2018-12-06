var express = require('express');
var app = express();
var p = require('./person');
p.hello();
var path = require('path');
var food = require('./router/food');
var type = require('./router/type');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'))

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('index', { title: 'Express และ Pug' });
});

app.get('/product', function (req, res) {
    res.redirect('hello.html')
})

app.use('/food', food)
app.use('/type', type)

app.listen(30000, function () {
    console.log('Express running on port 3000')
}); 