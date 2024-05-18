const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const secretToken = process.env.APP_SECRET
const sessionExpires = process.env.SESSION_LIFETIME

class AuthController {
    async register(req, res) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });

        try {
            await user.save();

            const token = jwt.sign({user}, secretToken,
                {
                    expiresIn: parseInt(sessionExpires),
                    notBefore: 0,
                    algorithm: 'HS256',
                });
            res.cookie('token', token, {httpOnly: true, maxAge: sessionExpires * 1000});
            res.send({token});
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno')
        }
    }

    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).send('Usuário ou senha inválidos');
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).send('Usuário ou senha inválidos');
            }

            const token = jwt.sign({user}, secretToken,
                {
                    expiresIn: parseInt(sessionExpires),
                    notBefore: 0,
                    algorithm: 'HS256',
                });

            res.cookie('token', token, {httpOnly: true, maxAge: sessionExpires * 1000});
            res.send({token});
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno')
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.send('Logout efetuado com sucesso');
    }
}

module.exports = new AuthController();