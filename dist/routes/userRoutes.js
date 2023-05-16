"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signUp);
router.post('/login', authController_1.protect, authController_1.login);
router.get('/logout', authController_1.logout);
router.post('/forgotpassword', authController_1.forgotPassword);
router.patch('/resetpassword/:token', authController_1.resetPassword);
router.patch('/updatepassword', authController_1.protect, authController_1.updatePassword);
// user routes
router.get('/', authController_1.protect, (0, authController_1.strictTo)('admin'), userController_1.getAllUser);
router.get('/:id', authController_1.protect, (0, authController_1.strictTo)('admin'), userController_1.getUser);
router.patch('/updateme', authController_1.protect, userController_1.updateMe);
router.delete('/deleteme', authController_1.protect, userController_1.deleteMe);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map