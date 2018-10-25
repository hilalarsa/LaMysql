const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.json({ limit: '50mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

router.get('/', (req, res) => {
    console.log('get soal');
    req.connection.query("SELECT id_soal as id, text_soal, gambar, text_jawaban, namatabelsoal from tbl_soal order by(id) desc", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        // console.log(result);
    });
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    req.connection.query("SELECT id_soal as id, text_soal, gambar, text_jawaban, namatabelsoal from tbl_soal where id_soal='" + req.params.id + "'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        // console.log(result);
    });
})

router.get('/namaTabel/all', (req, res) => {
    console.log('get namatabel');
    req.connection.query("SELECT TABLE_NAME as namatabel FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='db_online_judge_soal'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})

router.post('/', (req, res) => {
    console.log(req.body.gambar);
    if (req.body.gambar !== '') {
        var base64Data = req.body.gambar.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        var ext = req.body.gambar.split(';')[0].split('/')[1];

        req.connection.query("select concat('gambar',(id_soal+1), '.', '" + ext + "') as nama_gambar FROM tbl_soal ORDER BY id_soal desc LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            require("fs").writeFile('./client/public/img/soal/' + result[0].nama_gambar, base64Data, 'base64', function (err) {
                console.log(err);
            });
        });
        req.connection.query("insert into tbl_soal select '', '" + req.body.text_soal + "', concat('gambar',(id_soal+1),'.', '" + ext + "'), '" + req.body.text_jawaban + "', '" + req.body.namatabel + "' FROM tbl_soal ORDER BY id_soal desc LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    } else {
        req.body.gambar = '-';
        req.connection.query("insert into tbl_soal select '', '" + req.body.text_soal + "', '-', '" + req.body.text_jawaban + "','" + req.body.namatabel + "' FROM tbl_soal ORDER BY id_soal desc LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    }
})

router.put('/:id', (req, res) => {
    console.log(req.body.namatabelsoal);
    if (req.body.imgUrl !== '') {
        var base64Data = req.body.imgUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        var ext = req.body.imgUrl.split(';')[0].split('/')[1];
        req.body.gambar = 'gambar' + req.params.id + '.' + ext;
        // console.log(req.body.gambar); 
        // req.body.gambar = req.body.gambar.substr(0, req.body.gambar.indexOf('.'));
        require("fs").writeFile('./client/public/img/soal/' + req.body.gambar, base64Data, 'base64', function (err) {
            console.log(err);
        });
    }

    req.connection.query(`update tbl_soal set text_soal="` + req.body.text_soal + `", gambar="` + req.body.gambar + `", text_jawaban="` + req.body.text_jawaban + `", namatabelsoal="`+req.body.namatabelsoal+`" where id_soal='` + req.params.id + `' `, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query("DELETE FROM tbl_soal where id_soal='" + req.params.id + "'", function (err, result, fields) {
        if (err) res.sendStatus(500)
        else res.sendStatus(200)
    });
})

router.get('/choose/:id', (req, res) => {
    console.log('get soal');
    req.connection.query("SELECT * from tbl_soal where id_soal NOT IN (SELECT id_soal FROM tbl_kontainer_soal WHERE id_kontainer='" + req.params.id + "') order by(id_soal) desc", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        // console.log(result);
    });
})

module.exports = router