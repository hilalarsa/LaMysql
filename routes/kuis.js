const express = require('express')
const router = express.Router()
var isEqual = require('lodash.isequal');

router.get('/', (req, res) => {
    console.log('get soal');
    req.connection.query("SELECT id_soal as id, text_soal, gambar from tbl_soal", function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    });
})

// router.get('/kuis/:id', (req, res) => {
//     console.log('get soal');
//     req.connection.query("SELECT id_soal as id, text_soal from tbl_soal", function (err, result, fields) {
//         if (err) console.log(err);
//         res.send(result);
//     });
// })



router.get('/:id', (req, res) => {
    console.log('get soal kuis dgn id');
    console.log("minta soal kuis dke server")
    console.log(req.body)
    req.connection.query("SELECT id_soal as id, text_soal, text_jawaban, gambar, namatabelsoal from tbl_soal where id_soal = '" + req.params.id + "'", function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    })
})
//get class object


router.post('/jawabKuis', (req, res) => {
    console.log(req.body.jawaban)
    console.log(req.body.kunci)
    // [query compare]
    var jsonSiswa, jsonJawaban;
    var queryJawaban = req.body.jawaban
    var replacedQueryJawaban = queryJawaban.replace(/\"/g, `'`)
    req.connection2.query(replacedQueryJawaban, function (err, result, fields) {
        if (err) {
            console.log("Error! ini errornya")
            console.log(err.sqlMessage)
            res.send({
                "Error": err
            })
        } else {
            jsonSiswa = result //hasil eksekusi query jawaban mhsiswa
            var queryKunci = req.body.kunci
            var replacedQueryKunci = queryKunci.replace(/\"/g, `'`)
            console.log("query", replacedQueryKunci);
            req.connection2.query(replacedQueryKunci, function (err, result, fields) {
                if (err) {
                    console.log("Kunci jawaban salah! Periksakan ke pengawas!")
                }
                jsonJawaban = result //hasil eksekusi query jawaban dosen
                console.log("START")
                // console.log(jsonSiswa);
                // console.log(jsonSiswa)
                var jsonSiswaString = JSON.stringify(jsonSiswa)
                var jsonJawabanString = JSON.stringify(jsonJawaban)
                var jsonSiswaParsed = JSON.parse(jsonSiswaString.toLowerCase())
                var jsonJawabanParsed = JSON.parse(jsonJawabanString.toLowerCase())
                // console.log(isEqual(jsonSiswaParsed, jsonJawabanParsed))
                // console.log(jsonSiswaParsed)
                // console.log(jsonJawabanParsed)
                // console.log(JSON.parse(jsonJawabanString))

                if (jsonSiswaString == jsonJawabanString || isEqual(jsonSiswaParsed, jsonJawabanParsed)) { //perbandingan JSON!!
                    console.log("Jawaban benar, nilai ++")
                    res.send({
                        "Jawaban": "benar"
                    })
                } else {
                    console.log("Jawaban salah, nilai --")
                    res.send({
                        "Jawaban": "salah"
                    })
                }
            })
        }
    })

})



router.post('/simpanJawaban', (req, res) => {
    console.log("SIMPAN jawaban ^_^");
    var {
        id_mhs,
        text_jawaban,
        nilai,
        id_soal
    } = req.body
    console.log(req.body)
    console.log(text_jawaban)
    console.log(nilai)
    console.log(id_soal)
    var tempTextJawaban = text_jawaban
    var replacedTextJawaban = tempTextJawaban.replace(/\'/g, ``)

    req.connection.query(`SELECT id_event,id_kontainer FROM tbl_event where id_mhs='${id_mhs}' limit 1`, function (err, result, fields) {
        // console.log(result)
        req.connection.query(`INSERT INTO tbl_mhs_jawaban VALUES ('','${result[0].id_event}',${id_soal},'${replacedTextJawaban}','${nilai}')`, function (err, result2, fields) {
            console.log(err)
            console.log(result2)

            if (result2.affectedRows > 0) {
                var obj = {
                    "id_kontainer": result[0].id_kontainer
                }
                res.send(obj)
            }
        })
    })
    // res.sendStatus(200)
    // res.status(200).send("All good")
    // console.log(req.body.jawaban)
})


router.post('/', (req, res) => {
    // console.log(req.params.id)
    console.log("dah sampe sini coy")
    res.sendStatus(200)
    console.log(req.body.jawaban)
})

module.exports = router