import {Router} from "express"
import * as userController from "./controller/user.js"
const router = Router();


router.post('/addUser',userController.addusers)
router.delete('/deleteUser/:userId',userController.deleteuser)
router.put('/updateUser/:userId',userController.updateUser)

export default router