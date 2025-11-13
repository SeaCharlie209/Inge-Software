const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required : [true, 'Por favor teclea tu nombre']
    },
        email:{
        type: String,
        required : [true, 'Por favor teclea tu email']
    },
        password:{
        type: String,
        required : [true, 'Por favor teclea tu passord']
    },
        esAdmin:{
        type: Boolean,
        default: false

    }
})
module.exports = mongoose.model('User', userSchema)