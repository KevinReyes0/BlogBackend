import { response } from "express";
import Publication from '../publications/publications.model.js';
import Comment from './comments.model.js'

export const addComment = async (req, res) => {
    try {
        
        const data = req.body;

        const plublication = await Publication.findOne({namePublication: data.namePublication});   

        const comment = await Comment.create({
            keeperPublication: plublication._id,
            ...data,
            date: new Date()
        })

        await Publication.findByIdAndUpdate(plublication._id, {
            $push: {
                keeperComment: comment._id
            }
        })

        res.status(200).json({
            message: "Comment registered succesfully",
            succes: true,
            comment
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error creating comment',
            error: error.message
        })
    }
}

export const commentsView = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {state: true};

    try {
        

        const comment = await Comment.find(query)
            .populate({path: 'keeperPublication', match: { state: true }, select: 'namePublication' })
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Comment.countDocuments(query);

        res.status(200).json({
            succes: true,
            total,
            comment
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error getting somment',
            error: error.message
        })
    }
} 

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);



        await Comment.findByIdAndDelete(id);

        // Si mantienes la colección de publicaciones con referencias:
        await Publication.findByIdAndUpdate(
            comment.keeperPublication,
            { $pull: { keeperComment: id } }
        );;

        res.status(200).json({
            succes: true,
            message: 'Comment deleted'
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error deleting comment',
            error: error.message
        })
    }
}


export const updateComment = async (req, res  = response) => {
    try {
        const {id} = req.params;
        const {_id, ...data} = req.body;

        const comment = await Comment.findByIdAndUpdate(
            id, 
            {   
                ...data
            }, 
            {new: true}
        );

        res.status(200).json({
            succes: true,
            msj: 'Comment updated successfully',
            comment
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "Error updating comment",
            error: error.message
        })
    }
}  