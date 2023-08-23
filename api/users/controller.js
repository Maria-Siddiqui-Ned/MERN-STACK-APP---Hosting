require('dotenv').config()
const User = require('./model')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const {sign} = require ('jsonwebtoken')

//signup
const signup = async (req, res) => {
    const { firstname, lastname, city, area, email, password } = req.body;

    if (!firstname || !lastname || !city || !area || !email || !password) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else{
        try {

            await connect(process.env.MONGO_URL)
            // console.log("DB Connected Successfully")
    
            const checkExist = await User.exists({ email: email })
    
            if (checkExist) {
                res.json({
                    message: "This email Already Exists"
                })
            }
    
            else {
                await User.create({ firstname, lastname, city, area, email, password: await hash(password, 12) })
                // console.log("Success")
    
                res.status(201).json({
                    message: "You have Signup Successfully "
                })
            }
    
        }
    
        catch (error) {
            res.json({
                message: "ERROR "
            })
        }

    }

    
}

//login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else{
        try {
            await connect(process.env.MONGO_URL)
            const checkExistUser = await User.findOne({ email: email })
    
            if (!checkExistUser) {
                res.status(404).json({
                    message: "User with this email not found"
                })
            }
    

            else {
                const decryptPass = compare (password, checkExistUser.password)
                console.log(decryptPass)
                
                if (email == checkExistUser.email && decryptPass){
    
                    const token = sign ( 
                        {
                            username : checkExistUser.username,
                            id : checkExistUser._id,
                            email : checkExistUser.email,
                            role :  checkExistUser.role,   
                        }
                        , 
                        process.env.JWT_SECRET
                    )
    
                    res.status(200).json({
                        message: "Successfully Signed In",
                        token :token
                    })
                }
                
                else{
                    res.json({
                        message: "Invalid email or password"
                    })
                }
             } 
            }
        
        catch (error) {
    
        }
    
    }
    
}

// get All Users
const getAllUsers = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const allUsers = await User.find()
        res.json({
            user: allUsers
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Users By ID
const getUsersByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const user = await User.findOne({ _id })
        res.json({ user})
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Users By email
const getUsersByEmail = async (req, res) => {

    const { email } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const user = await User.findOne({email })
        res.json({ user })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//update Users
const updateUser = async (req, res) => {
    const { _id,  firstname} = req.body

    const filter = { _id };
    const update = {  firstname};

    try {
        await connect(process.env.MONGO_URL)

        await User.findOneAndUpdate(filter, update, {
            new: true
        });

        const user = await User.find()

        res.json({
            message: "Updated Successfully",
            user
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


//delete Users
const deleteUsers = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URL)
        await User.deleteOne({ _id })
        const user = await User.find()
        res.status(200).json({
            message: "Deleted Successfully",
            user
        })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}



module.exports = { signup, login , getAllUsers , getUsersByID , getUsersByEmail, updateUser, deleteUsers }