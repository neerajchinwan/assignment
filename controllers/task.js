const Task = require('../models/task');
const ErrorHandler = require('../utils/error');


exports.create = async(req, res, next) => {
    try{
        const newTask = new Task(req.body);
        await newTask.save()
        res.status(201).json({
            status: true,
            data: newTask
        })
    }catch(error){
        next(error)
    }
}

exports.findOne = async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findOne({_id:id});
    try{
        res.status(200).json({
            status: true,
            data: task
        })
    }catch(error){
        next(error)
    }
}

exports.findAll = async (req, res, next) => {
    const allTask = await Task.find({})
    try{
        res.status(200).json({
            status: true,
            data: allTask
        })

    }catch(error){
        next(error)
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateTask = await Task.findOneAndUpdate({_id:id}, req.body, {new: true});
    try{

        res.status(200).json({
            status: true,
            data: updateTask
        })

    }catch(error){
        next(error)
    }
}