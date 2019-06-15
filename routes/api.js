const express = require('express');
const mysql = require('mysql');
const util = require('util');
const passwordHash = require('password-hash');

function startSession(req) {
  req.session.auth = true;
}

function passHash(password) {
  return passwordHash.generate(password);
}

const router = express.Router();

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
// router.get('/', async (req, res) => {
//   const some = await query('SELECT * FROM clients');
//   console.log(some);
//   res.json(some);
// });

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
  if (req.body) {
    const password = passHash(req.body.password);
    const SQL = `INSERT INTO \`users\` (\`id\`,\`role\`,\`firstname\`,\`lastname\`,\`surname\`,\`phone\`,\`email\`,\`home address\`,\`password hash\`,\`сonfirmation status\`,\`registration time\`,\`last enter time\`,\`disability group\`,\`restriction type\`) VALUES (NULL, '${req.body.role}','${req.body.firstname}','${req.body.lastname}','${req.body.surname}','${req.body.phone}','${req.body.email}',NULL,'${password}',NULL,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL,NULL)`;
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

router.get('/users/login', async (req, res) => {
  if (req.body) {
    const users = await query(`SELECT * FROM \`users\``);
    let finded = false;
    users.forEach((user) => {
      console.log(`${user.email}, ${req.body.email}`);
      if (user.email === req.body.email) {
        finded = true;
        if (passwordHash.verify(req.body.password, user['password hash'])) {
          startSession(req, user);
          req.session.auth = true;
          req.session.id = user.id;
          req.session.role = user.role;
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

    if (!finded) {
      res.json({
        status: 401,
        reason: 'Неправильный email',
      });
    }
  }
});

router.get('/users/:id', async (req, res) => {
  if (req.body) {
    try {
      const user = await query(`SELECT * FROM \`users\` WHERE \`id\` = '${req.params.id}'`);
      if (!user) throw new Error('Нет такого пользователя');
      res.json(user);
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
});

router.get('/users/me', async (req, res) => {
  if (req.session.auth) {
    const user = await query(`SELECT * FROM \`users\` WHERE \`id\` = '${req.session.id}'`);
    res.json(user);
  } else {
    res.json({
      status: 401,
      reason: 'Вы не авторизованы',
    });
  }
});

router.put('/users/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const user = await query(`SELECT * FROM \`users\` WHERE \`id\` = '${req.session.id}'`);
      if (user.id !== req.session.id) throw new Error('Это не ваш аккаунт');
      const update = await query(`UPDATE \`users\` SET (\`firstname\`,\`lastname\`,\`surname\`,\`phone\`,\`home address\`,\`disability group\`) VALUES ( '${req.body.firstname}', '${req.body.lastname}', '${req.body.surname}', '${req.body.phone}', '${req.body.homeAddress}', '${req.body.disabilityGroup}') WHERE \`id\` = req.session.id)`);
      if (update) {
        req.json({
          status: 200,
          user: update,
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        reason: err,
      });
    }
  }
});

// TODO: доделать запрос для получения всех заказов в админке
// router.get('/orders/', async (req, res) => {
//   if (req.session.auth) {
//     try {
//       const orders = await query
// (`SELECT * FROM \`orders\` WHERE \`${req.session.userType.
// slice(0, -1)}Id\` = '${req.session.id}'`);
//       if (orders.length === 0) throw new Error('У вас нет заказов');
//       res.json(orders);
//     } catch (err) {
//       res.json({
//         status: 404,
//         reason: err || 'Возникла непредвиденная ошибка',
//       });
//     }
//   } else {
//     res.json({
//       status: 401,
//       reason: 'Вы не авторизованы',
//     });
//   }
// });

// Получение списка заказов текущего пользователя
router.get('/orders/', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE \`user id\` = '${req.body.id}'`);
      if (orders.length === 0) res.send('У вас еще нет заказов');
      else {
        res.json(orders);
      }
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
  res.json({
    status: 401,
    reason: 'Вы не авторизованы',
  });
});

// Получение конкретного заказа
router.put('/orders/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`UPDATE \`orders\` SET service='${req.body.services}', status='${req.body.status}', clientId='${req.body.clientId}', driverId='${req.body.clientId}', volunteerId='${req.body.volunteerId}', payload='${req.body.payload}' WHERE \`id\` = '${req.params.id}'`);
      console.log(orders);
      if (orders.changedRows === 0) throw new Error('Нет такого заказа');
      res.json({
        status: 200,
      });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
  res.json({
    status: 401,
    reason: 'Вы не авторизованы',
  });
});

router.post('/orders/', async (req, res) => {
  if (req.session.auth) {
    try {
      await query(`INSERT INTO \`orders\` (\`service id\`,\`execution status\`,\`user id\`,\`executor id\`,\`registration time\`,\`appointed time\`,\`date of completion\`,\`client address\`,\`destination address\`,\`shopping list\`,\`payment method\`) VALUES ('${req.body.service}',False,'${req.body['user id']}',NULL,CURRENT_TIMESTAMP,'${req.body['appointed time']}',NULL,'${req.body['client address']}','${req.body['destination address']}','${req.body['shopping list']}','${req.body['payment method']}')`);
      res.json({
        status: 200,
      });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
  res.json({
    status: 401,
    reason: 'Вы не авторизованы',
  });
});

// router.get('/orders/my', async (req, res) => {
//   if (req.session.auth) {
//     try {
//       const orders = await query(`
//         SELECT * FROM\ `
//         orders\ ` WHERE ${req.session.userType}Id = '${req.session.id}'`);
//       if (orders.length === 0) throw new Error('У вас еще нет заказов');
//       res.json({
//         status: 200,
//         orders,
//       });
//     } catch (err) {
//       res.json({
//         status: 401,
//         reason: err || 'Возникла непредвиденная ошибка',
//       });
//     }
//   }
//   res.json({
//     status: 401,
//     reason: 'Вы не авторизованы',
//   });
// });

router.delete('/orders/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      const orders = await query(`SELECT * FROM \`orders\` WHERE ${req.session.userType}Id = '${req.session.id}'`);
      res.json({
        status: 200,
        orders,
      });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
  res.json({
    status: 401,
    reason: 'Вы не авторизованы',
  });
});

router.get('/orders/checkStatus/:id', async (req, res) => {
  if (req.session.auth) {
    try {
      await query(`SELECT * FROM \`orders\` WHERE id = '${req.params.id}'`);
      res.json({
        status: 200,
      });
    } catch (err) {
      res.json({
        status: 401,
        reason: err || 'Возникла непредвиденная ошибка',
      });
    }
  }
  res.json({
    status: 401,
    reason: 'Вы не авторизованы',
  });
});

module.exports = router;
