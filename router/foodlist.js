var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const db = require('../db')
var connection = mysql.createConnection({
    host: db.database.host,
    user: db.database.user,
    password: db.database.password,
    database: db.database.db
});

router.get('/', function (req, res) {
    var sql = 'SELECT food.id,food.name,food.name_th,food_type.type_name FROM food,food_type WHERE food.type = food_type.id'

    connection.query(sql, function (err, raws) {
        if (err) {
            console.log(err)
            res.json({ message: err.sqlMessage })
        } else {
            res.json({
                message: 'success',
                food: raws
            })
        }
    })

})

router.get('/', function (req, res) {
    // res.send(name_th + ' ' + name_en + ' ' + type);
    connection.connect()
    var sql = 'SELECT * FROM food'

    connection.query(sql, function (err, raws) {
        if (err) {
            console.log(err)
            res.json({ message: err.sqlMessage })
        } else {
            res.json({
                message: 'success',
                foods: raws
            })
        }
    })
    connection.end()

})

module.exports = router;