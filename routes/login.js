const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

router.get('/', (req, res) => {
    res.send({
        message: "Unable to load, please gtf!"
    });
})
router.post('/', (req, res) => {
    // console.log(req.body)
    console.log("Post data login " + req.body.username + ", " + req.body.password)
    req.connection.query("SELECT username,level as role,no_induk FROM tbl_user where username='" + req.body.username + "' and password='" + req.body.password + "'", function (err, result, fields) {
        if (err) console.log(err)
        else {
            // console.log(result)
            // var user_list = []
            var users = result
            // console.log(result)
            // console.log(user.role)
            if (users.length == 0) { //error atau hasil query {[]}
                console.log('kosong')
                res.sendStatus(400);
            } else {
                var payload = result //hasil query berupa username dan level	
                var token = jwt.sign({
                    payload
                }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                console.log(payload)
                //buat payload
                //buat jWt, return
                //setelah jwt jadi, kirim token ke react
                // console.log(role)
                res.send({
                    token
                })
                // res.send({ token });

                // res.send({
                // 	user_list
                // })
                // res.json(user_list);
            }
        }
    })
})
//DASHBOARD
//get data jika level == mahasiswa
router.get('/getDataasMhs/:username', (req, res) => {
    console.log(req.params.username);
    req.connection.query("SELECT * from tbl_user join tbl_mhs_kelas on no_induk=NIM WHERE no_induk='" + req.params.username + "' ORDER by (id_kelas) desc LIMIT 1", function (err, result, fields) {
        if (err) {
            res.sendStatus(400);
        } else {
            console.log(result)
            res.send(result);
        }
    });
})

//mhs get active session
router.get('/getActiveSess/:id_kelas', (req, res) => {
    console.log(req.params.id_kelas);
    req.connection.query(`SELECT j.*, jk.id_kelas 
        FROM tbl_jadwal j 
        join tbl_jadwal_kelas jk 
        on j.id_jadwal = jk.id_jadwal 
        WHERE tgl_mulai <= CURRENT_DATE() 
        and tgl_selesai >= CURRENT_DATE() 
        and jk.id_kelas = '${req.params.id_kelas}'`, function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                console.log(result)
                res.send(result);
            }
        });
})

//get data jika level == dosen
router.get('/getDataasDosen/:username', (req, res) => {
    console.log(req.params);
    req.connection.query(`SELECT * from tbl_user join tbl_kelas on no_induk=NIP 
    WHERE no_induk='${req.params.username}' 
    desc limit 1`, function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                console.log(result)
                res.send(result);
            }
        });
})

router.get('/getDataEdit/:id', (req, res) => {
    console.log('edit user');
    req.connection.query(`SELECT * from tbl_user
    WHERE no_induk='${req.params.id}' 
    limit 1`, function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                console.log(result)
                res.send(result);
            }
        });
})

router.put('/editUser', (req, res) => {
    console.log('save edit user');
    req.connection.query(`UPDATE tbl_user set username='${req.body.username}',
    password='${req.body.password}', nama='${req.body.nama}'
    where no_induk='${req.body.id}'
    `, function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                console.log(result)
                res.send(result);
            }
        });
})

module.exports = router