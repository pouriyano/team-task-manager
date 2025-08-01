const userModel=require('../model/user').User

const Joi=require('joi')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')




const register=async(req,res)=>{

    const schema=Joi.object(
        {
            username:Joi.string().min(3).max(30).required(),
            password:Joi.string().min(6).max(60).required(),
            email:Joi.string().email().required()

        } 
    )

    const {error,value}=schema.validate(req.body, { abortEarly: false })

    if(error)
    {
        return res.status(400).json({
            status:'error',
            message:error.details[0].message
        })
    }



    try{

        const existUesr=await userModel.getUserByUserName(value.username)
        const existEmail=await userModel.getUserByEmail(value.email)

        if(existEmail[0][0]!=null)
        {
            return res.status(400).json({
                status:'error',
                data :'email already exist'
            })
        }

        if(existUesr[0][0]!=null)
        {
            return res.status(400).json({
                status:'error',
                data :'user already exist'
            })
        }


        const hashedPassword=await bcrypt.hash(value.password,10)



        const result = await userModel.addUser(value.username,hashedPassword,value.email)
        const token=jwt.sign({
            username:value.username,
        },'this_is_a_secret_key')

        return res.status(200).json({
            status:"user add succesfully!",
            data:result,
            token:token
        })

    }catch(err){

        res.status(200).json({
            status:"user not added",
            data:err
        })

    }








}

const login=async(req,res)=>{
    const schema=Joi.object(
        {
            username:Joi.string().min(3).max(30).required(),
            password:Joi.string().min(6).max(60).required()
        } 
    )

    const {error,value}=schema.validate(req.body, { abortEarly: false })

    if(error)
    {
        return res.status(400).json({
            status:'error',
            message:error.details[0].message
        })
    }
    try{

        const result=await userModel.getUserByUserName(value.username)
        if(result[0][0]==null)
        {
            return res.status(400).json({
                status:'error',
                message:'user not found'
            })
        }
        const isPasswordValid=await bcrypt.compare(value.password,result[0][0].password)
        if(!isPasswordValid)
        {
            return res.status(400).json({
                status:'error',
                message:'invalid password'
            })
        }
        
        const token=jwt.sign({
            username:value.username,
        },'this_is_a_secret_key')

        return res.status(200).json({
            status:'success',
            message:'login successful',
            data:result[0][0],
            token:token
        })

    }

    catch(err){
        return res.status(500).json({
            status:'error',
            message:err.message
        })
    }

}

module.exports={
    register,
    login
}