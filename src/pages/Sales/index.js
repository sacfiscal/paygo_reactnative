import Button from "../../Components/Common/Button";
import Text from "../../Components/Common/Text";
import { useState, useCallback } from "react";
import { Container } from "../../Components/Common/Container";
import Input from "../../Components/Common/Input";
import { ListaItem } from "./Components/ListItem";
import * as S from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { getRealm } from "../../Database/realm";
import { NFEStatus, PAGE } from "../../Consts";
import DropDownPicker from "react-native-dropdown-picker";

export const Sales = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState(NFEStatus.Pendente);
  const [filter, setFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Pendente", value: NFEStatus.Pendente },
    { label: "Emitida", value: NFEStatus.Enviada },
    { label: "Cancelada", value: NFEStatus.Cancelada },
    { label: "Todas", value: "" },
  ]);

  async function fecthData() {
    const realm = await getRealm();

    const data = realm
      .objects("Sale")
      .filtered(`cpfcnpj contains[c] "${filter}"`);

    setData(data);
  }

  useFocusEffect(
    useCallback(() => {
      fecthData();
    }, [filter])
  );

  function onHandleSelect(id) {
    if (selected === id) {
      setSelected(0);
    } else {
      setSelected(id);
    }
  }

  return (
    <Container>
      <S.Page>
        <Input placeholder="Nome do Cliente" text="Pesquisa" />
        <S.FlatListStyle
          data={data}
          renderItem={(data, index) => (
            <ListaItem
              key={index}
              item={data.item}
              selected={selected === data.item._id}
              onPress={() => onHandleSelect(data.item._id)}
            />
          )}
        />
      </S.Page>
      <S.Footer>
        <Text
          text="Selecione o Tipo de NF á Exibir"
          color={"white"}
          mt={10}
          align="center"
        />
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          placeholder="Tipo de pessoa"
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
          textStyle={{ fontSize: 14, fontWeight: "bold", color: "white" }}
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            fontSize: 30,
            borderWidth: 1,
            borderBottomWidth: 2,
            borderBottomColor: "cyan",
            marginBottom: 10,
          }}
          dropDownContainerStyle={{
            backgroundColor: "black",
          }}
          containerStyle={{
            borderWidth: 0,
          }}
        />
        <Button
          text={selected === 0 ? "Incluir" : "Alterar"}
          h={50}
          onPress={() => navigation.push(PAGE.ADD_SALES, { id: selected })}
        />
      </S.Footer>
    </Container>
  );
};
