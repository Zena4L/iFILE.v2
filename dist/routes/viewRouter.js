"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewController_1 = require("../controllers/viewController");
const router = (0, express_1.Router)();
// router.route('/').get(isLoggedIn,overview);
router.get('/', viewController_1.overview);
router.get('/login', viewController_1.login);
router.get('/signup', viewController_1.signup);
router.get('/profile', viewController_1.profile);
exports.default = router;
//# sourceMappingURL=viewRouter.js.map