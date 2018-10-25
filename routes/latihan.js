const express = require('express')
const router = express.Router()
var isEqual = require('lodash.isequal');

router.get('/', (req, res) => {
    console.log('get soal');
    req.connection.query("SELECT id_soal as id, text_soal from tbl_soal", function (err, result, fields) {
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
    console.log(req.body)
    req.connection.query("SELECT id_soal as id, text_soal, text_jawaban, gambar, namatabelsoal from tbl_soal where id_soal = '" + req.params.id + "'", function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    })
})
//get class object


router.post('/jawabLatihan', (req, res) => {
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
            var replacedQueryKunci = queryKunci.replace(/\"/g, `'`) //ganti tanda " ke '
            // console.log("query", replacedQueryKunci);
            req.connection2.query(replacedQueryKunci, function (err, result, fields) {
                if (err) {
                    console.log("Kunci jawaban salah! Periksakan ke pengawas!")
                }
                jsonJawaban = result //hasil eksekusi query jawaban dosen
                console.log("START")
                // console.log(jsonSiswa);
                // console.log(jsonSiswa)
                var jsonSiswaString = JSON.stringify(jsonSiswa) // jadikan hasil query ke string json
                var jsonJawabanString = JSON.stringify(jsonJawaban)
                var jsonSiswaParsed = JSON.parse(jsonSiswaString.toLowerCase()) //jadikan string json ke object, kemudian jadikan lowercase
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

// router.post('/hapusSesi', (req, res) => {
//     var { id_event, no_induk } = req.body

//     req.connection.query(`SELECT SUM(nilai) as nilai from tbl_mhs_jawaban where id_event='${id_event}'`, (err, result, fields) => {
//         if (err) {
//             console.log("1")
//             res.status(500).send(err);
//         } else {
//             console.log("2")
//             console.log(result);
//             req.connection.query(`SELECT * from tbl_nilai where id_event='${id_event} and no_induk='${no_induk}'`, (err, result, fields) => {
//                 if (err) {
//                     console.log("3")
//                     res.status(500).send(err);
//                 } else {
//                     if(result.length > 0){
//                         req.connection.query(`INSERT INTO tbl_nilai VALUES ('','${no_induk}','${id_event}','${result[0].nilai}')`, (err, result, fields) => {
//                             if (err) {
//                                 console.log("3")
//                                 res.status(500).send(err);
//                             } else {
//                                 console.log("4")
//                             }
//                         })
//                     }
//                 }
//             })
//         }
//     })
// })
router.post('/', (req, res) => {
    // console.log(req.params.id)
    console.log("dah sampe sini coy")
    res.sendStatus(200)
    console.log(req.body.jawaban)
})

module.exports = router


                    // req.connection.query(`DELETE from tbl_mhs_jawaban where id_event='${id_event}'`, (err, result, fields) => {
                    //     if (err) {
                    //         console.log(err)
                    //         res.status(500).send(err);
                    //     } else {
                    //         console.log("6")
                    //         req.connection.query(`DELETE from tbl_event where id_event='${id_event}'`, (err, result, fields) => {
                    //             if (err) {
                    //                 console.log("7")
                    //                 res.status(500).send(err);
                    //             } else {
                    //                 console.log("8")
                    //                 res.status(200).send(result);
                    //             }
                    //         })
                    //     }
                    // })