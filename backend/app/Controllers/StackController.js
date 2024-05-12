const Stack = require('../Models/Stack');
const Post = require('../Models/Post');

class StackController {
    //GET /stack/:id
    async getStack(req, res) {
        const id = req.params.id;
        try {
            const stack = await Stack.findById(id);
            if (!stack) {
                return res.status(404).send('Stack não encontrada');
            }
            const posts = await Post.find({stack: id})
                .populate('author', 'name')
                .sort({created_at: -1});

            res.status(200).send({
                message: 'Stack encontrada',
                stack,
                posts
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro Interno');
        }
    }

    //POST /stack
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