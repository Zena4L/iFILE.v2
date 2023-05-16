"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../controllers/fileController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/', fileController_1.getAllFiles);
router.get('/:id', authController_1.protect, (0, authController_1.strictTo)('admin'), fileController_1.getFile);
router.delete('/:id', authController_1.protect, (0, authController_1.strictTo)('admin'), fileController_1.deleteFile);
router.post('/upload', authController_1.protect, (0, authController_1.strictTo)('admin'), fileController_1.fileUpload, fileController_1.uploadFile);
exports.default = router;
//# sourceMappingURL=fileRouter.js.map