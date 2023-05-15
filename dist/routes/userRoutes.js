"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getAllUser);
router.post('/signup', authController_1.signUp);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map