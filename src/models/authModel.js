import pool from "../config/db.js";
import bcrypt from "bcrypt";

 export async function registro(req, res){
    const {nombre, correo, password} = req.body

    if(!nombre || !correo || !password) {
        return res.status(400).render("message", {title: "Registro", message: "Todos los campos son obligatorios"})
    }

    try{
        const [row] = await pool.query(
            `SELECT id FROM usuarios WHERE correo = ?`, [correo]
        )

        if (row.length > 0)
        {
            return res.status(400).render("message", {title: "Registro", message: "Este email ya esta registrado"})
        }

        const hash = await bcrypt.hash(password, 10)

        const [result] = await pool.query(
            `INSERT INTO usuarios (nombre, correo, password_hash) VALUE (?,?,?)`, [nombre, correo, hash]
        )

        const user = {id: result.insertId, nombre:nombre, correo:correo}

        res.cookie('auth', JSON.stringify(user), {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 5
        })


        res.redirect("/")
    }
    catch (error){
        console.log(error)
        res.status(500).render("message", {title: "Error", message: "No se pudo crear la cuenta"})
    }
 }

 export async function login(req, res){
    const {correo, password} = req.body

    if (!correo || !password) {
        return res.status(400).render("message", {title: "Iniciar sesion", message: "Todos los campos son obligatorios"})
    }

    try {
        const [rows] = await pool.query(
            `SELECT id, nombre, correo, password_hash FROM usuarios WHERE correo = ?`[correo]
        )

        if (rows.length ===0){
            return res.status(401).render("message", {title: "Iniciar sesion", message: "Credenciales invalidas"})
        }

        const user = rows[0]
        
        const iguales = await bcrypt.compare(password, user.password_hash)

        if (!iguales)
        {
            return res.status(401).render("message", {title: "Iniciar sesion", message: "Credenciales invalidas"})
        }

        const data = {id: user.id, nombre: user.nombre, correo: user.correo}

        res.cookie('auth', JSON.stringify(data), {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 5
        })

        const nextUrl = req.query.next || '/'
        res.redirect(nextUrl)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).render("message", {title: "Error", message: "No se pudo iniciar sesion"})
    }
}


export async function logout(req, res) {

    res.clearCookie('auth')

    res.render("message", {title: "Saliendo del sistema", message: "Sesion cerrada correctamente"})
    

 }