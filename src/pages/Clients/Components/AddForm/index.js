import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Container } from "../../../../Components/Common/Container";
import Input from "../../../../Components/Common/Input";
import MaskInput from "../../../../Components/Common/MaskInput";
import { Line, HAlign } from "../../../../Components/Common/styles";
import Text from "../../../../Components/Common/Text";
import * as S from "./styles";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { getRealm } from "../../../../Database/realm";

const initState = {
  cnpj_cpf: "",
  razao_social: "",
  nome_fantasia: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  codigo_municipio: "",
  municipio: "",
  uf: "",
  cep: "",
  fone: "",
  ie: "",
  email: "",
  tipo: null,
};

export default AddForm = ({ navigation, route }) => {
  const [client, setClient] = useState(initState);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "PESSOA FÍSICA", value: 0 },
    { label: "PESSOA JURÍDICA", value: 1 },
  ]);
  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const realm = await getRealm();
      const obj = realm.objectForPrimaryKey("Client", id).toJSON();

      setClient(obj);
    }

    if (id !== 0) {
      load();
    }
  }, [id]);

  async function save() {
    const realm = await getRealm();

    const _last = realm.objects("Client").max("_id");

    if (id === 0) {
      client._id = _last ? _last + 1 : 1;
    } else {
      client._id = id;
    }

    realm.write(() => {
      realm.create("Client", client, "modified");
    });

    realm.close;

    navigation.pop();
  }

  function handleChange(e, a) {
    setClient((prev) => ({ ...prev, [e]: a }));
  }

  function handleCombo(e, a) {
    setClient((prev) => ({ ...prev, [e]: a() }));
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
          <S.Title>Cliente</S.Title>
          <AntDesign name="save" size={24} color="white" onPress={save} />
        </HAlign>
      </S.Header>
      <S.Page>
        <Text text="Tipo de Cadastro" />
        <DropDownPicker
          open={open}
          value={client.tipo}
          items={items}
          placeholder="Tipo de pessoa"
          setOpen={setOpen}
          setValue={(v) => handleCombo("tipo", v)}
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
        <Line />
        <ScrollView onMagicTap={true} showsVerticalScrollIndicator={true}>
          <MaskInput
            text="CNPJ/CPF"
            simple={true}
            mask={client.tipo === 0 ? "cpf" : "cnpj"}
            value={client.cnpj_cpf}
            onChangeText={(v) => handleChange("cnpj_cpf", v)}
          />
          <Input
            text="Razão Social"
            simple={true}
            value={client.razao_social}
            onChangeText={(v) => handleChange("razao_social", v)}
          />
          <Input
            text="Nome Fantasia"
            simple={true}
            value={client.nome_fantasia}
            onChangeText={(v) => handleChange("nome_fantasia", v)}
          />
          <Input
            text="Inscrição Estadual"
            simple={true}
            value={client.ie}
            onChangeText={(v) => handleChange("ie", v)}
          />
          <MaskInput
            text="Contato"
            simple={true}
            value={client.fone}
            mask="fone"
            onChangeText={(v) => handleChange("fone", v)}
          />
          <Input
            text="E-Mail"
            simple={true}
            value={client.email}
            onChangeText={(v) => handleChange("email", v)}
          />
          <MaskInput
            text="CEP"
            mask="cep"
            simple={true}
            value={client.cep}
            onChangeText={(v) => handleChange("cep", v)}
          />
          <Input
            text="Logradouro"
            simple={true}
            value={client.logradouro}
            onChangeText={(v) => handleChange("logradouro", v)}
          />
          <HAlign>
            <Input
              text="Nº"
              simple={true}
              s={"20%"}
              value={client.numero}
              onChangeText={(v) => handleChange("numero", v)}
            />
            <Input
              text="Complemento"
              simple={true}
              s={"80%"}
              value={client.complemento}
              onChangeText={(v) => handleChange("complemento", v)}
            />
          </HAlign>
          <Input
            text="Bairro"
            simple={true}
            value={client.bairro}
            onChangeText={(v) => handleChange("bairro", v)}
          />
          <HAlign>
            <Input
              text="Cidade / Municipio"
              simple={true}
              s={"80%"}
              value={client.municipio}
              onChangeText={(v) => handleChange("municipio", v)}
            />
            <Input
              text="UF"
              simple={true}
              s={"20%"}
              value={client.uf}
              onChangeText={(v) => handleChange("uf", v)}
            />
          </HAlign>

          <Line />
        </ScrollView>
      </S.Page>
    </Container>
  );
};
