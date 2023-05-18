import { Router } from "express";
import {overview,login,signup,profile} from '../controllers/viewController';
import { isLoggedIn } from "../controllers/authController";


const router = Router();

router.route('/').get(isLoggedIn,overview);
router.route('/login').get(login);
router.route('/signup').get(signup);
router.route('/profile').get(isLoggedIn,profile);

export default router;