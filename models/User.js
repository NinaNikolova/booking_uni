const {Schema, model} = require('mongoose');

// TODO add user properties and validation according to assignment
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match:[/^[a-zA-Z0-9]+$/i,'Username may contain only english letters and numbers']
        
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
})
// index allows to set unic in usarname
userSchema.index({email: 1 }, {
    collation:{
        locale: 'en',
        strength: 2
    }
})
userSchema.index({username: 1 }, {
    collation:{
        locale: 'en',
        strength: 2
    }
})
const User = model('User', userSchema);
module.exports =User;