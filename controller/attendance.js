const Attendance = require('./../models/attendance')

const postAttendance = async (req, res) => {

    const username = req.body.username
    const location = req.body.location
    const clockIn = req.body.clockIn
    const date = req.body.date
    try {
        await Attendance.create({
            username,
            location,
            clockIn,
            date
        })
        res.status(201).json({ msg: 'Success!' })
    } catch (error) {
        res.status(500).json({ msg: `Internal server error; ${error}` })
    }

}


module.exports = { postAttendance }