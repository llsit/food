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

router.post('/', function (req, res) {
    // var data = req.body;
    // ----------using param -------------------------
    var name_th = req.param('name_th');
    var name_en = req.param('name_en');
    var type = req.param('type');
    // ----------using body ------------------------
    // var name_th = data.name_th;
    // var name_en = data.name_en;
    // var type = data.type;
    if (name_th == undefined || name_en == undefined || type == undefined) {
        res.json({ message: 'Please insert data' })
    } else {
        // res.send(name_th + ' ' + name_en + ' ' + type);
        connection.connect()
        var sql = 'INSERT INTO food VALUES ( ' + null + ',\'' + name_en.toString() + '\',\'' +
            name_th.toString() + '\',\'' + type.toString() + '\')'

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