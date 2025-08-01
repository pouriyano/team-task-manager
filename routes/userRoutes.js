const express=require('express')

const router=express.Router();

const userController=require('../controller/usercontroller');




router.post('user/register',userController.register)
router.post('user/login',userController.login)



module.exports=router;