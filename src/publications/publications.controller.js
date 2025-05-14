import { response } from "express";
import Category from '../category/category.model.js';
import Publication from './publications.model.js'
import Comment from '../comments/comments.model.js'

export const addPublication = async (req, res) => {
    try {
        
        const data = req.body;

        const category = await Category.findOne({nameCategory: data.nameCategory}); 

        if(!category){
            return res.status(404).json({
                succes: false,
                message: 'Course not found',
                error: error.message
            })
        }

        const publication = new Publication({
            keeperCategory: category._id,
            ...data
        });

        await publication.save();

        res.status(200).json({
            succes: true,
            publication
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error creating publication',
            error: error.message
        })
    }
}

export const publicationsView = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {state: true};

    try {
        
        const [total, publication] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
            .populate({path: 'keeperCategory', match: { state: true }, select: 'nameCategory' })
            .populate({path: 'keeperComment', match: { state: true }, select: 'comment' })
            .skip(Number(desde))
            .limit(Number(limite))
        ])

        res.status(200).json({
            succes: true,
            total,
            publication
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error getting publications',
            error: error.message
        })
    }
} 

export const deletePublication = async (req, res) => {

    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                succes: false,
                message: 'Publication not found'
            });
        }

        await Publication.findByIdAndUpdate(id, {state: false});

        await Comment.updateMany({ keeperPublication: id }, { state: false });

        res.status(200).json({
            succes: true,
            message: 'Publication deleted'
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error deleting publication',
            error: error.message
        })
    }
}


export const updatePublication = async (req, res  = response) => {
    try {
        const {id} = req.params;
        const {_id, ...data} = req.body;
        const publication1 = await Publication.findById(id);

        if (!publication1) {
            return res.status(404).json({
                succes: false,
                message: 'Publication not found'
            });
        }

        const publication = await Publication.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msj: 'Publication updated successfully',
            publication
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "Error updating publication",
            error: error.message
        })
    }
} 