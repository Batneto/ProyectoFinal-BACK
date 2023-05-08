const express=require('express')

const router=express.Router()

const {getAllCategorys,newCategory,deleteCategory}=require('../controllers/apiCategoryController')

router.get('/',getAllCategorys)
router.post('/',newCategory)
router.delete('/',deleteCategory)





module.exports=router