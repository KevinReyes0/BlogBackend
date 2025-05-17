import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';
import { confirmDeleteComment, validateExistingComment } from '../middlewares/validar-comments.js';


import { addComment, commentsView, deleteComment, updateComment } from './comments.controller.js';

const router = Router();

router.post(
    "/addComment",
    [
        validarCampos
    ],
    addComment
);

router.get("/viewComments", commentsView);


router.delete(
    "/deleteComment/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        confirmDeleteComment,
        validarCampos  
    ],
    deleteComment
);


router.put(
    "/updateComment/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validateExistingComment,
        validarCampos 
    ],
    updateComment
);

export default router;