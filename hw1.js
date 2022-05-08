const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 6000;
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
let user = require('./user.json');

app.get('/user', function (req, res, next) {
    return res.status(200).json({
        code: 1,
        message: 'YES',
        data: user
    })
});
app.post('/user', function (req, res, next) {


    let user = {}
    user.id = user.length + 1;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.pos = req.body.pos;
    user.phone = req.body.phone;
    user.email = req.body.email;

    console.log('user.length : ', user.length)
    for (let i = 0; i < user.length; i++) {
        console.log('i : ', i)

        if (user[i].phone == user.phone || user[i].email == user.email) {
            return res.status(400).send('data incorrect');
        }
    }



    user.push(user);

    return res.status(201).json({
        code: 1,
        message: 'YES',
        data: user
    });
});

app.put('/user/:id', function (req, res, next) {
    const replace = req.params.id;
    const pos = user.findIndex(function (val) {
        return val.id == replace;
    });
    console.log(user[pos]);
    if (req.body.firstname || req.body.lastname) {
        res.status(400).send('incorrect');
    }

    try {
        user[pos].pos = req.body.pos;
        user[pos].phone = req.body.phone;
        user[pos].email = req.body.email;
        return res.status(200).json({
            code: 1,
            message: 'YES',
            data: user
        });
    } catch (error) {
        res.status(400).send('incorrect');
    }
})

app.delete('/user/:id', function (req, res, next) {
    const remove = req.params.id;
    try {
        const pos = user.findIndex((val) => {
            return val.id == remove;
        });
        user.splice(pos, 1);
        return res.status(200).json({
            code: 1,
            message: 'YES',
            data: user
        })
    } catch (error) {
        res.status(400).send('incorrect');
    }
})

app.listen(port, () => {
    console.log(`Server Running`);
});