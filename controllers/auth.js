const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const User = require("../models/User");

const crearUsuario = async (req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                ok: true,
                msg: 'Ya existe usuario con ese correo'
            })
        }
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        await user.save();
        const token = await generarJWT(user.id,user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok: true,
                msg: 'No existe usuario con ese correo'
            })
        }
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }
        const token = await generarJWT(user.id,user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
const renewToken = async (req,res)=>{
    const {uid,name} = req;
    const token = await generarJWT(uid,name);
    res.json({
        ok: true,
        token
    })
}
module.exports = {
    crearUsuario,
    login,
    renewToken
}