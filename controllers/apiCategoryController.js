
const {getAllCategory,postNewCategoryModel,deleteCategoryModel}= require('../models/category')



const getAllCategorys=async(req,res)=>{

    let data;

    try {  

        data=await getAllCategory()

        res.status(200).json({
            ok:true,
            data
        })

    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }
    
}


const newCategory=async(req,res)=>{

    let data;

    let categoria=req.body.categoria
    

    try {  

        data=await postNewCategoryModel(categoria)

        res.status(200).json({
            ok:true,
            data
        })

    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al crear la entrada'
    })
    }   
}


const deleteCategory=async(req,res)=>{

    let id = req.body.id; 

    try {
        
        await deleteCategoryModel(id);

        res.status(200).json({
            ok: true,
            msg: 'Entrada eliminada',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al borrar la entrada'
        });
    }
}



module.exports={
    getAllCategorys,
    newCategory,
    deleteCategory
}