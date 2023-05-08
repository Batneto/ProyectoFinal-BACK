
const {getUserByEmailModel, getUserByIDModel,getAllUsers,postNewUserModel,postNewAdminModel,loginModel,deleteUserModel,updateUserModel}=require("../models/users")
const { generarJwt } = require("../helpers/jwt")
const bcrypt = require("bcryptjs")

const getUserByEmail=async(req,res)=>{

    let data;

    try {  
        let email =req.body.email

        if(email){

        data=await getUserByEmailModel(email)
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

const getUserById=async(req,res)=>{

    let data;

    try {  
        let id =req.params.id

        if(id){

        data=await getUserByIDModel(id)
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


const getUsers=async(req,res)=>{

    let data;

    try {  

        data= await getAllUsers()
        
        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al obtener los usuarios'
    })
    }
    
}


const postNewUser=async(req,res)=>{

    let data;
    let nombre =req.body.nombre
    let imagen_perfil= req.body.image_perfil
    let email =req.body.email
    let pass =req.body.pass
    let apodo =req.body.apodo

   

    try {  
        let salt = bcrypt.genSaltSync(10);

        pass = bcrypt.hashSync(pass, salt);
        data= await postNewUserModel(nombre,imagen_perfil,email,pass,apodo)

        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al crear el usuario'
    })
    }
    
}


const postNewAdmin=async(req,res)=>{

    let data;
    let nombre =req.body.nombre
    let imagen_perfil= req.body.image_perfil
    let email =req.body.email
    let pass =req.body.pass
    let apodo =req.body.apodo

    
    let salt = bcrypt.genSaltSync(10);

    pass = bcrypt.hashSync(pass, salt);
  
    try {  

        data= await postNewAdminModel(nombre,imagen_perfil,email,pass,apodo)

        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al crear el usuario'
    })
    }
    
}


const login = async (req, res) => {

    const { nombre, pass, email  } = req.body

    const user = await loginModel( email )
    

    try {
        if (!user) {
            
            return res.status(401).json({
                ok: false,
                msg: 'usuario o contraseña incorrecta.'
            })
        } else {
            
            const passUser= bcrypt.compareSync(pass, user[0].pass)            

            if (!passUser) {
                return res.status(401).json({
                    ok: false,
                    msg: 'usuario o contraseña incorrecta'
                })
            } else {
                

                const token = await generarJwt(user[0].id_usuarios, nombre)

                
                
                return res.status(200).json({
                    ok: true,
                    msg: 'login ok, comprobar password.',
                    data:{
                        user:user[0],
                        token
                    }
                })
            }
        }
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'usuario o contraseña incorrecta.'
        });

    }
}


const deleteUser=async(req,res)=>{

    let data;

    let id=req.params.id
    
    

    try {  

        data= await deleteUserModel(id)
        
        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al borrar el usuario'
    })
    }
    
}


const updateUser=async(req,res)=>{

    let data;

    let id_usuarios=req.params.id
    let nombre =req.body.nombre
    let image_perfil =req.body.image_perfil
    let email =req.body.email
    let pass =req.body.pass
    let apodo =req.body.apodo
    

    try {  

        data= await updateUserModel(id_usuarios,nombre,image_perfil,email,pass,apodo)
        
        res.status(200).json({
            ok:true,
            data
        })


    } catch (error) {
        res.status(500).json({
        ok:false,
        msg:'error al actualizar el usuario '
    })
    }
    
}






module.exports={
    getUserByEmail,
    getUserById,
    getUsers,
    postNewUser,
    login,
    postNewAdmin,
    deleteUser,
    updateUser
    
}