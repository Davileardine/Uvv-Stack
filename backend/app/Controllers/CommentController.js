const Comment = require('../Models/Comment');



class CommentController {
    async postComment(req, res) {
        const id_post = req.body.id_post;
        const com = req.body.content
        

        const newCom = new Comment({
            content: com,
            user: req.auth._id, //TODO: Receber via sessão
            post: id_post,      
        })
        try{
            const saved_com = await newCom.save();
            res.status(201).json({
                message: 'Mensagem Salvada no Backend!',
                data: saved_com
            });
        }
            
        catch (err){
            res.status(500).json({
                message: 'Erro ao salvar comentário no banco!',
                error: err
            });
        }
       
    }


    async editComment(req, res) {
        
        const id_post =  req.body.id_post;
        const content = req.body.content;

        const userId = req.auth._id;
        const commentId = req.paramns.id;
        
        const comment = await Comment.findById(commentId);

        if(userId !== comment.user){
            return res.status(401).send('Você não tem permissão!')
        }
        // const edited_com = new Comment({
        //     content: com,
        //     user: user, //TODO: Receber via sessão
        //     post: id_post,   
        //     edited_at: Date.now
        
        try{
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
       
    
        }
        catch (err){
            res.status(500).json({
                message: 'Erro ao editar comentário no banco!',
                error: err
        });
        }
    }
}
module.exports = new CommentController();
