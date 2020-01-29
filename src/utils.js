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

function getSemestre(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    if(month === 1) year--;
    let start = (month >= 2 && month <= 7)? year+'-02-1' : year+'-08-01';
    let end = (month >= 2 && month <= 7)? year+'-07-31' : (year+1)+'-01-31';
    return {start: new Date(start), end: new Date(end)}
}

module.exports = {
    default_response,
    response,
    getSemestre
};
