export const AddressSchema = {
  name: "Address",
  properties: {
    _id: "int",
    logradouro: "string",
    numero: "string",
    bairro: "string",
    codigo_municipio: "string",
    cidade: "string",
    uf: "string",
    codigo_pais: "string",
    pais: "string",
    cep: "string",
  },
  primaryKey: "_id",
};

export const CompanySchema = {
  name: "Company",
  properties: {
    _id: "int",
    cpf_cnpj: "string",
    created_at: "date",
    updated_at: "date",
    inscricao_estadual: "string",
    nome_razao_social: "string",
    nome_fantasia: "string",
    fone: "string",
    email: "string",
    endereco: "Address",
  },
  primaryKey: "_id",
};
