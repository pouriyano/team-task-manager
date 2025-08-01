const express=require('express')

const router=express.Router();

const teamController=require('../controller/teamcontroller')

const auth=require('../middlewares/auth')

router.use(auth.authForUser)


router.post('/make',teamController.makeTeam)
router.post('/join',teamController.joinTeam)

router.use(auth.authForTeam)

router.delete('/left',teamController.leftTeam)
router.put('/changeleader',teamController.changeTeamLeader)
router.put('/changetask',teamController.changeTeamTask)
router.get('/show',teamController.showTeam)

module.exports=router

