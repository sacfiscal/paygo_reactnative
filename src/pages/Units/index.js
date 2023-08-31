import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Container } from "../../Components/Common/Container";
import Input from "../../Components/Common/Input";
import { getRealm } from "../../Database/realm";
import { ListaItem } from "./Components/ListItem/index";
import * as S from "./styles";

export const Units = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const { func } = route.params;

  async function fecthData() {
    const realm = await getRealm();

    const data = realm
      .objects("Unit")
      .filtered(`unidade contains[c] "${filter}"`);

    setData(data);
  }

  useFocusEffect(
    useCallback(() => {
      fecthData();
    }, [filter])
  );

  function onHandlePress(value) {
    func("unidade", value);
    navigation.pop();
  }

  return (
    <Container>
      <S.Page>
        <Input
          placeholder="Unidade"
          text="Pesquisa"
          onChangeText={setFilter}
          value={filter}
        />
        <S.FlatListStyle
          data={data}
          renderItem={(data, index) => (
            <ListaItem key={index} item={data.item} onPress={onHandlePress} />
          )}
        />
      </S.Page>
    </Container>
  );
};
