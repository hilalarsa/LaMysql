const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    req.connection.query(`SELECT 
    ks.id_kontainer_soal as id, s.id_soal, 
    s.text_soal, s.gambar, s.text_jawaban
    from tbl_soal as s 
    join tbl_kontainer_soal as ks 
    on (s.id_soal = ks.id_soal) 
    where ks.id_kontainer = '${req.params.id}' 
    order by(id_kontainer_soal) desc`, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        res.send(result);
    });
})

router.post('/insert', (req, res) => {
    var id_soal = req.body.id_soal;
    var id_kontainer = req.body.id_kontainer;
    console.log(id_kontainer + ", " + id_soal);
    req.connection.query("insert into tbl_kontainer_soal values ('', '" + id_kontainer + "', '" + id_soal + "')", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.delete('/delete/:id', (req, res) => {
    console.log("delete, " + req.params.id);
    req.connection.query("DELETE FROM tbl_kontainer_soal where id_kontainer_soal='" + req.params.id + "'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router