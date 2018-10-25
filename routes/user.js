const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    req.connection.query(`SELECT * FROM tbl_user where level != 'superadmin'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    req.connection.query(`SELECT * FROM tbl_user where username='${req.params.id}'`, function (err, result, fields) {
        if (err) console.log('error query')
        res.send(result);
        console.log(result);
    });
})

router.post('/', (req, res) => {
    console.log("insert into user");
    console.log(req.body.NIP);
    req.connection.query(`INSERT INTO tbl_user values ('${req.body.username}', '${req.body.password}',
    '${req.body.level}', '${req.body.no_induk}', '${req.body.nama}')`, function (err, result, fields) {
            if (err) console.log(err);
            res.send(result);
        });
})

router.put('/:id', (req, res) => {
    console.log("put with param " + req.params.id);
    req.connection.query(`UPDATE tbl_user SET username='${req.body.username}',
    password='${req.body.password}', level='${req.body.level}', no_induk='${req.body.no_induk}',
    nama='${req.body.nama}' where username='${req.params.id}'`, function (err, result, fields) {
            if (err) res.sendStatus(500)
            else res.sendStatus(200)
        });
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query(`DELETE FROM tbl_user where username='${req.params.id}'`, function (err, result, fields) {
        if (err) res.sendStatus(500)
        else res.sendStatus(200)
    });
})


module.exports = router