const mongoose = require('mongoose');
const Schema = mongoose.Schema;;

const ReseSchema = Schema({
    evaluacion_pares: {
        type: Date,
        default: '2020-01-01'
    },
    semestre: {
        type: Date,
        default: '2020-01-01'
    }
});


module.exports = mongoose.model('Docente', DocenteSchema);
