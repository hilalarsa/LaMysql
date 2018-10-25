const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    console.log('get nilai id= ' + req.params.id);
    req.connection.query(`SELECT jk.id_kelas as kelas, n.no_induk as nim, u.nama as nama, n.nilai as nilai, j.keterangan as jadwal, id_event
    FROM tbl_nilai n JOIN tbl_user u on n.no_induk=u.no_induk
    JOIN tbl_jadwal_kelas jk on n.id_jadwal_kelas=jk.id_jadwal_kelas
    JOIN tbl_jadwal j on jk.id_jadwal=j.id_jadwal
    WHERE n.id_jadwal_kelas='${req.params.id}'`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
})

router.get('/jadwal/:nip', (req, res) => {
    console.log('get jadwal nilai');
    if (req.params.nip == 'superadmin') {
        //     req.connection.query(`select DISTINCT jk.id_jadwal_kelas as id,
        // concat(j.keterangan,' - ',jk.id_kelas) as jadwal
        // from tbl_jadwal_kelas jk join tbl_kelas k on jk.id_kelas=k.id_kelas
        // join tbl_jadwal j on jk.id_jadwal=j.id_jadwal`, function (err, result, fields) {
        //         if (err) throw err;
        //         res.send(result);
        //         console.log(result);
        //     });
        req.connection.query(`select DISTINCT jk.id_jadwal_kelas as id,
        j.keterangan as jadwal, jk.id_kelas as kelas
        from tbl_jadwal_kelas jk join tbl_kelas k on jk.id_kelas=k.id_kelas
        join tbl_jadwal j on jk.id_jadwal=j.id_jadwal`, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
                console.log(result);
            });
    } else {
        //     req.connection.query(`select DISTINCT jk.id_jadwal_kelas as id,
        // concat(j.keterangan,' - ',jk.id_kelas) as jadwal
        // from tbl_jadwal_kelas jk join tbl_kelas k on jk.id_kelas=k.id_kelas
        // join tbl_jadwal j on jk.id_jadwal=j.id_jadwal
        // WHERE k.NIP='${req.params.nip}'`, function (err, result, fields) {
        //             if (err) throw err;
        //             res.send(result);
        //             console.log(result);
        //         });
        req.connection.query(`select DISTINCT jk.id_jadwal_kelas as id,
        j.keterangan as jadwal, jk.id_kelas as kelas
        from tbl_jadwal_kelas jk join tbl_kelas k on jk.id_kelas=k.id_kelas
        join tbl_jadwal j on jk.id_jadwal=j.id_jadwal
        WHERE k.NIP='${req.params.nip}'`, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
                console.log(result);
            });
    }
})

router.get('/mhs/:nim', (req, res) => {
    console.log('get jadwal nilai');
    req.connection.query(`SELECT n.id_nilai, jk.id_kelas as kelas, n.no_induk as nim, 
    j.keterangan as jadwal ,nilai
    FROM tbl_nilai n JOIN tbl_jadwal_kelas jk on n.id_jadwal_kelas=jk.id_jadwal_kelas
    JOIN tbl_jadwal j on jk.id_jadwal=j.id_jadwal
    WHERE no_induk='${req.params.nim}'
    GROUP BY(n.id_jadwal_kelas) ORDER BY(kelas)desc`
        , function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
})

router.get('/jawaban/:id', (req, res) => {
    console.log('get jadwal');
    req.connection.query(`select concat(id_mhs_jawaban, '-', nilai) as jawaban,
        id_mhs_jawaban as id, id_event,
        s.text_jawaban as k_jwb, j.text_jawaban as m_jwb,
        j.nilai as nilai 
        from tbl_mhs_jawaban j join tbl_soal s on j.id_soal=s.id_soal
        where id_event='${req.params.id}'`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
})

router.post('/editNilaiTotal', (req, res) => {
    console.log(req.body.id);
    req.connection.query(`SELECT SUM(nilai) as nilai, COUNT(nilai) as jml_nilai from tbl_mhs_jawaban where id_event='${req.body.id}'`, (err, result, fields) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(result)
            var nilai = (result[0].nilai / 10) * 10
            console.log("NILAI" + result[0].nilai);

            req.connection.query(`update tbl_nilai set nilai='${nilai}' where id_event='${req.body.id}'`, (err, result, fields) => {
                if (err) {
                    console.log("3" + err)
                    res.status(500).send(err);
                } else {
                    console.log("4")
                }
            })
        }
    })
})

router.post('/editNilai', (req, res) => {
    console.log(req.body);
    req.connection.query(`update tbl_mhs_jawaban set nilai='${req.body.nilai}' where id_mhs_jawaban='${req.body.id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.get('/:id', (req, res) => {
    console.log('get jadwal');
    req.connection.query(`SELECT j.id_jadwal as id, 
    DATE_FORMAT(tgl_mulai, '%Y-%m-%d') as tanggal_mulai, 
    DATE_FORMAT(tgl_selesai, '%Y-%m-%d') as tanggal_selesai, 
    waktu_mulai, waktu_selesai, 
    concat(j.id_kontainer, '-', k.keterangan) as paket,
    j.id_kontainer as id_kontainer,
    GROUP_CONCAT(jk.id_kelas) as kelas,
    j.keterangan as keterangan
    from tbl_jadwal j LEFT JOIN tbl_jadwal_kelas jk on j.id_jadwal = jk.id_jadwal
    JOIN tbl_kontainer k on j.id_kontainer = k.id_kontainer
    where j.id_jadwal='${req.params.id}'
    GROUP BY(j.id_jadwal) order by(j.id_jadwal) desc`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
})

router.post('/kelas/', (req, res) => {
    console.log('next')
    var kelas = req.body.kelas
    req.connection.query(`select id_jadwal from tbl_jadwal order by(id_jadwal) desc limit 1`, function (err, result, fields) {
        if (err) throw err
        else {
            var jadwal = result[0].id_jadwal;
            req.connection.query(`select * from tbl_jadwal_kelas where id_jadwal='${jadwal}'
            and id_kelas='${kelas}'`, function (err, result, fields) {
                    if (err) throw err
                    else {
                        if (result.length == 0) {
                            req.connection.query(`insert into tbl_jadwal_kelas values('','${jadwal}', '${kelas}')`, function (err, result, fields) {
                                if (err)
                                    console.log(err)
                                else
                                    console.log('submit berhasil')
                                // res.send(result);
                            });
                        }
                    }
                });
        }
        res.send(result);
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    req.connection.query(`insert into tbl_jadwal values('', '${req.body.tanggal_mulai}','${req.body.tanggal_selesai}','${req.body.waktu_mulai}','${req.body.waktu_selesai}','${req.body.id_kontainer}','${req.body.keterangan}')`, function (err, result, fields) {
        if (err)
            throw err
        res.send(result);
    });
    // res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    // console.log('edit jadwal by id ' + req.params.id);
    console.log(req.body)
    req.connection.query(`update tbl_jadwal set tgl_mulai='${req.body.tanggal_mulai}', 
    tgl_selesai='${req.body.tanggal_selesai}',
    waktu_mulai='${req.body.waktu_mulai}',
    waktu_selesai='${req.body.waktu_selesai}',
    id_kontainer='${req.body.id_kontainer}',
    keterangan='${req.body.keterangan}'
    where id_jadwal='${req.params.id}' `, function (err, result, fields) {
            if (err) throw err
            else {
                req.connection.query(`delete from tbl_jadwal_kelas where id_jadwal='${req.params.id}'`, function (err, result, fields) {
                    if (err)
                        console.log(err)
                });
            }
            res.send(result);
            console.log(result);
        });
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query(`DELETE FROM tbl_nilai where id_jadwal_kelas='${req.params.id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router