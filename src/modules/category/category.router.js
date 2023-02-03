import {Router} from "express"
import * as CategoryController from "./controller/category.js"
const router = Router();


router.post('/addCategory',CategoryController.addCat)
router.delete('/deleteCategory/:id/:ownerId',CategoryController.deleteCategory)
router.put('/updateCategory/:id/:ownerId',CategoryController.updateCategory)
router.get('/getAllCategory',CategoryController.getAllCategory)

export default router