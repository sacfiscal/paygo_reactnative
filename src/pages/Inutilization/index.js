import Button from "../../Components/Common/Button";
import { useState, useCallback } from "react";
import { Container } from "../../Components/Common/Container";
import { ListaItem } from "./Components/ListItem";
import * as S from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { getRealm } from "../../Database/realm";

export const Inutilization = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  async function fecthData() {
    const realm = await getRealm();

    const _data = realm.objects("Inutilization").toJSON();

    setData(_data);
  }

  useFocusEffect(
    useCallback(() => {
      fecthData();
    }, [filter])
  );

  function handleButton() {
    navigation.push("AddInutilization");
  }

  return (
    <Container>
      <S.Page>
        <S.FlatListStyle
          data={data}
          renderItem={(data, index) => (
            <ListaItem key={index} item={data.item} />
          )}
        />
      </S.Page>
      <S.Footer>
        <Button text={"Incluir"} h={50} onPress={handleButton} />
      </S.Footer>
    </Container>
  );
};
