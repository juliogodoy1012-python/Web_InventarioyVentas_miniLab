export function isAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    return res.status(403).render('message', {
      title: 'Acceso denegado',
      message: 'No tienes permisos para realizar esta acción.'
    });
  }
  next();
}
