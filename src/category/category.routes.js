import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';

import { addCategory, categoryView, deleteCategory, updateCategory } from './category.controller.js'

const router = Router();

router.post(
    "/addCourse",
    [
        validarCampos
    ],
    addCategory
)

router.get("/viewCourses", categoryView)

router.delete(
    "/deleteCourse/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos         
    ],
    deleteCategory
)

router.put(
    "/updateCourse/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos
    ],
    updateCategory
)

export default router;