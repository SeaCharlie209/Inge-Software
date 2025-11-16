const jwt = require('jsonwebtoken')
const User = require('../models/usersModel');

const protect = async(req, res, next) =>{
    let token;
        //definir la variable token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
                try{
                    //obtengo el token del encabezado de autorización
                    token = req.headers.authorization.split(' ')[1]
                    //Verifico el token con la firma del secreto
                    const decoded = jwt.verify(token, process.env.JWT_SECRET)
                    // Accede a la propiedad 'id' del payload decodificado
                    req.user = await User.findById(decoded.id).select('-password')  

                    next()

                }catch(error){
                    console.log(error)
                    res.status(401)
                    throw new Error('Acceso no autorizado')
                }

        }

        if (!token){
            res.status(401)
                throw new Error("No proporcionaste el token")
        }
}

module.exports = {protect}