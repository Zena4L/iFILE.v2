import { Router } from "express";
import {getAllFiles,getFile,deleteFile,fileUpload,uploadFile} from '../controllers/fileController';
import { protect,strictTo} from '../controllers/authController';
const router = Router();

router.get('/',getAllFiles);
router.get('/:id',protect,strictTo('admin'),getFile);
router.delete('/:id',protect,strictTo('admin'),deleteFile);
router.post('/upload',protect,strictTo('admin'),fileUpload,uploadFile)

export default router;