var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food'
});

router.get('/', function (req, res) {
    connection.connect()
    var sql = 'SELECT * FROM food_type'
    connection.query(sql, function (err, raws) {
        if (err) {
            console.log(err)
            res.json({ message: err.sqlMessage })
        } else {
            res.json({
                message: 'success',
                types: raws
            })
        }
    })
})

router.post('/', function (req, res) {
    var type_name = req.param('type_name');

    if (type_name == undefined) {
        res.json({ message: 'Please insert type_name' })
    } else {
        // res.send(name_th + ' ' + name_en + ' ' + type);
        connection.connect()
        var sql = 'INSERT INTO food_type VALUES ( ' + null + ',\'' + type_name.toString() + '\')'
        // console.log(sql)
        connection.query(sql, function (err, raws) {
            if (err) {
                console.log(err)
                res.json({ message: err.sqlMessage })
            } else {
                res.json({ message: 'success' })
            }
        })
        connection.end()
    }
})

module.exports = router;