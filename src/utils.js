function default_response(req, res) {
    return response(req, res, (req, res, result) => {
        return res.status(200).send(result);
    });
}

function response(req, res, func) {
    return (err, result) => {
        if(err) console.log(err);
        if(err) return res.status(500).send({
            message: 'Error de conexion a base de datos'
        });
        if(!result) return res.status(404).send({
            message: 'No se ha encontrado los datos en la base de datos'
        });

        func(req, res, result);
    }
}

module.exports = {
    default_response,
    response
};
