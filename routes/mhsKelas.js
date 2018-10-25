const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    console.log('select kelas by id ' + req.params.id);
    req.connection.query("SELECT id_mhs_kelas as id, mk.id_kelas, NIM, nama FROM tbl_user u JOIN tbl_mhs_kelas mk ON u.no_induk = mk.NIM JOIN tbl_kelas k ON mk.id_kelas = k.id_kelas where k.id_kelas='" + req.params.id + "'", function (err, result, fields) {
        if (err) throw err;
        // console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    });

})

router.get('/:id/show', (req, res) => {
    console.log('getMhsKelas by id ' + req.params.id);
})

router.post('/insert', (req, res) => {
    var nim = req.body.nim;
    var kelas = req.body.id_kelas;
    req.connection.query("select * from tbl_mhs_kelas where NIM='" + nim + "' and id_kelas='" + kelas + "'", function (err, result, fields) {
        if (err) console.log(err);
        if (result.length == 0) {
            console.log(req.body.nim + " , " + req.body.id_kelas);
            req.connection.query("insert into tbl_mhs_kelas values('', '" + nim + "', '" + kelas + "')", function (err, result, fields) {
                if (err)
                    console.log(err)
                // result.message = "success";
                res.send(result);
            });
        } else {
            // result.message = "failed";
            res.send(result);
        }
    })
})

router.put('/:id', (req, res) => {
    console.log('getMhsKelas by id ' + req.params.id);
    req.connection.query("update tbl_mhs_kelas set id_kelas='" + req.body.id_kelas + "', NIM='" + req.body.NIM + "' where id_mhs_kelas='" + req.params.id + "' ", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})

router.delete('/delete/:id', (req, res) => {
    console.log("delete, " + req.params.id);
    req.connection.query("DELETE FROM tbl_mhs_kelas where id_mhs_kelas='" + req.params.id + "'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router