const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const passwordHash = require('password-hash');

const connection = mysql.createConnection({
    host     : 'kraycenter.ru',
    port     : '3306',
    user     : 'a0274741_invahelp',
    password : 'Hollywood75@',
    database : 'a0274741_invahelp'
});
//connection.connect();
const query = util.promisify(connection.query).bind(connection);

/* GET home page. */
router.get('/', async (req, res, next) => {
    let some = await query(`SELECT * FROM clients`);
    console.log(some);
    res.send(200)
});


router.get('/users/checkAuth', async (req, res, next) => {
    if (req.session.auth) {
        res.send(true)
    } else res.send(false)
});

router.get('/users/logout', async (req, res, next) => {
    req.session.auth = false;
    res.sendStatus(200)
});

<<<<<<< HEAD
router.post('/users/reg',async  (req, res, next) => {
=======
router.post('/users/reg', async (req, res, next) => {
>>>>>>> 314bef90ec95c40c7a3db38b502270743ec63a37
   if (req.body && !req.session.auth) {
       let SQL = 'INSERT INTO';
       switch (req.body.type) {
           case 0: SQL += '`clients`'; break;
           case 1: SQL += '`volunteers`'; break;
           case 2: SQL += '`drivers`'; break;
       }
       SQL += '(`id`, ';

       for (prop of Object.keys(req.body)) {
           SQL += `'${prop}',`;
       }
       SQL = SQL.slice(0,-1) + ') VALUES (NULL,';
       for (propName of Object.keys(req.body)) {
			if (propName === 'password_hash') {
				SQL += `'${passHash(req.body[propName])}'`;
			} else SQL += `'${req.body[propName]}',`;
       }
		SQL = SQL.slice(0,-1) + ')';
		try {
			let resp = await query(SQL);
			if (resp) {
				req.session.auth = true;
				req.session.id = resp.id;
				req.session.userType = req.body.type;
				 res.sendStatus(200)
			} else throw Error();
		} catch (err) {
			console.log(err);
			res.sendStatus(401);
		}
   } else res.json({
		status: 403,
		detail: 'Проверьте корректность данных'		
	});
});

router.post('/users/login', async (req, res, next) => {
    if (req.body) {
		let SQL = '';
		switch (req.body.type) {
           case 0: SQL += '`clients`'; break;
           case 1: SQL += '`volunteers`'; break;
           case 2: SQL += '`drivers`'; break;
        }
        let users = await query(`SELECT * FROM ${SQL}`);
        let finded = false;
        for (user of users) {
            if (user.email === req.body.email) {
                finded = true;
                if (passwordHash.verify(req.body.password, user.password_hash)) {
                    startSession(req, user);
                    res.json({
                        status: 200
                    })
                } else res.json({
                        status: 401,
                        reason: "Неправильный пароль"
                    });
                break;
            }
        }
        if (!finded) res.json({
            status: 401,
            reason: "Неправильный email"
        })
        // let hashedPassword = passwordHash.generate(req.body.password);
    }
});

router.get('/orders/getMyOrders', async (req, res, next) => {
	let response = await query(``);


})

function passHash(password) {
	return passwordHash.generate(password);
}

function startSession(req, user) {
    req.session.auth = true;
	// switch (user)
}
module.exports = router;
