let roles = {
  jefe_carrera: [
    {
      nombre: "silabo_subido",
      type: "start",
      days: -10,
      message: "El silabo no ha sido revisado"
    },
    {
      nombre: "aula_revisada",
      type: "start",
      days: -10,
      message: "El aula no ha sido revisada"
    },
    {
      nombre: "examen_revisado",
      type: "start",
      days: -10,
      message: "Los examenes no han sido revisados"
    }
  ],
  asistente: [
    {
      nombre: "contrato_impreso",
      type: "start",
      days: -10,
      message: "El contrato no ha sido impreso"
    },
    {
      nombre: "contrato_firmado",
      type: "dependency",
      dependency: "contrato_impreso",
      message: "El contrato no ha sido firmado"
    }
  ],
  contabilidad: {
    cheque_solicitado: {
      nombre: "cheque_solicitado",
      type: "dependency",
      dependency: "planilla_firmada",
      message: "El cheque no ha sido solicitado"
    },
    cheque_recibido: {
      nombre: "cheque_recibido",
      type: "dependency",
      dependency: "cheque_solicitado",
      message: "El cheque no ha sido recibido"
    },
    cheque_entregado: {
      nombre: "cheque_entregado",
      type: "dependency",
      dependency: "cheque_recibido",
      message: "El cheque no ha sido entregado"
    }
  },
  registros: [
    {
      nombre: "planilla_lista",
      type: "end",
      days: 0,
      message: "La planilla no esta lista"
    },
    {
      nombre: "planilla_firmada",
      type: "dependency",
      dependency: "La planilla no ha sido firmada"
    }
  ]
};

module.exports = roles;