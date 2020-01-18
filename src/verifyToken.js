const Usuario = require('./models/usuario.model');
const { OAuth2Client }  = require('google-auth-library');
const client = new OAuth2Client('602723697704-ucdbgn6m678gf5rkj02npjl2rrcak250.apps.googleusercontent.com');
var userInfo;


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '602723697704-ucdbgn6m678gf5rkj02npjl2rrcak250.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    userInfo = payload;
    const userid = payload['sub'];
}


const controller = {
    verify: function (req, res) {
        const token = req.params.token;

        verify(token)
            .then( () => {
                User.findOne({email: userInfo['email']}).exec((err, user) => {
                    if(err) return res.status(500).send({
                        message: 'Error al verificar usuario'
                    });
                    if(!user) return res.status(404).send({
                        message: 'El usuario no existe'
                    });
                    let update = {
                        token: token
                    };

                    User.findOneAndUpdate({email: userInfo['email']}, update, {new:true}).exec((err, user) => {
                        if(err) return res.status(500).send({
                            message: 'Error al iniciar sesion'
                        });
                    });

                    return res.status(200).send({
                        message: 'Token verificado con exito'
                    });
                });
            })
            .catch(() => {
                return res.status(500).send({
                    message: 'Cant validate token'
                })
            });
    },

    prueba: function (req, res) {
        let params = req.body;
        let token = params.token;

        verify(token)
            .then( () => {
                User.findOne({email: userInfo['email']}).exec((err, user) => {
                    if(err) return res.status(500).send({
                        message: 'Error al hacer prueba'
                    });
                    if(!user) return res.status(404).send({
                        message: 'El usuario no existe'
                    });

                    return res.status(200).send({
                        message: 'Prueba exitosa'
                    });
                });
            })
            .catch(() => {
                return res.status(500).send({
                    message: 'Cant validate tokensfs',
                    token: req.body
                })
            });

    }
};

module.exports = controller;
