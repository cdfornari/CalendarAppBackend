const Event = require("../models/Event")

const getEventos = async (req,res) =>{
    const events = await Event.find().populate('user','name');
    res.json({
        ok: true,
        events
    })
}
const crearEvento = async (req,res) =>{
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const savedEvent = await event.save();
        res.status(201).json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
const actualizarEvento = async(req,res) =>{
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if(!event) return res.status(404).json({ok: false, msg: 'El evento no existe'});
        if(event.user.toString() !== req.uid) return res.status(401).json({ok: false, msg: 'No tiene permiso para editar este evento'});
        const newEvent = {
            ...req.body,
            uid
        }
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new:true});
        res.status(201).json({
            ok: true,
            event: updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
const borrarEvento = async (req,res) =>{
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if(!event) return res.status(404).json({ok: false, msg: 'El evento no existe'});
        if(event.user.toString() !== req.uid) return res.status(401).json({ok: false, msg: 'No tiene permiso para borrar este evento'});
        await Event.findByIdAndDelete(eventId);
        res.status(201).json({
            ok: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}