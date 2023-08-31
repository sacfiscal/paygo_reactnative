import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Container } from "../../../../Components/Common/Container";
import Input from "../../../../Components/Common/Input";
import { Line, HAlign } from "../../../../Components/Common/styles";
import * as S from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { getRealm } from "../../../../Database/realm";
import { PAGE } from "../../../../Consts";

const initState = {
  _id: 0,
  codSefaz: "",
  descricao: "",
  codigo: "",
  cean: "",
  cbarra: "",
  descricao: "",
  ncm: "",
  cest: "",
  cfop: 0,
  unidade: "",
  valor: 0,
  codigoAnp: "",
  origem: "",
  cstIcms: "",
  cstpiscofins: "",
  ativo: false,
};

export default AddForm = ({ navigation, route }) => {
  const [product, setProduct] = useState(initState);
  const [open, setOpen] = useState(false);
  const { id } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadUnits() {
      const realm = await getRealm();

      const _units = realm.objects("Unit")?.toJSON();

      const units = _units.map((u) => ({ label: u.unidade, value: u.unidade }));

      setItems(units);

      realm.close;
    }

    async function getId() {
      const realm = await getRealm();

      const _last = realm.objects("Product").max("_id");

      setProduct((prev) => ({
        ...prev,
        ["_id"]: _last ? String(_last + 1) : "1",
      }));

      realm.close;
    }

    async function load() {
      const realm = await getRealm();
      const obj = realm.objectForPrimaryKey("Product", id).toJSON();

      setProduct(obj);

      realm.close;
    }

    if (id === 0) {
      getId();
    } else {
      load();
    }

    loadUnits();
  }, [id]);

  async function save() {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        "Product",
        { ...product, _id: +product._id, valor: +product.valor },
        "modified"
      );
    });

    realm.close;

    navigation.pop();
  }

  function handleChange(e, a) {
    setProduct((prev) => ({ ...prev, [e]: a }));
  }

  function handleSearchUnit() {
    navigation.push(PAGE.UNITS, { func: handleChange });
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
          <S.Title>Produto</S.Title>
          <AntDesign name="save" size={24} color="white" onPress={save} />
        </HAlign>
      </S.Header>
      <S.Page>
        <ScrollView
          onMagicTap={true}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <Input
            text="Código"
            simple={true}
            value={product?._id?.toString()}
            onChangeText={(v) => handleChange("_id", v)}
            inputMode="numeric"
            editable={false}
          />
          <Input
            text="Descrição"
            simple={true}
            value={product.descricao}
            onChangeText={(v) => handleChange("descricao", v)}
          />
          <Input
            text="EAN"
            simple={true}
            value={product.cean}
            onChangeText={(v) => handleChange("cean", v)}
            keyboardType="numeric"
          />
          <Input
            text="NCM"
            simple={true}
            value={product.ncm}
            onChangeText={(v) => handleChange("ncm", v)}
            keyboardType="numeric"
          />
          <Input
            text="CEST"
            simple={true}
            value={product.cest}
            onChangeText={(v) => handleChange("cest", v)}
            keyboardType="numeric"
          />
          <Input
            text="CFOP"
            simple={true}
            value={product.cfop}
            onChangeText={(v) => handleChange("cfop", v)}
            keyboardType="numeric"
          />
          <Input
            text="Unidade"
            simple={true}
            value={product.unidade}
            onChangeText={(v) => handleChange("unidade", v)}
            onSearch={handleSearchUnit}
          />
          <Input
            text="Valor"
            simple={true}
            value={
              !isNaN(product.valor)
                ? product.valor.toString()
                : parseFloat(product.valor).toFixed(2).toString()
            }
            onChangeText={(v) => handleChange("valor", v)}
            keyboardType="numeric"
          />
          <Input
            text="Código ANP"
            simple={true}
            value={product.codigoAnp}
            onChangeText={(v) => handleChange("codigoAnp", v)}
            keyboardType="numeric"
          />
          <Input
            text="Origem"
            simple={true}
            value={product.origem}
            onChangeText={(v) => handleChange("uf", v)}
          />
          <Input
            text="CST ICMS"
            simple={true}
            value={product.cstIcms}
            onChangeText={(v) => handleChange("cstIcms", v)}
            keyboardType="numeric"
          />
          <Input
            text="CST PIS/COFINS"
            simple={true}
            value={product.cstpiscofins}
            onChangeText={(v) => handleChange("cstpiscofins", v)}
            keyboardType="numeric"
          />
          <Line />
        </ScrollView>
      </S.Page>
    </Container>
  );
};
