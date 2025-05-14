import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';


import { addPublication, publicationsView, deletePublication, updatePublication } from './publications.controller.js';

const router = Router();

router.post(
    "/addPublication",
    [
        check('email', 'This is not a valid email').not().isEmpty(),
        validarCampos
    ],
    addPublication
);

router.get("/viewPublications", publicationsView);

router.delete(
    "/deletePublication/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos  
    ],
    deletePublication
);

router.put(
    "/updatePublication/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validarCampos 
    ],
    updatePublication
);
    

export default router;