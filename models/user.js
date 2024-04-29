const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        maxlength: [20, 'name cannot be more than 20  characters']
    },
    username: {
        type: String,
        required: [true, 'Must provide username'],
        maxlength: [20, 'Name cannot be more that 20 characters'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must provide username'],
    }
})

module.exports = mongoose.model('User', userSchema)