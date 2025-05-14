import { response } from "express";
import Category from './category.model.js';

const createCategory = async ( nameCategory, descriptionCategory, state) => {
    try {

        if (nameCategory === "Taller III" || nameCategory === "Tecnologia III" || nameCategory === "Practica supervisada") {
                const existCategory = await Category.findOne({ nameCategory: "Taller III" || "Tecnologia III"  });
                if (existCategory) {
                    console.log("--------------------------- Error ------------------------------------");
                    console.log(`The named course ${nameCategory} already exists. New one cannot be created.`);
                    console.log("----------------------------------------------------------------------");
                    return null;
                };
            };

    const newCategory = new Category({ 
        nameCategory,
        descriptionCategory, 
        state});
        
        await newCategory.save();
        console.log("Course created successfully:", newCategory);
        return newCategory;
        
    } catch (error) {
        console.error("Error creating course:", error);
        return null;
    }
};

createCategory("Taller III", "Este es un apartado donde se hacen publicaciones de Taller III", true);
createCategory("Tecnologia III", "Este es un apartado donde se hacen publicaciones de Tecnologia III", true);
createCategory("Practica supervisada", "Este es un apartado donde se hacen publicaciones de Practica supervisada", true);

export const addCategory = async (req, res) => {
    try {
        
        const data = req.body; 

        const category = new Category({
            ...data
        });

        await category.save();

        res.status(200).json({
            succes: true,
            category
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error creating category',
            error: error.message
        })
    }
}

export const categoryView = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {state: true};

    try {
        
        const category = await Category.find(query)
            .populate({path: 'keeperPublication', match: { state: true }, select: 'namePublication descriptionPublication date' })
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Category.countDocuments(query);

        res.status(200).json({
            succes: true,
            total,
            category
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error getting categories',
            error: error.message
        })
    }
} 

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.findByIdAndUpdate(id, { state: false });

        res.status(200).json({
            success: true,
            message: 'Course disabled successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting category',
            error: error.message,
        });
    }
};

export const updateCategory = async (req, res  = response) => {
    try {
        const {id} = req.params;
        const {_id, ...data} = req.body;

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msj: 'Curso actualizado con exito',
            category
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "Error al actualizar el curso",
            error: error.message
        })
    }
} 
