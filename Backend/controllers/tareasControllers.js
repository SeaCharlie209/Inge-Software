const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')
const { request } = require('express')

const getTareas = asyncHandler(async (req,res)=>{
    const tareas = await Tarea.find({user: req.user})
    res.status(200).json(tareas)
})

const updateTareas = asyncHandler( async (req,res)=>{
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(404)
        throw new Error('Tarea no existe')
    }
    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(tareaUpdated)
})

const createTareas = asyncHandler(async (req,res)=>{
    if(!req.body.texto){
        res.status(400)
        throw new Error('Por favor teclea un texto')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json(tarea)
})

const deleteTareas = asyncHandler( async (req,res)=>{
    res.status(200).json({"mensaje":"getTareas"})
})

module.exports = {
    getTareas,
    updateTareas,
    createTareas,
    deleteTareas
}