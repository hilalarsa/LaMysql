const express = require('express')
const router = express.Router()
const moment = require('moment')


router.get('/', (req, res) => {
    console.log('get jadwal sesi');
    var current_time = moment().format('HH:mm:ss')
    req.connection.query(`SELECT a.id_jadwal as id, 
    DATE_FORMAT(a.tgl_mulai, '%d-%m-%Y') as tgl_mulai, 
    DATE_FORMAT(a.tgl_selesai, '%d-%m-%Y') as tgl_selesai, 
    a.waktu_mulai, a.waktu_selesai, 
    c.id_kontainer as paket,
    c.tipe, c.keterangan
    FROM tbl_jadwal as a
    JOIN tbl_kontainer_soal as b ON a.id_kontainer=b.id_kontainer
    JOIN tbl_kontainer as c ON b.id_kontainer=c.id_kontainer
    WHERE tgl_mulai <= CURRENT_DATE() 
    and tgl_selesai >= CURRENT_DATE() and(
    a.waktu_mulai <= '${current_time}'
    and a.waktu_selesai >= '${current_time}')
    `, function (err, result, fields) {
        console.log(moment().format('HH:mm:ss')) // July 14th 2018, 9:28:28 pm)
        if(result=="")
        { 
            console.log("Bad request");
            console.log(result);
            res.status(404).send();
        }else{
             console.log("Good request");
             console.log(result);
             console.log({result});
            res.status(200).json(result)
        }
        // console.log(result);
    })
}) 

router.get('/:id', (req, res) => {
    console.log('get jadwal by id ' + req.params.id);
})

router.post('/tambahEvent', (req, res) => {

    console.log("Tambah event");
    var id_mhs = req.body.id_mhs
    var waktu_mulai_event = req.body.waktu_mulai_event
    var attempt = req.body.attempt
    var status = req.body.status
    var id_kontainer = req.body.id_kontainer
    var id_jadwal = req.body.id_jadwal
    // var query = `INSERT INTO tbl_event VALUES('${id_mhs}','${waktu_mulai_event}','${attempt}','${status}','${id_kontainer}')`
    // console.log(query)
    req.connection.query(`INSERT INTO tbl_event VALUES('','${id_mhs}','${waktu_mulai_event}','${attempt}','${status}','${id_kontainer}','${id_jadwal}')`, function (err, result, fields) {
        if (err) console.log(err);
        res.send(result);
    });
})

router.get('/getEvent/:id', (req, res) => {
    console.log(req.params.id)
    // var query = `INSERT INTO tbl_event VALUES('${id_mhs}','${waktu_mulai_event}','${attempt}','${status}','${id_kontainer}')`
    // console.log("QERJA LEMBUR BAGAI QUDA")
    req.connection.query(`SELECT * FROM tbl_event WHERE id_mhs='${req.params.id}'`, function (err, result, fields) { //check apakah id event localstorage sudah melakukan kuis
        if (err){
            res.status(500).send(err)
            console.log("QERJA")
        }else{
            if(result==''){
                var message = {
                    message: "KERJAKAN"
                }
                console.log("KERJAKAN DARI AWAL") //jika data ada gak ada isinya, berarti user belum garap
                res.send( message )
            }else{
                var message = {
                    message: "LANJUTKAN",
                    result: result
                }
                console.log("SUDAH ADA DI SESI")
                var error = new Error("Sudah ada di sesi") //jika data ada isinya, berarti sebelumnya sdah masuk sesi
                res.send( message )
            }
        }
    });
})

module.exports = router