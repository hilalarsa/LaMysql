const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./routes/config');
var moment = require('moment')

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

	res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
	res.header("X-Total-Count", "30");
	res.header("Access-Control-Expose-Headers", "X-Total-Count");
	next();
});
const loginRouter = require('./routes/login')
const kelasRouter = require('./routes/kelas')
const mhsKelasRouter = require('./routes/mhsKelas')
const tabelsampelRouter = require('./routes/tabelsampel')
const paketSoalRouter = require('./routes/paketSoal')
const soalRouter = require('./routes/soal')
const jadwalRouter = require('./routes/jadwal')
const authRouter = require('./routes/auth')
const kontainerSoalRouter = require('./routes/kontainerSoal')
const kuisRouter = require('./routes/kuis')
const latihanRouter = require('./routes/latihan')
const sesiRouter = require('./routes/sesi')
const jadwalSesiRouter = require('./routes/jadwalSesi')
const nilaiRouter = require('./routes/nilai')
const userRouter = require('./routes/user')


//router Auth
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
var url = require('url');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_online_judge'
});

var con2 = mysql.createConnection({
	host: 'localhost',
	user: 'dosen',
	password: 'dosen123',
	database: 'db_online_judge_soal'
});

var con3 = mysql.createConnection({
	host: 'localhost',
	user: 'mahasiswa',
	password: 'mahasiswa123',
	database: 'db_online_judge_soal'
});

app.use(function (req, res, next) {
	req.connection = con
	req.connection2 = con2
	req.connection3 = con3
	next()
})

con.connect(function (err) {
	if (!err) {
		console.log("Database is connected ... ");
	} else {
		console.log("Error connecting database ... ");
	}
});

con2.connect(function (err) {
	if (!err) {
		console.log("Second Database is connected ... ");
	} else {
		console.log("Error connecting second database ... ");
	}
});



app.use('/login', loginRouter)
app.use('/auth', authRouter);
// app.use(function (req, res, next) {
// 	// console.log(req.headers)
// 	if (req.method === 'OPTIONS') {
// 		console.log("OPTIONSSS");
// 		next()
// 	}
// 	if (!req.headers.authorization) {
// 		return res.status(403).json({ error: 'No credentials sent!' });
// 	}
// 	next();
// });
app.use('/jadwalSesi', jadwalSesiRouter);

app.use('/kelas', kelasRouter);
app.use('/mhsKelas', mhsKelasRouter);
app.use('/tabelsampel', tabelsampelRouter);
app.use('/paketSoal', paketSoalRouter);
app.use('/soal', soalRouter);
app.use('/jadwal', jadwalRouter);
app.use('/kontainerSoal', kontainerSoalRouter)
app.use('/kuis', kuisRouter)
app.use('/latihan', latihanRouter)
app.use('/sesi', sesiRouter)
app.use('/nilai', nilaiRouter)
app.use('/user', userRouter)

app.use(bodyParser.json({
	limit: '50mb'
})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	limit: '50mb',
	extended: true
}));

app.get('/getAttempt/:id', (req, res) => {
	console.log('get All kuis dgn id');
	req.connection.query(`SELECT attempt FROM tbl_event WHERE id_mhs='${req.params.id}'`, function (err, result, fields) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(result);
		}
	})
})

app.get('/getEventId/:id', (req, res) => {
	console.log('get All kuis dgn ids');
	req.connection.query(`SELECT id_event FROM tbl_event WHERE id_mhs='${req.params.id}'`, function (err, result, fields) {
		if (err) {
			res.status(500).send(err);
		} else {
			console.log(result)
			res.status(200).send(result);
		}
	})
})
app.listen(5000);