export const InutilizationSchema = {
  name: "Inutilization",
  properties: {
    _id: "int",
    ano: "int",
    serie: "int",
    numero_inicial: "int",
    numero_final: "int",
    justificativa: "string",
  },
  primaryKey: "_id",
};
