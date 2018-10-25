const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    console.log("get tabelsampel no id")
    req.connection2.query(`SELECT k.col as kolom,
    create_time as id, k.table_name, table_rows 
    FROM information_schema.tables a
    JOIN (SELECT GROUP_CONCAT(COLUMN_NAME SEPARATOR ' | ') AS col,
    TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='db_online_judge_soal' GROUP BY(TABLE_NAME)) k
    on a.TABLE_NAME = k.TABLE_NAME
    where table_schema='db_online_judge_soal'`, function (err, result, fields) {
            if (err) return console.log(err);

            console.log(result);
            res.send(result);

            // console.log(fields);
            // res.send({ express: result });
        });

})
router.get('/:id', (req, res) => {
    console.log("get tabelsampel by idsssss")
    console.log(req.params.id)
    req.connection2.query("SELECT create_time as id, table_name, table_rows FROM information_schema.tables where table_schema='db_online_judge_soal' ", function (err, result, fields) {
        if (err) return console.log(err);

        console.log(result);
        res.send(result);
    });
})

router.get('/detail/:id', (req, res) => {
    console.log("get tabelsampel by id")
    console.log("ini req" + req.params.id)
    /*Callback 1*/
    req.connection2.query("DESCRIBE " + req.params.id, function (err, result, fields) { //return baris nama field
        if (err) return console.log(err)
        var table_list = []
        var tables = result
        tables.forEach((table) => {
            table_list.push({
                "Header": table.Field,
                "accessor": table.Field
            }); //header dan accessor untuk format react-table, gaiso digenti
        })
        /*Callback 2*/
        req.connection2.query("SELECT * FROM " + req.params.id, function (err, result2, fields) {
            var paket = {}
            paket['fields'] = table_list
            paket['isi'] = result2 //merge jadi 1 array utk dikirim ke react component detailTabelSampel

            res.send(paket) //dikirim di callback 2 karena saat callback pertama berhasil gak ada gunanya tanpa dapat hasil dari callback 2
        }) //query 2

    });
})

router.post('/', (req, res) => {
    console.log("POST!");

    req.connection2.query(req.body.create, function (err, result, fields) {
        if (err) {
            console.log("Error query 1");
            res.status(500).send("Error")
        }
    })
    req.connection2.query(req.body.insert, function (err, result2, fields) {
        if (err) {
            console.log("Error query 2");
            res.status(500).send("Error")
        } else {
            console.log("Error query 3");
            res.status(200).send(result2)
        }
    })
})

router.delete('/:id', (req, res) => {
    console.log("delete");
    req.connection2.query(`drop table ${req.params.id}`, function (err, result, fields) {
        if (err) {
            console.log("Error query 1");
            res.status(500).send("Error")
        }else{
            res.sendStatus(200);
        }
    })
})

module.exports = router