import { Router } from "express";
import {getAllUser} from '../controllers/userController';
import { signUp , login,logout, protect, strictTo} from "../controllers/authController";

const router = Router();


router.post('/signup',signUp);
router.post('/login',protect,login);
router.get('/logout',logout);

// user routes
router.get('/',protect,strictTo('admin'),getAllUser);

export default router;