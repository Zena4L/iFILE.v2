import { Router } from "express";
import {overview,login,signup,profile,getFile,searchFile,forgotpassword,resetpassword} from '../controllers/viewController';
import { isLoggedIn } from "../controllers/authController";


const router = Router();

router.route('/').get(isLoggedIn,overview);
router.route('/login').get(login);
router.route('/signup').get(signup);
router.get('/forgotpassword',forgotpassword)
router.get('/resetpassword',resetpassword)
router.route('/profile').get(isLoggedIn,profile);
router.get('/:slug', isLoggedIn, getFile);
router.post('/search',isLoggedIn,searchFile)

export default router;