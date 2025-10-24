export function requireAdmin(req, res, next) {
  if (req.user && Number(req.user.admin) === 1) {
    return next();
  }
  return res.status(403).render('message', {
    title: 'Acceso denegado',
    message: 'No tienes permisos para esta acción.',
    user: req.user
  });
}
