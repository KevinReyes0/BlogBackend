import Publication from '../publications/publications.model.js';
import Comment from '../comments/comments.model.js';

export const confirmDeleteComment = async (req, res, next) => {
    try {
        
        const { confirmation } = req.body;

        if (!confirmation) {
            return res.status(400).json({
                succes: false,
                msg: 'Confirmation is required'
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error validating comment',
            error: error.message
        })
    }
};

export const validateExistingComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        
        if(!comment){
            return res.status(404).json({
                succes: false,
                msg: `The comment with id ${id} does not exist`
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error validating comment',
            error: error.message
        })
    }
};