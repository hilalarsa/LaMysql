const express = require('express')
const router = express.Router()

router.get('/:nip', (req, res) => {
    if (req.params.nip == 'superadmin') {
        console.log('get jadwal');
        req.connection.query(`SELECT j.id_jadwal as id, 
    DATE_FORMAT(tgl_mulai, '%d-%m-%Y') as tanggal_mulai, 
    DATE_FORMAT(tgl_selesai, '%d-%m-%Y') as tanggal_selesai, 
    waktu_mulai, waktu_selesai, 
    concat(j.id_kontainer, '-', k.keterangan) as paket,
    GROUP_CONCAT(jk.id_kelas) as kelas,
    j.keterangan as keterangan
    from tbl_jadwal j LEFT JOIN tbl_jadwal_kelas jk on j.id_jadwal = jk.id_jadwal
    JOIN tbl_kontainer k on j.id_kontainer = k.id_kontainer
    JOIN tbl_kelas kel on jk.id_kelas=kel.id_kelas
    GROUP BY(j.id_jadwal) order by(j.id_jadwal) desc`, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
                console.log(result);
            });
    } else {
        console.log('get jadwal');
        req.connection.query(`SELECT j.id_jadwal as id, 
    DATE_FORMAT(tgl_mulai, '%d-%m-%Y') as tanggal_mulai, 
    DATE_FORMAT(tgl_selesai, '%d-%m-%Y') as tanggal_selesai, 
    waktu_mulai, waktu_selesai, 
    concat(j.id_kontainer, '-', k.keterangan) as paket,
    GROUP_CONCAT(jk.id_kelas) as kelas,
    j.keterangan as keterangan
    from tbl_jadwal j LEFT JOIN tbl_jadwal_kelas jk on j.id_jadwal = jk.id_jadwal
    JOIN tbl_kontainer k on j.id_kontainer = k.id_kontainer
    JOIN tbl_kelas kel on jk.id_kelas=kel.id_kelas where kel.NIP='${req.params.nip}'
    GROUP BY(j.id_jadwal) order by(j.id_jadwal) desc`, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
                console.log(result);
            });
    }
})

router.get('/edit/:id', (req, res) => {
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
    req.connection.query(`insert into tbl_jadwal values('', '${req.body.tanggal_mulai}','${req.body.tanggal_selesai}','${req.body.waktu_mulai}:00','${req.body.waktu_selesai}:00','${req.body.id_kontainer}','${req.body.keterangan}')`, function (err, result, fields) {
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
                    else{
                        for(var i=0; i<req.body.kelas.length; i+=1){
                            req.connection.query(`insert into tbl_jadwal_kelas values('','${req.params.id}','${req.body.kelas[i]}')`, function (err, result, fields) {
                                if (err)
                                    console.log(err)
                            });
                        }
                    }
                });
            }
            res.send(result);
            console.log(result);
        });
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection.query("DELETE FROM tbl_jadwal where id_jadwal='" + req.params.id + "'", function (err, result, fields) {
        if (err) console.log(err);
        else
            res.send(result);

    });
})

module.exports = router