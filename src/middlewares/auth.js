export function requireAuth(req, res, next){
   try{ 
        const raw = req.signedCookies?.auth

        // si no hay una cookie, significa que el usuario NO ha iniciado sesión 
        // se redirige a /login y se le asa el parametro ?next= para recordar la ruta original a la quie intentaba acceder
        if(!raw)
        { 
            return res.redirect('/login?next=' + encodeURIComponent(req.originalUrl))

            
        }

        let user;
        try {
            user = JSON.parse(raw)
        }
        catch (_) {

            return res.clearCookie('auth').redirect("/login")
        }

        req.user = user

        next()
    }
    catch (error)
    {
        console.log("Error en el requireAuth: ", error)

        return res.status(401).render('mensaje', { tittle: "No autorizado", message: "Debes iniciar sesión"})
    }
}


// hace lo contrario,
// evita que un usuario autenticado vea paginas publicas, si el usuario ya tiene una cookie 'auth' , se redirige al inicio
export function redirectAuth(req, res, next) {

    const raw = req.signedCookies?.auth

    // si la cookie existe, signiica que el usuario ya inicio sesión 

    if(raw)
        return res.redirect("/")

    next()


}