const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    req.connection.query("SELECT id_kelas AS id, id_kelas, semester, NIP FROM tbl_kelas", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        // console.log(result);
    });
})

router.get('/:no_induk', (req, res) => {
    var nip=req.params.no_induk;
    if(nip=='superadmin'){
        req.connection.query("SELECT id_kelas AS id, id_kelas, semester, NIP FROM tbl_kelas", function (err, result, fields) {
            if (err) console.log('error query')
            res.send(result);
            console.log(result);
        });
    }else{
        req.connection.query("SELECT id_kelas AS id, id_kelas, semester, NIP FROM tbl_kelas where NIP='" + req.params.no_induk + "'", function (err, result, fields) {
            if (err) console.log('error query')
            res.send(result);
            console.log(result);
        });
    }
})

router.get('/edit/:id', (req, res) => {
    console.log(req.params.id);
    req.connection.query("SELECT id_kelas AS id, id_kelas, semester, NIP FROM tbl_kelas where id_kelas='" + req.params.id + "'", function (err, result, fields) {
        if (err) console.log('error query')
        res.send(result);
        console.log(result);
    });
})

router.post('/checkKelas', (req, res) => {
    console.log(req.body);
    req.connection.query("select * from tbl_kelas where id_kelas='" + req.body.id + "'", function (err, result, fields) {
        if (err) throw err
        else {
            if (result.length == 0) {
                req.connection.query("INSERT INTO tbl_kelas values ('" + req.body.id + "', '" + req.body.semester + "', '" + req.body.nip + "')", function (err, result, fields) {
                    if (err) throw err
                    else
                        res.sendStatus(200)
                });
            } else {
                res.sendStatus(500)
            }
        }
    });
})

router.post('/', (req, res) => {
    console.log("insert into kelas");
    console.log(req.body.NIP);
    req.connection.query("INSERT INTO tbl_kelas values ('" + req.body.id + "', '" + req.body.semester + "', '" + req.body.NIP + "')", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.put('/:id', (req, res) => {
    console.log("put with param " + req.params.id);
    req.connection.query("select * from tbl_kelas where id_kelas='" + req.body.id_kelas + "'", function (err, result, fields) {
        if (err) throw err
        else {
            if (result.length == 0) {
                req.connection.query("UPDATE tbl_kelas SET id_kelas='" + req.body.id_kelas + "', semester='" + req.body.semester + "' where id_kelas='" + req.params.id + "'", function (err, result, fields) {
                    if (err) res.sendStatus(500)
                    else res.sendStatus(200)
                });
            } else {
                res.sendStatus(600)
            }
        }
    });
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query("DELETE FROM tbl_kelas where id_kelas='" + req.params.id + "'", function (err, result, fields) {
        if (err) res.sendStatus(500)
        else res.sendStatus(200)
    });
})


module.exports = router