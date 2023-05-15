import { Router } from "express";
import {getAllUser} from '../controllers/userController';
import { signUp } from "../controllers/authController";

const router = Router();

router.get('/',getAllUser);
router.post('/signup',signUp);

export default router;