import { Router } from "express";
import {getAllUser} from '../controllers/userController';
import { signUp, 
    login,
    logout, 
    protect, 
    strictTo, 
    forgotPassword ,
    resetPassword,
    isLoggedIn,
    updatePassword
} from "../controllers/authController";

const router = Router();


router.post('/signup',signUp);
router.post('/login',protect,login);
router.get('/logout',logout);
router.post('/forgotpassword',forgotPassword)
router.patch('/resetpassword/:token',resetPassword)
router.patch('/updatepassword',protect,updatePassword);

// user routes
router.get('/',protect,strictTo('admin'),getAllUser);

export default router;