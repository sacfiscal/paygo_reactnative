import { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Container } from "../../../../Components/Common/Container";
import Input from "../../../../Components/Common/Input";
import { Line, HAlign } from "../../../../Components/Common/styles";
import * as S from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { getRealm } from "../../../../Database/realm";
import moment from "moment/moment";
import Button from "../../../../Components/Common/Button";
import { getToken, inutiliza } from "../../../../Services";

const initState = {
  _id: 0,
  ano: 0,
  serie: 0,
  numero_inicial: 0,
  numero_final: 0,
  justificativa: "",
};

export default AddForm = ({ navigation }) => {
  const [inut, setInut] = useState(initState);
  const [cnpj, setCnpj] = useState(null);

  useEffect(() => {
    async function getId() {
      const realm = await getRealm();

      const _last = realm.objects("Inutilization").max("_id");
      const config = realm.objectForPrimaryKey("Config", 1)?.toJSON();
      const company = realm.objectForPrimaryKey("Company", 1)?.toJSON();

      console.log(company);

      if (company) {
        setCnpj(company.cpf_cnpj);
      }

      setInut((prev) => ({
        ...prev,
        ["_id"]: _last ? _last + 1 : 1,
        ["ano"]: moment().year().toString(),
        ["serie"]: config?.serieNfce.toString(),
      }));

      realm.close;
    }

    getId();
  }, []);

  async function save() {
    const realm = await getRealm();

    getToken();
    const resp = await inutiliza({
      ambiente: "homologacao",
      cnpj,
      ano: +inut.ano,
      serie: +inut.serie,
      numero_inicial: +inut.numero_inicial,
      numero_final: +inut.numero_final,
      justificativa: inut.justificativa,
    });

    console.log(JSON.stringify(resp.data));

    if (resp?.data?.error) {
      Alert.alert("Error", resp.data.error.errors[0].message);
    }

    if (resp?.data?.status === "rejeitado") {
      Alert.alert("Error", resp.data.motivo_status);
    }

    realm.write(() => {
      realm.create(
        "Inutilization",
        { ...inut, ano: +inut.ano, serie: +inut.serie },
        "modified"
      );
    });

    realm.close;

    navigation.pop();
  }

  function handleChange(e, a) {
    setInut((prev) => ({ ...prev, [e]: a }));
  }

  function handleButton() {
    save();
    navigation.pop();
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
          <S.Title>Inutilização</S.Title>
        </HAlign>
      </S.Header>
      <S.Page>
        <ScrollView
          onMagicTap={true}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <Input
            text="Ano"
            simple={true}
            value={inut.ano}
            readOnly={true}
            onChangeText={(v) => handleChange("ano", v)}
            keyboardType="numeric"
          />
          <Input
            text="Série"
            simple={true}
            value={inut.serie}
            onChangeText={(v) => handleChange("serie", v)}
            keyboardType="numeric"
          />
          <Input
            text="Número inicial"
            simple={true}
            value={inut.numero_inicial.toString()}
            onChangeText={(v) => handleChange("numero_inicial", +v)}
            keyboardType="numeric"
          />
          <Input
            text="Número final"
            simple={true}
            value={inut.numero_final.toString()}
            onChangeText={(v) => handleChange("numero_final", +v)}
            keyboardType="numeric"
          />
          <Input
            text="Justificativa"
            simple={true}
            value={inut.justificativa}
            onChangeText={(v) => handleChange("justificativa", v)}
          />
          <Line />
        </ScrollView>
        <Button text={"Inutilizar"} h={50} onPress={handleButton} />
      </S.Page>
    </Container>
  );
};
