import connection from "./../../../../DataBase/connection.js";

/*

create TABLE Categories (

id int not null PRIMARY KEY AUTO_INCREMENT,
    name varchar(100),
    userId int not null,
    
    CONSTRAINT FK_C_U FOREIGN KEY(userId) REFERENCES users(id) on DELETE CASCADE on UPDATE CASCADE
)
*/
const addCat = (req, res, next) => {
  const { name, userId } = req.body;
  const query = `INSERT INTO categories (name, userId) VALUES('${name}', ${userId})`;

  connection.execute(query, (err, result) => {
    if (err) {
        if(err.errno == 1062){
            return res.json({message :"Category Name Already exist in database"})
        }
        if(err.errno == 1452){
            return res.json({message :"Invalid_userId"})
        }
     
      return res.json({ message: "error occur", err });
    }
    return res.json({ message: "category Added successfully", result });
  });
};
const updateCategory = (req, res, next) =>{
    const {name }= req.body;
    const {id ,ownerId}= req.params;
    const query= `UPDATE categories set name = '${name}'   WHERE id = ${id} and userId = ${ownerId}`

    connection.execute(query,(err,result)=>{
        if(err){
            if(err.errno == 1062){
                return res.json({message :"name Already Exist"})
            }
         
            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"you can update your own category only"})
        }
        return res.json({message :"category updated successfully", result})
    })

}
const deleteCategory = (req, res, next) =>{
    const {id ,ownerId}= req.params;
    const query= `DELETE FROM categories  WHERE id = ${id} and userId = ${ownerId}`

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"you can delete your own category only"})
        }
        return res.json({message :"category deleted successfully", result})
    })
}
const getAllCategory = (req, res, next) =>{
  
    const query= `Select c.id, c.name,u.name as userName from categories as c inner join users as u on u.id = c.userId`

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }

        return res.json({message :"done", result})
    })
}
export { addCat ,updateCategory ,deleteCategory ,getAllCategory} ;
