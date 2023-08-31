import NativeModulePayGoSDK, {
  PagarTipoCartaoEnum,
  PagarModalidadePagamentoEnum,
  PagarTipoFinanciamentoEnum,
} from "@linvix-sistemas/react-native-paygosdk";
import { printCartao } from "./PrintService";

const goConfigureAutomation = async () => {
  try {
    const result = await NativeModulePayGoSDK.ConfigurarAutomacao({
      automacao_empresa: "SACPAYGO",
      automacao_nome: "SACPAYGO",
      automacao_versao: "0.0.1",

      acao_transacao_pendente: "confirmar",

      suporta_desconto: false,
      suporta_troco: false,

      vias_diferenciadas: true,
      via_reduzida: false,

      retornar_comprovantes_graficos: true,
    });

    return result;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(JSON.stringify(error));
  }
};

export const tef_Administrativa = async () => {
  try {
    await goConfigureAutomation();
    const resp = await NativeModulePayGoSDK.Administrativa();

    if (resp.data) {
      if (resp.data.via_cliente !== "") {
        printCartao(resp.data.via_cliente);
      }

      if (resp.data.via_estabelecimento !== "") {
        printCartao(resp.data.via_estabelecimento);
      }
    }
  } catch {}
};

export const tef_RequestVenda = async (valor) => {
  try {
    await goConfigureAutomation();

    const result = await NativeModulePayGoSDK.Vender({
      id_transacao_automacao: "1",
      valor_transacao: valor,
      modalidade_pagamento: PagarModalidadePagamentoEnum.PAGAMENTO_CARTAO,
      tipo_cartao: PagarTipoCartaoEnum.CARTAO_DESCONHECIDO,
      tipo_financiamento: PagarTipoFinanciamentoEnum.A_VISTA,
      parcelas: 1,
      adquirente: "DEMO",
    });

    return result;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(JSON.stringify(error));
  }
};
