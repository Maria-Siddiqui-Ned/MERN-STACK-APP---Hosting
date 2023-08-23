const {Schema, model} = require ('mongoose')

const UserSchema  = new Schema ({
    firstname : {
        type : String ,
        required : true 
    },

    lastname : {
        type : String ,
        required : true 
    },

    city : {
        type : String ,
        required : true 
    },

    area : {
        type : String ,
        required : true 
    },

    email : {
        type : String ,
        required : true, 
        unique: true
    },

    password : {
        type : String ,
        required : true 
    },
   
    role: {
        type: String,
        required: true,
        default: "user"
    },
    
    signup_date : {
        type : Date ,
        default : Date.now 
    }
})

const User = model ('user' , UserSchema)
module.exports = User