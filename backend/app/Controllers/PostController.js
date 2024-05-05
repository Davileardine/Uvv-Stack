const Post = require('../Models/Post');
const Comment = require('../Models/Comment');

class PostController {
    async getPost(req, res) {
        const post_id = req.params.id;

        try {
            const post = await Post.findById(post_id)
                .populate('author')
                .populate('stack')
                .populate('tags')
                .populate('comments');
            res.status(200).send(post);
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno');
        }
    }

    async getPosts(req, res) {
        const page = req.query.page ?? 1;
        const per_page = req.query.per_page ?? 10;
        const stack = req.query.stack ?? null;
        const tags = req.query.tags ?? null;
        const search = req.query.search ?? null;

        const query = {};

        if (stack) {
            query.stack = stack;
        }

        if (tags) {
            query.tags = tags;
        }

        if (search) {
            query.title = new RegExp(search, 'i');
        }

        try {
            const posts = await Post.find(query)
                .populate('author')
                .populate('stack')
                .populate('tags')
                .populate('comments')
                .skip((page - 1) * per_page)
                .limit(per_page);
            res.status(200).send(posts);
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno');
        }
    }

    async createPost(req, res) {
        const user_id = req.auth._id;
        const title = req.body.title;
        const content = req.body.content;
        const stack = req.body.stack;
        const tags = req.body.tags ?? [];

        const post = new Post({
            title: title,
            content: content,
            stack: stack,
            author: user_id,
            tags: tags
        });

        try {
            await post.save();
            res.status(201).send(post);
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno');
        }
    }

    async updatePost(req, res) {
        const user_id = req.auth._id;
        const post_id = req.params.id;
        const title = req.body.title;
        const content = req.body.content;
        const tags = req.body.tags ?? [];

        const post = await Post.findById(post_id)

        if (!post) {
            return res.status(404).send({message: 'Post não encontrado'});
        }

        if (post.author !== user_id) {
            return res.status(401).send({message: 'Você não tem permissão para editar este post'});
        }

        try {
            await Post.findByIdAndUpdate(
                {_id: post_id},
                {
                    title: title,
                    content: content,
                    tags: tags,
                    updated_at: Date.now()
                });
            res.status(200).send({message: 'Post atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno')
        }
    }

    async deletePost(req, res) {
        const user_id = req.auth._id;
        const post_id = req.params.id;

        const post = await Post.findById(post_id)

        if (!post) {
            return res.status(404).send({message: 'Post não encontrado'});
        }

        if (post.author !== user_id) {
            return res.status(401).send({message: 'Você não tem permissão para deletar este post'});
        }

        try {
            const comments = await Comment.find({post: post_id});
            comments.deleteMany();
            await Post.findByIdAndDelete(post_id);
            // TODO: Verificar se estes posts sao deletados da model do usuario

            res.status(204).send({message: 'Post deletado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno')
        }
    }

}

module.exports = new PostController();