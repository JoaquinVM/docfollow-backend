const Usuario = require('./models/usuario.model');
const { OAuth2Client }  = require('google-auth-library');
const response = require('./utils').response;

const client = new OAuth2Client('602723697704-ucdbgn6m678gf5rkj02npjl2rrcak250.apps.googleusercontent.com');
var userInfo;

function TokenValidation(req, res, next) {
    const token = req.header('Token');
    if(!token) return req.status(401).send({ message: 'Acceso denegado'});

    const payload = getUserInfo(token);

    Usuario.findOne({email: payload['email']}).exec((err, user) => {
        if(err) return res.status(500).send({
            message: 'Error de conexion a la base de datos'
        });
        if(!user) return res.status(404).send({
            message: 'Esta cuenta no existe'
        });

        next();
    });
}
module.exports = TokenValidation;
