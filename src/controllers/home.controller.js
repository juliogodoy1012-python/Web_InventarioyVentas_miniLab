export function homepag(req, res){
    res.render("home", {title: "Inicio", user: req.user})

}