const Task = require('./../models/task')

const getAllTask = async (req, res) => {
    console.log(req.session.id)
    try {
        const task = await Task.find({})
        if (!task) res.status(404).res.send({ err: 'No task found!' })
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}

const getTask = async (req, res) => {
    const name = req.params.id
    try {
        const task = await Task.findOne({ name })
        if (!task) res.status(404).res.send({ err: 'No task found!' })
        console.log('task', name)
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ err: "Internal server error" })

    }
}

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body)
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ err: "Internal server error" })
    }
}


const updateTask = async (req, res) => {

    try {
        const id = req.params.id
        const updateTask = await Task.findOneAndUpdate({  _id: id }, req.body, { new: true, runValidators: true })
        res.status(201).json({ updateTask })

    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}

const deleteTask = async (req, res) => {
    const id = req.params.id
    console.log('id', id)
    try {

        const deletedTask = await Task.findOneAndDelete({ _id: id })

        if (!deleteTask) res.status(404).json({ msg: 'No Info found!' })

        res.status(200).json({ deletedTask })

    } catch (err) {
        res.status(500).json({ msg: "Internal server error" })
    }

}

module.exports = { getAllTask, getTask, createTask, updateTask, deleteTask }