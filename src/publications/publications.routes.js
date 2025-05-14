import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';


import { addPublication, publicationsView, deletePublication, updatePublication } from './publications.controller.js';

const router = Router();

router.post(
    "/",
    [
        check('email', 'This is not a valid email').not().isEmpty(),
        validarCampos
    ],
    addPublication
);

router.get("/", publicationsView);

router.delete(
    "/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos  
    ],
    deletePublication
);

router.put(
    "/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos 
    ],
    updatePublication
);
    

export default router;