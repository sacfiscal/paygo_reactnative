import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// NATIVE MODULES
import NativeModulePayGoSDK, {
  PagarTipoCartaoEnum,
  PagarModalidadePagamentoEnum,
  PagarTipoFinanciamentoEnum,
} from "@linvix-sistemas/react-native-paygosdk";

export const Teste = () => {
  const goConfigureAutomation = async () => {
    try {
      const result = await NativeModulePayGoSDK.ConfigurarAutomacao({
        automacao_empresa: "RNPAYGOSDK",
        automacao_nome: "RNPAYGOSDK",
        automacao_versao: "0.0.1",

        acao_transacao_pendente: "confirmar",

        suporta_desconto: false,
        suporta_troco: false,

        vias_diferenciadas: true,
        via_reduzida: false,

        retornar_comprovantes_graficos: true,
      });

      console.log(result);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(JSON.stringify(error));
    }
  };

  const onRequestAdministrativa = async () => {
    try {
      await goConfigureAutomation();
      NativeModulePayGoSDK.Administrativa();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(JSON.stringify(error));
    }
  };

  const onRequestVenda = async () => {
    try {
      await goConfigureAutomation();

      const result = await NativeModulePayGoSDK.Vender({
        id_transacao_automacao: "1",
        valor_transacao: 10.5,
        modalidade_pagamento: PagarModalidadePagamentoEnum.PAGAMENTO_CARTAO,
        tipo_cartao: PagarTipoCartaoEnum.CARTAO_CREDITO,
        tipo_financiamento: PagarTipoFinanciamentoEnum.A_VISTA,
        parcelas: 1,
        adquirente: "DEMO",
      });

      console.log(result);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(JSON.stringify(error));
    }
  };

  return (
    <View style={Styles.main}>
      <View style={Styles.container}>
        <TouchableOpacity
          style={Styles.button}
          onPress={onRequestAdministrativa}
        >
          <Text style={Styles.buttonText}>Administrativo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.button} onPress={onRequestVenda}>
          <Text style={Styles.buttonText}>Venda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  button: {
    marginBottom: 30,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 3,
    minWidth: 400,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
  },
});

export default Teste;

// import { Container } from "../../Components/Common/Container";
// import { LogoFiscal, LogoPaygo } from "../../Components/Common/Logos";
// import Button from "../../Components/Common/Button";
// import { getToken, sendNFCE } from "../../Services";

// export const Teste = () => {
//   return (
//     <Container>
//       <Button text={"Gerar Token"} onPress={getToken} />
//       <Button text={"Emitir NFCE"} onPress={() => sendNFCE(nota)} />
//       <LogoFiscal />
//       <LogoPaygo />
//     </Container>
//   );
// };
