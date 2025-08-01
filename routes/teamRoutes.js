const express=require('express')

const router=express.Router();

const teamController=require('../controller/teamcontroller')

const auth=require('../middlewares/auth')

router.use(auth.authForUser)


router.post('team/make',teamController.makeTeam)
router.post('team/join',teamController.joinTeam)

router.use(auth.authForTeam)

router.delete('team/left',teamController.leftTeam)
router.put('team/changeleader',teamController.changeTeamLeader)
router.put('team/changetask',teamController.changeTeamTask)
router.get('team/show',teamController.showTeam)

module.exports=router

