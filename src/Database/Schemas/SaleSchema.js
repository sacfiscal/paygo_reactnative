export const SaleItemsSchema = {
  name: "SaleItems",
  properties: {
    _id: "string",
    product: "Product",
    quantidade: "int",
    valorTotal: "double",
    index: "int",
  },
  primaryKey: "_id",
};

export const SaleSchema = {
  name: "Sale",
  properties: {
    _id: "int",
    cpfcnpj: "string?",
    cliente: "Client?",
    itens: "SaleItems[]",
    valorTotal: "double",
    status: "string",
    data: "date",
    tipo: "string?",
    chaveNFE: "string?",
    imagemCartao: "string?",
    imagemCliente: "string?",
    nsu: "string?",
  },
  primaryKey: "_id",
};
