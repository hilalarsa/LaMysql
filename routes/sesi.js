// const express = require('express')
// const router = express.Router()
// var isEqual = require('lodash.isequal');
// var moment = require('moment');

// router.post('/getDetailTabel/', (req, res) => {
//     console.log("get tabelsampel by id")
//     console.log("ini query" + req.body.query)
//     var query = req.body.query //ini isinya full query dari textInput
//     /*Callback 1*/
//     if (query == "" || query == null) {
//         console.log("query empty");
//         res.status(404).send("Query is Empty")
//     }
//     // var tableName = query.match(/(?<=from|join)\s+(\w+)/gi);\
//     var queryMatch = query.toLowerCase().split("from")[0]
//     var qreplace = queryMatch.replace("as","")
//     console.log("Match");
//     console.log(qreplace)
//     var queryField = qreplace.match(/\.(\w+)\,|\.(\w+)\s|\s(\w+)\,|\s(\w+)\s/igm);
//     console.log("Field");
//     console.log(queryField)
//     var table_list = []
//     var tables = queryField
//     tables.forEach((table) => {
//         table_list.push({
//             "Header": table.trim().replace(',','').replace('.','').replace('nim','NIM'),
//             "accessor": table.trim().replace(',', '').replace('.', '').replace('nim', 'NIM')
//         }); //header dan accessor untuk format react-table, gaiso digenti
//     })
//     /*Callback 2*/
//     console.log("Masuk if");
//     req.connection2.query(query, function (err, result2, fields) {
//         if (err) {
//             console.log(err.sqlMessage)
//             res.status(404).send(err.sqlMessage)
//         } else { //eksekusi querynya langsung
//             if (result2 == "" || result2 == null) {
//                 console.log("result empty");
//                 res.status(404).send("Result is Empty")
//             } else {

//                 var paket = {}
//                 paket['fields'] = table_list
//                 paket['isi'] = result2 //merge jadi 1 array utk dikirim ke react component detailTabelSampel
//                 console.log(paket)
//                 res.status(200).send(paket) //dikirim di callback 2 karena saat callback pertama berhasil gak ada gunanya tanpa dapat hasil dari callback 2
//             }
//         }
//     }) //query 2
// })
// router.get('/getAllSoal/:id', (req, res) => {
//     console.log('get All kuis tanpa id');
//     // console.log(req.route)

//     // var { params } = req
//     console.log(req.params.id);
//     // console.log()
//     req.connection.query(`SELECT a.id_soal as id, a.text_soal as text_soal, a.text_jawaban, a.namatabelsoal, b.id_kontainer_soal, c.tipe 
//     FROM tbl_soal as a 
//     JOIN tbl_kontainer_soal as b ON a.id_soal = b.id_soal 
//     JOIN tbl_kontainer as c ON b.id_kontainer = c.id_kontainer
//     LEFT JOIN tbl_mhs_jawaban as d ON b.id_soal=d.id_soal 
//     WHERE b.id_kontainer='${req.params.id}' AND
//     d.id_soal IS NULL`, function (err, result, fields) {
//         if (err) {
//             console.log("masuk error")
//             res.status(500).send(err);
//         } else {
//             console.log("masuk isok")
//             res.status(200).send(result);
//         }
//     })
// })
// router.get('/getEventId/:id', (req, res) => {
//     console.log('get All kuis dgn id');
//     req.connection.query(`SELECT id_event FROM tbl_event WHERE id_mhs='${req.params.id}'`, function (err, result, fields) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             console.log(result)
//             res.status(200).send(result);
//         }
//     })
// })


// router.get('/getCurrentTime/:id', (req, res) => {
//     console.log("Get current Time")
//     console.log(req.params.id); //id_jadwal

//     req.connection.query("SELECT waktu_selesai, tgl_selesai FROM tbl_jadwal where id_jadwal='" + req.params.id + "'", function (err, result) {
//         if (err) {
//             console.log(err)
//             res.status(500).send()
//         } else {
//             console.log(result)
//             // console.log(result[0].waktu_selesai)
//             var timess = moment().format(); // July 3rd 2018, 11:44:03 pm
//             //2017-08-03T16:36:17.294Z
//             var regex = /\d{4}-\d{2}-\d{2}/g //regex get tanggal sekarang
//             var regex2 = /\d{2}:\d{2}:\d{2}/g
//             payloadTime = {
//                 serverTime: result[0].waktu_selesai,
//                 serverDate: result[0].tgl_selesai
//             }
//             console.log(payloadTime);
//             res.status(200).send(payloadTime)
//         }
//     })
// })

// router.post('/hapusSesi', (req, res) => {
//     console.log(req.body)
//     // next()
//     var {
//         id_event,
//         no_induk,
//         id_jadwal
//     } = req.body
//     req.connection.query(`SELECT id_jadwal_kelas FROM tbl_jadwal_kelas where id_jadwal='${id_jadwal}' order by id_jadwal_kelas desc LIMIT 1`, (err, result, fields) => {
//         console.log(0)
//         if (err) console.log(err)
//         console.log(result)
//         var id_jadwal_kelas = result[0].id_jadwal_kelas
//         req.connection.query(`SELECT SUM(nilai) as nilai, COUNT(nilai) as jml_nilai from tbl_mhs_jawaban where id_event='${id_event}'`, (err, result, fields) => {
//             if (err) {
//                 console.log("1")
//                 res.status(500).send(err);
//             } else {
//                 console.log("2")
//                 var nilai = (result[0].nilai / result[0].jml_nilai) * 10
//                 console.log("NILAI" + result[0].nilai);

//                 req.connection.query(`INSERT INTO tbl_nilai VALUES ('','${no_induk}','${id_jadwal_kelas}','${nilai}')`, (err, result, fields) => {
//                     if (err) {
//                         console.log("3" + err)
//                         res.status(500).send(err);
//                     } else {
//                         console.log("4")
//                         req.connection.query(`DELETE from tbl_mhs_jawaban where id_event='${id_event}'`, (err, result, fields) => {
//                             if (err) {
//                                 console.log(err)
//                                 res.status(500).send(err);
//                             } else {
//                                 console.log("6")
//                                 req.connection.query(`DELETE from tbl_event where id_event='${id_event}'`, (err, result, fields) => {
//                                     if (err) {
//                                         console.log("7")
//                                         res.status(500).send(err);
//                                     } else {
//                                         console.log("8")
//                                         res.status(200).send(result);
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     })
// })
// module.exports = router

const express = require('express')
const router = express.Router()
var isEqual = require('lodash.isequal');
var moment = require('moment');

router.post('/getTableSample/', (req, res) => {
    console.log("get tabelsampel by id")
    console.log("ini query" + req.body.query)
    var query = req.body.query //ini isinya full query dari textInput
    /*Callback 1*/
    if (query == "" || query == null) {
        console.log("query empty");
        res.status(404).send("Query is Empty")
    }
    var tableName = query.match(/select.*from\s+(\w+)/i)[1];
    req.connection2.query("DESCRIBE " + tableName, function (err, result, fields) { //return baris nama field
        if (err) {
            console.log(err.sqlMessage)
            res.status(404).send(err.sqlMessage)
        } else {
            var table_list = []
            var tables = result
            tables.forEach((table) => {
                table_list.push({
                    "Header": table.Field,
                    "accessor": table.Field
                }); //header dan accessor untuk format react-table, gaiso digenti
            })
            /*Callback 2*/
            req.connection3.query(query, function (err, result2, fields) { //eksekusi querynya langsung
                if (result2 == "" || result2 == null) {
                    console.log("result empty");
                    res.status(404).send("Result is Empty")
                } else {
                    var paket = {}
                    paket['fields'] = table_list
                    paket['isi'] = result2 //merge jadi 1 array utk dikirim ke react component detailTabelSampel
                    console.log(paket)
                    res.status(200).send(paket) //dikirim di callback 2 karena saat callback pertama berhasil gak ada gunanya tanpa dapat hasil dari callback 2
                }
            }) //query 2
        }
    });
})
router.post('/getDetailTabel/', (req, res) => {
    // console.log("get tabelsampel by id")
    // console.log("ini query" + req.body.query)
    var query = req.body.query //ini isinya full query dari textInput
    /*Callback 1*/
    if (query == "" || query == null) {
        console.log("query empty");
        res.status(404).send("Query is Empty")
    }else if(query.match("*")){
        console.log("query must define field name!")
    }else{
    // var tableName = query.match(/(?<=from|join)\s+(\w+)/gi);\
    var queryMatch = query.toLowerCase().split("from")[0]
    var qreplace = queryMatch.replace("as", "")
    console.log("Match");
    console.log(qreplace)
    var queryField = qreplace.match(/\.(\w+)\,|\.(\w+)\s|\s(\w+)\,|\s(\w+)\s/igm);
    console.log("Field");
    console.log(queryField)
    if (queryField !== null) {
        var table_list = []
        var tables = queryField
        tables.forEach((table) => {
            table_list.push({
                "Header": table.trim().replace(',', '').replace('.', '').replace('nim', 'NIM'),
                "accessor": table.trim().replace(',', '').replace('.', '').replace('nim', 'NIM')
            }); //header dan accessor untuk format react-table, gaiso digenti
        })
        /*Callback 2*/
        console.log("Masuk if");
        req.connection2.query(query, function (err, result2, fields) {
            if (err) {
                console.log(err.sqlMessage)
                res.status(404).send(err.sqlMessage)
            } else { //eksekusi querynya langsung
                if (result2 == "" || result2 == null) {
                    console.log("result empty");
                    res.status(404).send("Result is Empty")
                } else {
                    var paket = {}
                    paket['fields'] = table_list
                    paket['isi'] = result2 //merge jadi 1 array utk dikirim ke react component detailTabelSampel
                    console.log(paket)
                    res.status(200).send(paket) //dikirim di callback 2 karena saat callback pertama berhasil gak ada gunanya tanpa dapat hasil dari callback 2
                }
            }
        }) //query 2
    }else{
        res.status(555).send('Tuliskan nama kolom!');
    }
}
})
router.get('/getAllSoal/:id', (req, res) => {
    console.log('get All kuis tanpa id');
    // console.log(req.route)

    // var { params } = req
    console.log(req.params.id);
    // console.log()
    req.connection.query(`SELECT a.id_soal as id, a.text_soal as text_soal, a.text_jawaban, a.namatabelsoal, b.id_kontainer_soal, c.tipe 
    FROM tbl_soal as a 
    JOIN tbl_kontainer_soal as b ON a.id_soal = b.id_soal 
    JOIN tbl_kontainer as c ON b.id_kontainer = c.id_kontainer
    LEFT JOIN tbl_mhs_jawaban as d ON b.id_soal=d.id_soal 
    WHERE b.id_kontainer='${req.params.id}' AND
    d.id_soal IS NULL`, function (err, result, fields) {
            if (err) {
                console.log("masuk error")
                res.status(500).send(err);
            } else {
                console.log("masuk isok")
                res.status(200).send(result);
            }
        })
})
router.get('/getEventId/:id', (req, res) => {
    console.log('get All kuis dgn id');
    console.log(req.params.id)
    req.connection.query(`SELECT id_event FROM tbl_event WHERE id_mhs='${req.params.id}'`, function (err, result, fields) {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(result)
            res.status(200).send(result);
        }
    })
})


router.get('/getCurrentTime/:id', (req, res) => {
    console.log("Get current Time")
    console.log(req.params.id); //id_jadwal

    req.connection.query("SELECT waktu_selesai, tgl_selesai FROM tbl_jadwal where id_jadwal='" + req.params.id + "'", function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            console.log(result)
            // console.log(result[0].waktu_selesai)
            var timess = moment().format(); // July 3rd 2018, 11:44:03 pm
            //2017-08-03T16:36:17.294Z
            var regex = /\d{4}-\d{2}-\d{2}/g //regex get tanggal sekarang
            var regex2 = /\d{2}:\d{2}:\d{2}/g
            payloadTime = {
                serverTime: result[0].waktu_selesai,
                serverDate: result[0].tgl_selesai
            }
            console.log(payloadTime);
            res.status(200).send(payloadTime)
        }
    })
})

router.post('/hapusSesi', (req, res) => {
    console.log(req.body)
    // next()
    var {
        id_event,
        no_induk,
        id_jadwal
    } = req.body
    req.connection.query(`SELECT id_jadwal_kelas FROM tbl_jadwal_kelas where id_jadwal='${id_jadwal}' order by id_jadwal_kelas desc LIMIT 1`, (err, result, fields) => {
        console.log(0)
        if (err) console.log(err)
        console.log(result)
        var id_jadwal_kelas = result[0].id_jadwal_kelas
        req.connection.query(`SELECT SUM(nilai) as nilai, COUNT(nilai) as jml_nilai from tbl_mhs_jawaban where id_event='${id_event}'`, (err, result, fields) => {
            if (err) {
                console.log("1")
                res.status(500).send(err);
            } else {
                console.log("2")
                var nilai = (result[0].nilai / 10) * 10
                console.log("NILAI" + result[0].nilai);

                req.connection.query(`select * from tbl_nilai where id_event='${id_event}' and no_induk='${no_induk}'`, (err, result, fields) => {
                    if (err) {
                        console.log("3" + err)
                        res.status(500).send(err);
                    } else {
                        console.log("4")
                        if (result.length == 0) {
                            req.connection.query(`INSERT INTO tbl_nilai VALUES ('','${no_induk}','${id_event}','${id_jadwal_kelas}','${nilai}')`, (err, result, fields) => {
                                if (err) {
                                    console.log("3" + err)
                                    res.status(500).send(err);
                                } else {
                                    console.log("4")
                                }
                            })
                        }
                    }
                })
            }
        })
    })
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