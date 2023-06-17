const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'someqoolsecrethereagain';

async function register(email, username, password) {
    const existingEmail = await User.findOne({email}).collation({locale:'en', strength: 2})
    if(existingEmail){
        throw new Error('Email is taken')
    }
    const existingUsername = await User.findOne({username}).collation({locale:'en', strength: 2})
    if(existingUsername){
        throw new Error('Username is taken')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        username,
        hashedPassword
    })
    const token = createSession(user)
    return token;
}
async function login(email, password) {
    const existing = await User.findOne({email}).collation({locale:'en', strength: 2})
    if(!existing){
        throw new Error('Incorrect email or password')
    }
    const hasMatch = await bcrypt.compare(password, existing.hashedPassword);

    if(hasMatch==false){
        throw new Error('Incorrect email or password')
    }
    const token = createSession(existing)
    return token;
}

function createSession(user) {
    const payload = {
        _id: user._id,
        email:user.email,
        username: user.username
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    verifyToken

}