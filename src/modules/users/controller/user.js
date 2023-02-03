
import connection from "./../../../../DataBase/connection.js"
const addusers = (req, res, next) =>{

const {name ,email , password}= req.body;
const query= `INSERT INTO users (name, email, password) VALUES('${name}', '${email}', '${password}')`

connection.execute(query,(err,result)=>{


    if(err){
        if(err.errno == 1062){
            return res.json({message :"email Already Exist"})
        }
        return res.json({message :"error occur", err})
    }
    return res.json({message :"user Added successfully", result})
})

}

const deleteuser = (req, res, next) =>{
    const {userId}= req.params;
    const query= `DELETE FROM users WHERE id = ${userId}`

    connection.execute(query,(err,result)=>{
        if(err){

            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"Invalid_id"})
        }
        return res.json({message :"user deleted successfully", result})
    })

}
const updateUser = (req, res, next) =>{
    const {name ,email , password}= req.body;
    const {userId}= req.params;
    const query= `UPDATE users set name = '${name}' ,email = '${email}' ,password = '${password}' WHERE id = ${userId}`

    connection.execute(query,(err,result)=>{
        if(err){
            if(err.errno == 1062){
                return res.json({message :"email Already Exist"})
            }
            return res.json({message :"error occur", err})
        }
        if(result.affectedRows == 0){
            return res.json({message :"Invalid_id"})
        }
        return res.json({message :"user updated successfully", result})
    })

}
export{
    addusers,
    deleteuser,
    updateUser
}