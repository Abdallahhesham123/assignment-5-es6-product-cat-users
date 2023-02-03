import {Router} from "express"
import * as productController from "./controller/product.js"
const router = Router();


router.post('/addProduct',productController.addProduct)
router.delete('/deleteProduct/:id/:ownerId',productController.deleteProduct)
router.put('/updateProduct/:id/:ownerId',productController.updateProduct)
router.get('/getAllProducts',productController.getAllProducts)
router.get('/SearchbyName',productController.SearchbyName)
export default router