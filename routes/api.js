const express = require('express');
const mysql = require('mysql');
const util = require('util');
const passwordHash = require('password-hash');

const router = express.Router();

function startSession(req) {
  req.session.auth = true;
}

function passHash(password) {
  return passwordHash.generate(password);
}

const connection = mysql.createConnection({
  host: 'kraycenter.ru',
  port: '3306',
  user: 'a0274741_invahelp',
  password: 'Hollywood75@',
  database: 'a0274741_invahelp',
});

connection.connect();
const query = util.promisify(connection.query).bind(connection);

/* GET home page. */
router.get('/', async (req, res) => {
  const some = await query('SELECT * FROM clients');
  console.log(some);
  res.send(200);
});


router.get('/users/checkAuth', async (req, res) => {
  if (req.session.auth) {
    res.send(true);
  } else res.send(false);
});

router.get('/users/logout', async (req, res) => {
  req.session.auth = false;
  res.sendStatus(200);
});

router.post('/users/reg', async (req, res) => {
  if (req.body && !req.session.auth) {
    let SQL = 'INSERT INTO';
    switch (req.body.type) {
      case 0: SQL += '`clients`'; break;
      case 1: SQL += '`volunteers`'; break;
      case 2: SQL += '`drivers`'; break;
      default:
        break;
    }
    SQL += '(`id`, ';

    // for (const prop of Object.keys(req.body)) {
    //   SQL += `'${prop}',`;
    // }

    Object.keys(req.body).forEach((prop) => {
      SQL += `'${prop}',`;
    });

    SQL = `${SQL.slice(0, -1)}) VALUES (NULL,`;

    Object.keys(req.body).forEach((propName) => {
      if (propName === 'password_hash') {
        SQL += `'${passHash(req.body[propName])}'`;
      } else SQL += `'${req.body[propName]}',`;
    });

    // for (const propName of Object.keys(req.body)) {
    //   if (propName === 'password_hash') {
    //     SQL += `'${passHash(req.body[propName])}'`;
    //   } else SQL += `'${req.body[propName]}',`;
    // }


    SQL = `${SQL.slice(0, -1)})`;
    try {
      const resp = await query(SQL);
      if (resp) {
        req.session.auth = true;
        req.session.id = resp.id;
        req.session.userType = req.body.type;
        res.sendStatus(200);
      } else throw Error();
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  } else {
    res.json({
      status: 403,
      detail: 'Проверьте корректность данных',
    });
  }
});

router.post('/users/login', async (req, res) => {
  if (req.body) {
    let SQL = '';
    switch (req.body.type) {
      case 0: SQL += '`clients`'; break;
      case 1: SQL += '`volunteers`'; break;
      case 2: SQL += '`drivers`'; break;
      default:
        break;
    }
    const users = await query(`SELECT * FROM ${SQL}`);
    let finded = false;

    users.forEach((user) => {
      if (user.email === req.body.email) {
        finded = true;
        if (passwordHash.verify(req.body.password, user.password_hash)) {
          startSession(req, user);
          res.json({
            status: 200,
          });
        } else {
          res.json({
            status: 401,
            reason: 'Неправильный пароль',
          });
        }
      }
    });

    // for (const user of users) {
    //   if (user.email === req.body.email) {
    //     finded = true;
    //     if (passwordHash.verify(req.body.password, user.password_hash)) {
    //       startSession(req, user);
    //       res.json({
    //         status: 200,
    //       });
    //     } else {
    //       res.json({
    //         status: 401,
    //         reason: 'Неправильный пароль',
    //       });
    //     }
    //     break;
    //   }
    // }

    if (!finded) {
      res.json({
        status: 401,
        reason: 'Неправильный email',
      });
    }
    // let hashedPassword = passwordHash.generate(req.body.password);
  }
});

// router.get('/orders/getMyOrders', async (req, res, next) => {
//   const response = await query('');
// });

module.exports = router;
