
const db =require('../config/db').dbpool


class Team{

    static makeTeam = async (task,name,password,userId)=>{

        try{
             const result=await db.query('INSERT INTO teams (task,name,password,user,isLeader) VALUES (?,?,?,?,?)',[task,name,password,userId,1])
             console.log(result)
             return result
        }
        catch(err){
            return console.log(err+"this is error")
        }
    }
    static joinTeam = async (task,name,password,userId)=>{

        try{
             const result=await db.query('INSERT INTO teams (task,name,password,user,isLeader) VALUES (?,?,?,?,?)',[task,name,password,userId,0])
             //console.log(result)
             return result
        }
        catch(err){
            return console.log(err)
        }
    }
    static leftTeam=async (name,userId)=>{

        try{
             const result = await db.query('DELETE FROM teams WHERE name=? AND user=?',[name,userId])
             console.log(result)
             return result
            
        }
        catch(err){
            return console.log(err)
        }
       

    }
    static findTeamByName=async(name)=>{
        try{

            const result=await db.query('SELECT * FROM teams WHERE name=?',[name]) 
            console.log(result)
            return result 

        }
        catch(err){
           return console.log(err)
        }
        
    } 
    static findUserInTeam=async(userId)=>{
         try{
            const result=await db.query('SELECT * FROM teams WHERE user=?',[userId]) 
            console.log(result)
            return result 

        }
        catch(err){
           return console.log(err)
        }

    }
    static deleteLeader=async (username)=>{

         try{
            const result=await db.query('INSERT INTO teams (isLeader) VALUES (?) WHERE user=? AND isLeader =?',[false,'SELECT id FROM users WHERE username =?',[username],true]) 
            console.log(result)
            return result 
        }
        catch(err){
           return console.log(err)
        }

    }
    static makeLeader=async (username)=>{

         try{
            const result=await db.query('INSERT INTO teams (isLeader) VALUES (?) WHERE user=? AND isLeader =?',[true,'SELECT id FROM users WHERE username =?',[username],false]) 
            console.log(result)
            return result 
        }
        catch(err){
           return console.log(err)
        }

    }
    static changeTask=async (task)=>{

         try{
            const result=await db.query('INSERT INTO teams (task) VALUES (?)',[task]) 
            console.log(result)
            return result 
        }
        catch(err){
           return console.log(err)
        }


    }
    static getUserId=async (username)=>{
        try{
            const result=await db.query('SELECT id FROM users WHERE username=?',[username])
            console.log(result)
            return result
        }
        catch(err){
            console.log(err)
        }
    }
    static getTeamTask=async(name)=>{
        try{
             const result=await db.query('SELECT task FROM teams WHERE name=?',[name])
             console.log(result)
             return result
        }
        catch(err){
            return console.log(err)
        }
    }
}

module.exports={
  Team
}
