const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('../routes/user');
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        trim:true,
        min:3,
        max:20
    },
    lastName: {
        type:String,
        required: true,
        trim:true,
        min:3,
        max:20
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        index:true,
        lowercase: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true

    },
    hash_password: {
        type: String,
        required: true
    },
    role:{
         type: String,
         enum: ['user','admin'],
         default: 'user'
    },
    contactNumber: {type: String},
    pofilePicture: {type: String}

}, { timestamps: true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
});
    

userSchema.method = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}


module.export = mongoose.model('user', userSchema);
