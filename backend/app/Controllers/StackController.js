const Stack = require('../Models/Stack');

class StackController {
    async createStack(req, res) {
        const name = req.body.name;
        try {
            const stack = await Stack.create({name});
            res.status(201).send(stack);
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro Interno');
        }
    }
}

module.exports = new StackController();