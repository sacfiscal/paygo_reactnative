import { useEffect, useState } from "react";
import { ScrollView, DeviceEventEmitter, Modal } from "react-native";
import { Container } from "../../../../Components/Common/Container";
import { Line, HAlign } from "../../../../Components/Common/styles";
import * as S from "./styles";
import { getRealm } from "../../../../Database/realm";
import moment from "moment";
import "moment/locale/pt-br";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { PAGE, SearchType, NFEStatus } from "../../../../Consts";
import { useSaleStore } from "../../../../Store/SaleStore";
import { SaleItem } from "./SaleItem";
import { cancelNCFe, getDanfe, getToken } from "../../../../Services";
import { printDanfe } from "../../../../Services/PrintService";

export default AddForm = ({ navigation, route }) => {
  const itens = useSaleStore((state) => state.itens);
  const loadItens = useSaleStore((state) => state.loadItens);
  const removeItem = useSaleStore((state) => state.removeItem);
  const cpf = useSaleStore((state) => state.cpf);
  const [valorTotal, setValorTotal] = useState(0);
  const [selected, setSelected] = useState(0);
  const [config, setConfig] = useState(null);
  const [nfeKey, setNfeKey] = useState(null);
  const [printing, setPrinting] = useState(false);
  const { id } = route.params;

  const current = moment();
  moment.locale("pt-br");

  useEffect(() => {
    const listner = DeviceEventEmitter.addListener("eventStatus", (event) => {
      console.log(event);
    });

    async function loadConfig() {
      const realm = await getRealm();
      const _config = realm.objectForPrimaryKey("Config", 1);

      if (_config) {
        setConfig(_config);
      }

      realm.close;
    }

    async function loadSale() {
      const realm = await getRealm();
      const _sale = realm.objectForPrimaryKey("Sale", id);

      if (_sale) {
        loadItens(_sale.itens);

        setNfeKey(_sale.chaveNFE);
      }

      realm.close;
    }

    loadConfig();

    if (id > 0) {
      loadSale();
    }

    return () => {
      listner.remove();
    };
  }, []);

  function onCancelNFCE() {
    Alert.alert("Deseja cancelar esta NFC-E?", [
      {
        text: "Sim",
        onPress: async () => {
          const canceledNFE = cancelNCFe(nfeKey);

          const realm = await getRealm();

          try {
            realm.write(() => {
              realm.create(
                "Sale",
                {
                  _id: id,
                  cpfcnpj: cpf,
                  cliente: null,
                  itens: itens,
                  valorTotal,
                  status: NFEStatus.Cancelada,
                  tipo: "DINHEIRO",
                  data: new Date(),
                },
                Realm.UpdateMode.Modified
              );
            });
          } catch (error) {
            console.log(error);
          }
          realm.close;

          navigation.push("CNPJ");
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  async function save() {
    if (nfeKey) {
      navigation.pop();
      return;
    }

    if (valorTotal === 0) {
      navigation.pop();
      return;
    }

    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        "Sale",
        {
          _id: 1,
          cpfcnpj: cpf,
          cliente: null,
          itens: itens,
          valorTotal,
          status: "PENDENTE",
          tipo: "DINHEIRO",
          data: new Date(),
        },
        Realm.UpdateMode.Modified
      );
    });

    realm.close;

    navigation.pop();
  }

  useEffect(() => {
    const _total = itens.reduce((acc, item) => acc + item.valorTotal, 0);

    setValorTotal(_total);
  }, [itens]);

  function handleClick(id) {
    if (selected === id) {
      setSelected(0);
    } else {
      setSelected(id);
    }
  }

  function handlePlusButton() {
    if (selected === 0) {
      navigation.push(PAGE.PRODUCTS, { type: SearchType.SELECT });
    } else {
      removeItem(selected);
      setSelected(0);
    }
  }

  async function handlePrinter() {
    console.log("imprimindo");
    setPrinting(true);

    await getToken();

    const resp = await getDanfe(nfeKey);

    printDanfe(resp.data);

    setPrinting(false);
  }

  return (
    <Container>
      <Modal
        transparent={true}
        visible={printing}
        animationType="fade"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <S.PrintPage>
          <S.PrintInfo>
            <S.Label color="black" size="28">
              Imprimindo...
            </S.Label>
          </S.PrintInfo>
        </S.PrintPage>
      </Modal>
      <S.Header>
        <S.Label>{`NF: #${String(config?.nextNfce).padStart(
          10,
          "0"
        )}`}</S.Label>
        <S.Label>{`Série: ${config?.serieNfce}`}</S.Label>
        <S.Label>{`Emissão: ${current.format("DD/MM/YYYY hh:mm")}`}</S.Label>
        <Line />
        <S.Label>CPF/CNPJ</S.Label>
        <S.Label color={cpf ? "white" : "gray"} size="18">
          {cpf
            ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            : "Identificar Cliente"}
        </S.Label>
        <Line />
      </S.Header>
      <S.Page>
        <ScrollView onMagicTap={true} showsVerticalScrollIndicator={true}>
          {itens.map((item, index) => (
            <SaleItem
              key={index}
              item={item}
              onPress={() => handleClick(item.index)}
              selected={selected === item.index}
            />
          ))}
        </ScrollView>
      </S.Page>
      <S.Footer>
        <HAlign jc="space-between">
          <S.Label>Valor dos Produtos</S.Label>
          <S.Label>{`R$ ${valorTotal.toFixed(2)}`}</S.Label>
        </HAlign>
        <Line />
        <HAlign jc="space-between">
          <S.Label>Descontos</S.Label>
          <S.Label>R$ 0.00</S.Label>
        </HAlign>
        <Line />
        <HAlign jc="space-between">
          <S.Label>Valor Total</S.Label>
          <S.Label>{`R$ ${valorTotal.toFixed(2)}`}</S.Label>
        </HAlign>

        <HAlign mt={20} jc="space-between">
          <S.ConfirmButton
            onPress={() => navigation.push("PayForm")}
            disabled={nfeKey !== null}
          >
            <FontAwesome name="thumbs-up" size={36} color="black" />
            <S.Label size={10} color="black">
              Finalizar
            </S.Label>
          </S.ConfirmButton>
          <S.BasicButton onPress={onCancelNFCE} disabled={nfeKey === null}>
            <FontAwesome5
              name="trash"
              size={36}
              color={nfeKey === null ? "gray" : "white"}
            />
            <S.Label size={10}>Excluir</S.Label>
          </S.BasicButton>
          <S.AddButton exclude={selected !== 0} onPress={handlePlusButton}>
            <FontAwesome
              name={selected ? "minus" : "plus"}
              size={24}
              color={selected !== 0 ? "white" : "black"}
            />
          </S.AddButton>
          <S.BasicButton onPress={() => navigation.push(PAGE.IDENT_CLIENT)}>
            <FontAwesome name="user" size={36} color="white" />
            <S.Label size={10}>Identificar</S.Label>
          </S.BasicButton>
          <S.BasicButton onPress={handlePrinter}>
            <MaterialCommunityIcons
              name="printer"
              size={36}
              color={nfeKey === null ? "gray" : "white"}
            />
            <S.Label size={10}>Imprimir</S.Label>
          </S.BasicButton>
          <S.BasicButton onPress={() => save()}>
            <MaterialCommunityIcons name="exit-run" size={36} color="white" />
            <S.Label size={10}>Sair</S.Label>
          </S.BasicButton>
        </HAlign>
      </S.Footer>
    </Container>
  );
};
