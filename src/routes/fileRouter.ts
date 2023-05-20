import { Router } from "express";
import {getAllFiles,getFile,deleteFile,upload,uploadFile,downloadFile,downloadviaEmail} from '../controllers/fileController';
import { protect,strictTo} from '../controllers/authController';
const router = Router();

router.get('/',getAllFiles);
router.get('/:id',protect,strictTo('admin'),getFile);
router.delete('/:id',protect,strictTo('admin'),deleteFile);
router.post('/upload',protect,strictTo('admin'),upload,uploadFile)
router.get('/download/:id',protect,downloadFile)
router.get('/email/:id',protect,downloadviaEmail)



export default router;