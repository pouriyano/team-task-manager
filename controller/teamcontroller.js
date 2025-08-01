const teamModel=require('../model/team').Team

const bcrypt=require('bcrypt')

const Joi=require('joi')

const jwt=require('jsonwebtoken')

const makeTeam=async (req,res)=>{

    const schema=Joi.object({
        password:Joi.string().min(6).max(60).required(),
        task:Joi.string().min(3).max(100),
        name:Joi.string().min(3).max(40), 
        username:Joi.string().min(3).max(30).required()
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })
    

    if(error){      
        return console.log(error)
    }
      const existTeam=await teamModel.findTeamByName(value.name)
      
        if(existTeam[0][0]!=null)
        {
            return res.status(500).json({
                status:"failed",
                data:"team by this name already exist"
            })
        }
       
    try{

        const incryptPassword=await bcrypt.hash(value.password,10)

        const userId=await teamModel.getUserId(value.username)
        
        const result=await teamModel.makeTeam(value.task,value.name,incryptPassword,userId[0][0].id,value.isLeader)
        
        const token=jwt.sign({username:value.username,name:value.name},"this-is-the-token-for-a-team")
        return res.status(200).json({
            result:"team added succesfully",
            data:result,
            token:token
        })
        

    }
    catch(err){

         return res.status(500).json({
            result:"team didn't added",
            data:err
        })

    }
    
}

const joinTeam=async (req,res)=>{

        const schema=Joi.object({
        name:Joi.string().min(3).max(40),
        username:Joi.string().min(3).max(30).required(),
        password:Joi.string().min(6).max(60).required()
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })

    if(error)    
        return res.status(500).json({
            result:"schema is not valid",
            data:error
    })

    const team= await teamModel.findTeamByName(value.name)
    //return console.log(team[0][0])
        if(team[0][0]==null)
        {
            return res.status(400).json({
                status:'error',
                message:'there is no such a team'
            })

        }

    try{

        //return console.log(team[0][0].password)
        
        const isPasswordValid=await bcrypt.compare(value.password,team[0][0].password)
        
         if(isPasswordValid==false)
        {
            return res.status(400).json({
                status:'error',
                message:'invalid password'
            })
        }

        
        const userId=await teamModel.getUserId(value.username)

        for (i in team[0])
        {
            
            if(team[0][i].user==userId[0][0].id)
            {
            return res.status(500).json({
            result:"this user is already in the team",
            
                })
            }
        }
        const result=await teamModel.joinTeam(team[0][0].task,value.name,team[0][0].password,userId[0][0].id)

        const token=jwt.sign({username:value.username,name:value.name},"this-is-the-token-for-a-team")
         return res.status(200).json({
            result:"you joined succesfully",
            data:result,
            token:token
        })
    }

    catch(err){ 
        return res.status(500).json({
            result:"you didn,t joined",
            data:err
        })
        

    }
}   

const leftTeam=async (req,res)=>{

      const schema=Joi.object({
        name:Joi.string().min(3).max(40),
        username:Joi.string().min(3).max(30).required(), 
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })

    if(error){      
        return console.log(error)
    }

    const userId=await teamModel.getUserId(value.username)

    //return console.log(userId[0][0]==null)

    if(userId[0][0]==null){
         return res.status(500).json({
            result:"there is no user with this information",
            data:error
    })
    }

    
    //return console.log(userId[0][0].id)

    const existUserInTeam=await teamModel.findUserInTeam(userId[0][0].id)

    

    console.log("********")
    //return console.log(existUserInTeam[0][0]==null)
    if(existUserInTeam[0][0]==null)
    {
        return res.status(500).json({
            result:"this user belongs to no team",
            data:error
    })
    }

    var numberOfTeams=0

    for (i in existUserInTeam[0])
        {
            
            
            if(existUserInTeam[0][i].name==value.name)
            {
                numberOfTeams=numberOfTeams+1
            }
        }
        if(numberOfTeams==0)
        {
            return res.status(500).json({
            result:"this user does not belong to this team",
            data:error
    })
        }
        // till this moment we know 1.user exist 2.user belongs to a team 3.user belongs
        //a team that request wants to be deleted

        //return console.log("user belong")

    try{

        //const userId=await teamModel.getUserId(value.username)
        //return console.log(userId[0][0].id,value.name)
        const result=await teamModel.leftTeam(value.name,userId[0][0].id)

        return res.status(200).json({
            result:"user left from the team",
            data:result
    })

    }
    catch(err){

            return res.status(500).json({
            result:"the error ecured when trying to delete user from team",
            data:err
    })

    }
    



}

const changeTeamLeader=async (req,res)=>{

        const schema=Joi.object({
        name:Joi.string().min(3).max(40),
        username:Joi.string().min(3).max(30).required(), 
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })

    if(error){      
        return console.log(error)
    }

    const existUserInTeam= await teamModel.findUserInTeam(value.username)
    const teamName=existUserInTeam[0][0].name
    if(existUserInTeam[0][0]==null)
    {
        return res.status(500).json({
            result:"this user belongs to no team",
            data:error
    })
    }

     if(teamName!=value.name){

        return res.status(500).json({
            result:"this user is not belong to this team",
            data:error

    })
    }

    try{
        const deleteLeader=await teamModel.deleteLeader(value.username)
        res.status(200).json({
            data:"the Leader removed succesfully"
        })
        const makeLeader=await teamModel.deleteLeader(value.username)
        return res.status(200).json({
            data:"the Leader added succesfully"
        })

    }
    catch(err){
        return res.status(500).json({
            result:"the process of deleting and adding new Leader got into trouble",
            data:err
    })
}
  

}

const changeTeamTask=async (req,res)=>{

        const schema=Joi.object({
        name:Joi.string().min(3).max(40),
        username:Joi.string().min(3).max(30).required(), 
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })

    if(error){      
        return console.log(error)
    }

    const existUserInTeam= await teamModel.findUserInTeam(value.username)
    const teamName=existUserInTeam[0][0].name
    const isLeader=existUserInTeam[0][0].isLeader
    if(existUserInTeam[0][0]==null)
    {
        return res.status(500).json({
            result:"this user belongs to no team",
            data:error
    })
    }

     if(teamName!=value.name){

        return res.status(500).json({
            result:"this user is not belong to this team",
            data:error

    })
    }

    if(isLeader==false)
    {
            return res.status(500).json({
            result:"this user is not leader,only leaders can change the team task",
            
    })
        
    }

    try{
        const result=await teamModel.changeTask(task)
         return res.status(200).json({
            result:"task succesfully changed for team",
            data:result
            
    })

    }
    catch(err){

         return res.status(500).json({
            result:"there was an error when trying to change the task of the team",
            data:err
            
    })
    }



}

const showTeam=async(req,res)=>{

    const schema=Joi.object({
        name:Joi.string().min(3).max(40),
        username:Joi.string().min(3).max(30).required(),
        password:Joi.string().min(6).max(60).required()
    })

    const {error,value} =schema.validate(req.body, { abortEarly: false })

    if(error){       
        res.status(500).json({
            result:"schema is not valid",
            data:error
    })
    }
    const team= await teamModel.findTeamByName(value.name)
        if(team[0][0]==null)
        {
            return res.status(400).json({
                status:'error',
                message:'there is no such a team'
            })

        }

    
}

module.exports={
    makeTeam,
    joinTeam,
    leftTeam,
    changeTeamLeader,
    changeTeamTask,
    showTeam
}