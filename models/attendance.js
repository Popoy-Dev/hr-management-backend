const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User id must provide'],
    },
    location: {
        type: String,
        required: [true, 'Location must provide']
    },
    clockIn: {
        type: String
    },
    clockOut: {
        type: String
    },
    date: {
        type: Date
    }
})


module.exports = mongoose.model('attendance', attendanceSchema)