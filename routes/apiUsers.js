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