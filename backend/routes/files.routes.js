import {Router} from 'express'
import fileManager from '../controllers/fileManager.js';
const router = new Router();



router.post('/uploadFile', fileManager.upload)
router.post('/deleteFile', fileManager.delete)

export default router