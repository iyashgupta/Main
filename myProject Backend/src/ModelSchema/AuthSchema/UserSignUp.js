const mongoose = require('mongoose')

const UsersAccountsSchema = mongoose.Schema({
       userFullName: { required : true , type:String },
       userName: { required : true , type:String } ,
       userEmail: { required : true , type:String } ,
       userPassword: { required : true , type:String } 
})


const UserSignUpModel = mongoose.model('Account',UsersAccountsSchema)


module.exports = {
    UserSignUpModel
}