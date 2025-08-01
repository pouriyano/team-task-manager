const { dbpool } = require('../config/db');

const userdb=require('../config/db').dbpool;


class User{

    static addUser=async (username,password,email)=>{
        try {
            const result=await dbpool.query('INSERT INTO users (username,password,email) VALUES (?,?,?)',[username,password,email])
            console.log(result)
            return result

        }catch(err){
            console.log(err);
            return err;

        }
    }
    static getUserById=async (id) =>{

        try{
            const result=await dbpool.query('SELECT * FROM users WHERE id=?',[id])
            console.log(result)
            return result
        }   
        catch(err){
            console.log(err)
            return err
        }

    }
    static getUserByUserName=async (username) =>{

        try{
            const result=await dbpool.query('SELECT * FROM users WHERE username=?',[username])
            console.log(result)
            return result
        }   
        catch(err){
            console.log(err)
            return err
        }

    }
    static getUserByEmail=async (email) =>{

        try{
            const result=await dbpool.query('SELECT * FROM users WHERE email=?',[email])
            console.log(result)
            return result
        }   
        catch(err){
            console.log(err)
            return err
        }

    }

}

module.exports={
    User
}