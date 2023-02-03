import connection from "./../../../../DataBase/connection.js"
const addProduct = (req, res, next) =>{

const {name ,description , price ,userId , CatId}= req.body;
const query= `INSERT INTO products (name, description, price,userId,CatId) VALUES('${name}', '${description}', ${price}, ${userId}, ${CatId})`

connection.execute(query,(err,result)=>{


    if(err){
        if(err.errno == 1452){
            return res.json({message :"there is no userId or CatId"})
        }
        return res.json({message :"error occur", err})
    }
    if(result.affectedRows == 0){
        return res.json({message :"wrong occur"})
    }
    return res.json({message :"product Added successfully", result})
})

}
const deleteProduct = (req, res, next) =>{
    const {id ,ownerId}= req.params;
    const query= `DELETE FROM products  WHERE id = ${id} and userId = ${ownerId}`

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"you can delete your own product only"})
        }
        return res.json({message :"product deleted successfully", result})
    })
}
const updateProduct = (req, res, next) =>{
    const {name,description,price,CatId }= req.body;
    const {id ,ownerId}= req.params;
    const query= `UPDATE Products set name = '${name}' 
    ,description = '${description}', price = ${price},
    CatId = ${CatId}
     WHERE id = ${id} and userId = ${ownerId}`

    connection.execute(query,(err,result)=>{
        if(err){
            if(err.errno == 1452){
                return res.json({message :"there is no category with this name"})
            }
            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"you can update your own product only"})
        }
        return res.json({message :"product updated successfully", result})
    })

}
const getAllProducts = (req, res, next) =>{
  
    const query= `Select p.id, p.name , p.description , p.price ,u.name as userName ,c.name as categoryName from Products as p
     inner join users as u on u.id = p.userId 
     inner join categories as c on c.id = p.CatId 
     `

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }

        return res.json({message :"done", result})
    })
}
const SearchbyName = (req, res, next) =>{
    const {name }= req.body;
    const query= `Select p.id, p.name , p.description , 
    p.price ,u.name as userName ,c.name as categoryName from Products as p
    inner join users as u on u.id = p.userId 
    inner join categories as c on c.id = p.CatId 
    WHERE p.name LIKE '%${name}%';
     `

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }

        return res.json({message :"done", result})
    })
}
export{
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    SearchbyName
}