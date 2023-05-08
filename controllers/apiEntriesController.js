
const {getEntriesByEmail,getAllEntriesModel, getEntriesByCategory,getEntriesByEntrieIdModel, getEntriesByIdModel,entriesBySearchModel, postNewEntriesModel,updateEntriesModel,deleteEntriesModel}=require('../models/entries')




const getAllEntries=async(req,res)=>{

    let data;

    try {  

        data=await getAllEntriesModel()

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


const getEntries=async(req,res)=>{

    let data;

    try {  

        let email =req.body.email

        if(email){

        data=await getEntriesByEmail(email)

        res.status(200).json({
            ok:true,
            data
        })

    }else{
       // data=await getAllEntries()
    }
   

    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }
    
}


const getEntriesCategory=async(req,res)=>{

    let data;

    try {  

        let categoria =req.body.categoria

        if(categoria){

        data=await getEntriesByCategory(categoria)

        res.status(200).json({
            ok:true,
            data
        })

    }else{
       // data=await getAllEntries()
    }
   

    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }
    
}


const getEntriesBySearch=async(req,res)=>{

    let data;

    try {  

        let search =req.body.search

        if(search){

        data=await entriesBySearchModel(search)

        res.status(200).json({
            ok:true,
            data
        })

    }else{
       // data=await getAllEntries()
    }
    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }

}

const getEntriesById=async(req,res)=>{

    let data;

    

    try {  

        let id =req.params.id

        console.log(id);

        if(id){

        data=await getEntriesByIdModel(id)

        res.status(200).json({
            ok:true,
            data
        })

    }else{
       // data=await getAllEntries()
    }
    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }

}


const getEntriesByIdEntrie=async(req,res)=>{

    let data;

    

    try {  

        let id =req.params.id

        console.log(id);

        if(id){

        data=await getEntriesByEntrieIdModel(id)

        res.status(200).json({
            ok:true,
            data
        })

    }else{
       // data=await getAllEntries()
    }
    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener las entradas'
    })
    }

}




const createEntries=async(req,res)=>{

    let data;

   
    let titulo=req.body.titulo
    let contenido =req.body.contenido
    let imagen=req.body.imagen_producto
    let precio =req.body.precio
    let usuario=req.body.usuario
    let categoria=req.body.categoria

    try {  

        data= await postNewEntriesModel(titulo,contenido,imagen,precio,usuario,categoria)
        
        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'conecta con el administrador '
    })
    }

}


const updateEntrada=async(req,res)=>{

    let data;

    let id=req.params.id

    let titulo=req.body.titulo
    let contenido =req.body.contenido
    let imagen=req.body.imagen_producto
    let precio =req.body.precio
    

    try {  

        data= await updateEntriesModel(id,titulo,contenido,imagen,precio)
        
        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'consulta con el administrador '
    })
    }
    
}


const deleteEntries=async(req,res)=>{

    let id = req.params.id; 

    try {
        
        await deleteEntriesModel(id);

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
    getAllEntries,
    getEntries,
    getEntriesCategory,
    getEntriesBySearch,
    getEntriesById,
    createEntries,
    getEntriesByIdEntrie,
    updateEntrada,
    deleteEntries
    
}