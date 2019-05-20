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
      case '0': SQL += '`clients`'; break;
      case '1': SQL += '`volunteers`'; break;
      case '2': SQL += '`drivers`'; break;
      default:
        break;
    }
    let password = passHash(req.body.password);
    SQL += `(\`id\`, \`firstName\`, \`lastName\`, \`surname\`, \`tel\`, \`email\`, \`regTime\`, \`lastEnterTime\`, \`status\`, \`password_hash\`) VALUES (NULL, '${req.body.firstName}', '${req.body.lastName}', '${req.body.surname}', '${req.body.tel}', '${req.body.email}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, '${password}')`;
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

router.get('/users/:id', async (req, res) => {
  if (req.body) {
    let table = '';
    switch (req.body.type) {
      case '0': table = '`clients`'; break;
      case '1': table = '`volunteers`'; break;
      case '2': table = '`drivers`'; break;
      default:
      break;
    }
    try {
      const users = await query(`SELECT * FROM ${table} WHERE \`id\` = '${req.params.id}'`);
      if (users.length == 0) throw new Error('Нет такого пользователя');  
      res.json(users);
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Не указан тип пользователя'
  })
})

router.get('/users/me', async (req, res) => {
  if (req.session.auth) {
    const user = await query(`SELECT * FROM ${req.session.userType} WHERE \`id\` = '${req.session.id}'`);
    res.json(user)
  } else res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.get('/orders/', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE \`${req.session.userType.slice(0,-1)}Id\` = '${req.session.id}'`);
      if (orders.length == 0) throw new Error('У вас нет заказов');  
      res.json(orders)
    } catch (err) {
      res.json({
        status: 404,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } else res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.get('/orders/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE \`id\` = '${req.params.id}'`);
      if (orders.length == 0) throw new Error('Нет такого заказа');
      res.json(orders);
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.post('/orders/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`UPDATE \`orders\` SET services='${req.body.services}', status='${req.body.status}', clientId='${req.body.clientId}', driverId='${req.body.clientId}', volunteerId='${req.body.volunteerId}', payload='${req.body.payload}' WHERE \`id\` = '${req.params.id}'`);
      console.log(orders);
      if (orders.changedRows == 0) throw new Error('Нет такого заказа');
      res.json({status:200});
    }catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.post('/orders/add', async (req, res) => {
  if (req.session.auth) {
    try {
      const order = await query(`INSERT INTO \`orders\` services='${req.body.services}', status='${req.body.status}', clientId='${req.body.clientId}', driverId='${req.body.clientId}', volunteerId='${req.body.volunteerId}', payload='${req.body.payload}' WHERE \`id\` = '${req.params.id}'`);
      if (order.insertId == 0) throw new Error('Что-то не так, повторите еще раз');
      res.json({ status: 200 });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.get('/orders/my', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE ${req.session.userType}Id = '${req.session.id}'`);
      if (orders.length == 0) throw new Error('У вас еще нет заказов');
      res.json({ status: 200, orders: orders});
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.delete('/orders/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE ${req.session.userType}Id = '${req.session.id}'`);
      res.json({ status: 200, orders: orders });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

router.get('/orders/checkStatus/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const order = await query(`SELECT * FROM \`orders\` WHERE id = '${req.params.id}'`);
      res.json({ status: 200, status: order.status });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка'
      })
    }
  } res.json({
    status: 401,
    reason: 'Вы не авторизованы'
  })
})

module.exports = router;
