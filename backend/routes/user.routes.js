import {Router} from 'express'
import UserController from '../controllers/user-controller.js'

const router = new Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)

export default router