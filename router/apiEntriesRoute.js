const express=require('express')

const router=express.Router()

const {getEntries,getEntriesCategory, getEntriesByIdEntrie,getEntriesById,getEntriesBySearch,getAllEntries,   deleteEntries,createEntries,updateEntrada,}=require('../controllers/apiEntriesController')


router.get('/',getEntries)
router.get('/all',getAllEntries)
router.get('/search',getEntriesBySearch)
router.get('/categoria',getEntriesCategory)
router.get('/:id',getEntriesById)
router.post('/',createEntries)
router.put('/actualizar/:id',updateEntrada)
router.get('/one/:id',getEntriesByIdEntrie)
router.delete('/delete/:id',deleteEntries)




module.exports=router