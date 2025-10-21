import bcrypt from "bcrypt";
import pool from "../config/db.js";

export function showLogin(req,res){
    res.render("login", {title: "Iniciar sesión"})
}

export function showRegister(req,res){
    res.render("register", {title: "Crear cuenta"})
}