const Comment = require('../Models/Comment');


class CommentController {
    async postComment(req, res) {
        const id_post = req.body.id_post;
        const com = req.body.content


        const newCom = new Comment({
            content: com,
            author: req.auth._id,
            post: id_post,
        })
        try {
            const saved_com = await newCom.save();
            res.status(201).json({
                message: 'Mensagem Salvada no Backend!',
                data: saved_com
            });
        } catch (err) {
            res.status(500).json({
                message: 'Erro ao salvar comentário no banco!',
                error: err
            });
        }

    }


    async editComment(req, res) {

        const id_post = req.body.id_post;
        const content = req.body.content;

        const userId = req.auth._id;
        const commentId = req.paramns.id;

        const comment = await Comment.findById(commentId);

        if (userId !== comment.author) {
            return res.status(401).send('Você não tem permissão!')
        }

        try {
            const saveEditComment = await Comment.findOneAndUpdate(
                {_id: id_post},
                {
                    content: content,
                    updated_at: Date.now
                }
            );
            res.status(200).json({
                message: 'Mensagem editada no Backend!',
                data: saveEditComment
            });


        } catch (err) {
            res.status(500).json({
                message: 'Erro ao editar comentário no banco!',
                error: err
            });
        }
    }

    async vote(req, res) {
        const commentId = req.params.id;
        let vote = 0;
        if (req.body.vote === 'up') {
            vote = 1;
        } else {
            vote = -1;
        }

        try {

            const comment = await Comment.findById(commentId);
            comment.votes += vote;
            await comment.save();

            res.status(200).json({message: 'Voto computado com sucesso!'});
        } catch (err) {
            res.status(500).json({message: 'Erro ao computar voto!'});
        }
    }

    //TODO: Implementar a função de deletar um comentário (leite game)
}

module.exports = new CommentController();
