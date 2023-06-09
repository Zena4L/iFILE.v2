"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewController_1 = require("../controllers/viewController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.route('/').get(authController_1.isLoggedIn, viewController_1.overview);
router.route('/login').get(viewController_1.login);
router.route('/signup').get(viewController_1.signup);
router.get('/forgotpassword', viewController_1.forgotpassword);
router.get('/resetpassword', viewController_1.resetpassword);
router.route('/profile').get(authController_1.isLoggedIn, viewController_1.profile);
router.get('/:slug', authController_1.isLoggedIn, viewController_1.getFile);
router.post('/search', authController_1.isLoggedIn, viewController_1.searchFile);
exports.default = router;
//# sourceMappingURL=viewRouter.js.map