const express=require('express')

const router=express.Router()

const {getUsers,getUserById ,postNewUser,postNewAdmin, login, deleteUser,updateUser}=require('../controllers/apiUsersController')



router.get('/:id',getUserById)

router.get('/',getUsers)

router.post('/nuevo',postNewUser)
router.post('/nuevoAdmin',postNewAdmin)
router.post('/login',login)
router.put('/actualizar/:id',updateUser)
router.delete('/delete/:id',deleteUser)   



module.exports=router