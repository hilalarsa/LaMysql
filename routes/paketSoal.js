const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('get paket soal');
    req.connection.query(`SELECT k.id_kontainer as id, k.tipe, k.keterangan, 
    COUNT(id_kontainer_soal) as jumlah_soal 
    from tbl_kontainer k LEFT JOIN tbl_kontainer_soal ks 
    on k.id_kontainer = ks.id_kontainer GROUP BY(k.id_kontainer)`, function (err, result, fields) {
        if (err) console.log(err)
        res.send(result);
        console.log(result);
    });
})

router.get('/:id', (req, res) => {
    console.log('get paket soal by id ' + req.params.id);
    req.connection.query(`SELECT k.id_kontainer as id, k.tipe, k.keterangan
    from tbl_kontainer k where k.id_kontainer = '${req.params.id}'`, function (err, result, fields) {
        if (err) console.log(err)
        res.send(result);
        console.log(result);
    });
})

router.post('/', (req, res) => {
    console.log('insert paket soal');
    var {tipe,keterangan} = req.body
    console.log(tipe);
    console.log(keterangan);
    req.connection.query("insert into tbl_kontainer values('', '" + req.body.tipe + "', '" + req.body.keterangan + "')", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.put('/:id', (req, res) => {
    console.log('get paket soal by id ' + req.params.id);
    req.connection.query("update tbl_kontainer set tipe='" + req.body.tipe + "', keterangan='" + req.body.keterangan + "' where id_kontainer='" + req.params.id + "' ", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})


router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query("DELETE FROM tbl_kontainer where id_kontainer='" + req.params.id + "'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router