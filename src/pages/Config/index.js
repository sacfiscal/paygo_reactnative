import { useEffect, useState } from "react";
import Button from "../../Components/Common/Button";
import { Container } from "../../Components/Common/Container";
import Input from "../../Components/Common/Input";
import Text from "../../Components/Common/Text";
import * as S from "./styles";
import { HAlign } from "../../Components/Common/styles";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { getRealm } from "../../Database/realm";
import { Alert } from "react-native";
import { tef_Administrativa } from "../../Services/TEFService";

const initialState = {
  serieNfce: 1,
  nextNfce: 1,
  ambiente: 0,
};

export default Config = ({ navigation }) => {
  const [config, setConfig] = useState(initialState);
  const [company, setCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "HOMOLOGAÇÃO", value: 0 },
    { label: "PRODUÇÃO", value: 1 },
  ]);

  useEffect(() => {
    async function load() {
      const realm = await getRealm();

      const _company = await realm.objectForPrimaryKey("Company", 1);
      const _config = await realm.objectForPrimaryKey("Config", 1)?.toJSON();

      if (_company) {
        setCompany(_company);
      }

      if (_config) {
        setConfig(_config);
      }
    }

    load();
  }, []);

  function handleChange(e, a) {
    setConfig((prev) => ({ ...prev, [e]: a }));
  }

  function handleCombo(e, a) {
    setConfig((prev) => ({ ...prev, [e]: a() }));
  }

  async function save() {
    const realm = await getRealm();

    realm.write(() => {
      realm.create("Config", { ...config, _id: 1 }, "modified");
    });

    realm.close;

    navigation.pop();
  }

  function zeraBanco() {
    console.log("cli");

    Alert.alert(
      "** ATENÇÃO ** ",
      "Deseja zerar o banco de dados? ** Todas as informações serão perdidas!",
      [
        {
          text: "Sim",
          onPress: async () => {
            const realm = await getRealm();

            try {
              realm.beginTransaction();
              realm.deleteAll();
              realm.commitTransaction();
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
      ]
    );
  }

  return (
    <Container>
      <S.Header>
        <HAlign ac="center" jc="center">
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => navigation.pop()}
          />
          <S.Title>Configurações</S.Title>
          <AntDesign name="save" size={24} color="white" onPress={save} />
        </HAlign>
      </S.Header>

      <S.Page>
        <Text text="Empresa Emitente" />
        <Text
          text={company?.nome_fantasia}
          s="20"
          ml="10"
          mb="10"
          bold="true"
        />

        <Text text="CNPJ" />
        <Text text={company?.cpf_cnpj} s="20" ml="10" mb="10" bold="true" />
        <Text text="Ambiente" />
        <DropDownPicker
          open={open}
          value={config?.ambiente}
          items={items}
          placeholder="Tipo de pessoa"
          setOpen={setOpen}
          setValue={(v) => handleCombo("ambiente", v)}
          setItems={setItems}
          textStyle={{ fontSize: 20, fontWeight: "bold" }}
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            fontSize: 30,
          }}
          dropDownContainerStyle={{ backgroundColor: "white" }}
          containerStyle={{
            borderWidth: 0,
          }}
        />
        <Input
          text="Série"
          simple="true"
          onChangeText={(v) => handleChange("serieNfce", +v)}
          value={String(config.serieNfce)}
        />
        <Input
          text="Próximo Nº Nfce"
          simple="true"
          onChangeText={(v) => handleChange("nextNfce", +v)}
          value={String(config.nextNfce)}
        />
        <Text text="Opções Administrativas" mb="10" mt="10" />
        <Button
          text="Tef PayGO Administrativo"
          fontSize={14}
          onPress={tef_Administrativa}
          mb={5}
        />
        <Button
          text="Inutilizar NFC-e"
          fontSize={14}
          onPress={() => navigation.push("INUTILIZATION")}
        />
        <Text text="Opções Desenvolvimento" mb="10" mt="10" />
        <Button text="Zerar Banco" fontSize={14} onPress={zeraBanco} />
      </S.Page>
    </Container>
  );
};
