function default_response(req, res) {
    return response(req, res, (req, res, result) => {
        return res.status(200).send(result);
    });
}

function response(req, res, func) {
    return (err, result) => {
        if(err){
            if(err.name === 'MongoError' && err.code === 11000){
                return res.status(500).send({
                    message: "El campo [" + Object.keys(err.keyValue)[0] + "] ya ha sido registrado en la base de datos"
                })
            }else if(err.name === 'ValidationError'){
                return res.status(500).send({
                    message: err.errors[Object.keys(err.errors)[0]].properties.message
                })
            }
            else{
                return res.status(500).send({
                    message: err
                })
            }
        }
        if(!result) return res.status(404).send({
            message: 'No se ha encontrado los datos en la base de datos'
        });

        return func(req, res, result);
    }
}

module.exports = {
    default_response,
    response
};
