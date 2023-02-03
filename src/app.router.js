
import UserRouter from "./modules/users/user.router.js"
import CategoryRouter from "./modules/category/category.router.js"
import ProductRouter from "./modules/products/product.router.js"
const InitApp = (app,express)=>{

    app.use(express.json({}))
    app.use("/api/user",UserRouter)
    app.use("/api/category",CategoryRouter)
    app.use("/api/product",ProductRouter)
    
}

export default InitApp;