const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// var User = require('../user/User');
var config = require('./config');

router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var payload=({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")

            // create a token
            var token = jwt.sign({ payload: payload }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
});


module.exports = router