import { Router } from "express";
import {deleteMe, getAllUser,getUser,updateMe} from '../controllers/userController';
import { signUp, 
    login,
    logout, 
    protect, 
    strictTo, 
    forgotPassword ,
    resetPassword,
    updatePassword
} from "../controllers/authController";

const router = Router();


router.post('/signup',signUp);
router.post('/login',login);
router.get('/logout',logout);
router.post('/forgotpassword',forgotPassword)
router.patch('/resetpassword/:token',resetPassword)
router.patch('/updatepassword',protect,updatePassword);

// user routes
router.get('/',protect,strictTo('admin'),getAllUser);
router.get('/:id',protect,strictTo('admin'),getUser);
router.patch('/updateme',protect,updateMe);
router.delete('/deleteme',protect,deleteMe);


export default router;