import { HAlign, Line } from "../../../../Components/Common/styles";
import { AntDesign } from "@expo/vector-icons";

import * as S from "./styles";
import { useSaleStore } from "../../../../Store/SaleStore";
import { AllLogos } from "../../../../Components/Common/Logos";
import { ActivityIndicator } from "react-native";

import { getDanfe, getToken, makeNFCE, sendNFCE } from "../../../../Services";
import { getRealm } from "../../../../Database/realm";
import { PAGE } from "../../../../Consts";
import { useState } from "react";
import { tef_RequestVenda } from "../../../../Services/TEFService";
import { printCartao, printDanfe } from "../../../../Services/PrintService";

export const PayForm = ({ navigation }) => {
  const total = useSaleStore((state) => state.getTotal);
  const itens = useSaleStore((state) => state.itens);
  const clearSale = useSaleStore((state) => state.clearSale);
  const valorTotal = +total();
  const [emitindo, setEmitindo] = useState(false);
  const [msgcomm, setMsgcomm] = useState("");
  const [ident, setIdent] = useState(null)

  async function onTefHandle() {
    const respTef = await tef_RequestVenda(valorTotal);
    const { data: dataTef } = respTef;
    let status = "PENDENTE";
    let respNFce = null;

    console.log("Tef ok", respTef);

    if (respTef.status && respTef.resultado === 0) {
      const nfce = await makeNFCE(dataTef.tipo_cartao);

      setIdent(dataTef.identificador_confirmacao_transacao);

      try {
        setEmitindo(true);

        setMsgcomm("Comunicando Nuvem Fiscal");

        await getToken();

        respNFce = await sendNFCE(nfce);

        setMsgcomm("Imprimindo Danfe");

        status = "ENVIADA";

        const { data: dataDanfe } = await getDanfe(respNFce.id);

        setMsgcomm("Imprimindo Via Cartão");

        printDanfe(dataDanfe);

        printCartao(dataTef.via_cliente);
      } catch (error) {
        status = "ERRO";
      } finally {
        console.log("Salvando Tudo");

        const realm = await getRealm();

        realm.write(() => {
          const config = realm.objectForPrimaryKey("Config", 1);
          config.nextNfce += 1;

          realm.create(
            "Sale",
            {
              _id: nfce.infNFe.ide.nNF,
              cpfcnpj: "",
              cliente: null,
              itens: itens,
              valorTotal,
              status,
              tipo: "CARTÃO",
              data: new Date(),
              chaveNFE: respNFce.id,
              imagemCliente: dataTef.via_cliente,
              imagemCartao: dataTef.via_estabelecimento,
            },
            Realm.UpdateMode.Modified
          );
        });

        realm.close;

        setMsgcomm("Concluído!");
        //setEmitindo(false);
        clearSale();
        //navigation.replace(PAGE.SALES);
      }
    }
  }

  async function onPayHandle() {
    setEmitindo(true);

    const nfce = await makeNFCE("DINHEIRO");

    await getToken();

    const respNfce = await sendNFCE(nfce);

    if (respNfce) {
      if (respNfce.status === "autorizado") {
        const realm = await getRealm();

        realm.write(() => {
          const config = realm.objectForPrimaryKey("Config", 1);
          config.nextNfce += 1;

          realm.create(
            "Sale",
            {
              _id: nfce.infNFe.ide.nNF,
              cpfcnpj: "",
              cliente: null,
              itens: itens,
              valorTotal,
              status: "ENVIADA",
              tipo: "DINHEIRO",
              data: new Date(),
              chaveNFE: resp.id,
            },
            Realm.UpdateMode.Modified
          );
        });

        realm.close;

        clearSale();
        navigation.replace(PAGE.SALES);
      } else {
        console.log(resp);
      }
    }
  }

  if (emitindo) {
    return (
      <S.Container>
        <S.Header>
          <HAlign ac="center" jc="center">
            <S.Title>Emitindo NFC-e</S.Title>
          </HAlign>
        </S.Header>
        <S.Panel>
          <S.Label>{msgcomm}</S.Label>
          {msgcomm !== "Concluído!" && <ActivityIndicator size="large" />}
          {ident && <S.Log >Identificação Pagamento TEF</S.Log>}
          {ident && <S.Log >{ident}</S.Log>}
          <S.Button color="#EFDA6F" onPress={() => navigation.replace(PAGE.SALES)}>
          <S.LabelButton color="black">SAIR</S.LabelButton>
        </S.Button>
</S.Panel>

        <AllLogos />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <HAlign ac="center" jc="center">
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => navigation.pop()}
          />
          <S.Title>Pagamento</S.Title>
        </HAlign>
      </S.Header>
      <S.Panel>
        <S.Label>Total</S.Label>
        <S.Price>R$ {valorTotal ? valorTotal.toFixed(2) : 0}</S.Price>
        <Line />
        <S.Button onPress={onPayHandle}>
          <S.LabelButton color="white">Pagamento em dinheiro</S.LabelButton>
        </S.Button>
        <S.Button color="#EFDA6F" onPress={onTefHandle}>
          <S.LabelButton color="black">TEF PayGO</S.LabelButton>
        </S.Button>
      </S.Panel>
      <AllLogos />
    </S.Container>
  );
};
