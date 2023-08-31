import Button from "../../Components/Common/Button";
import { useState, useCallback } from "react";
import { Container } from "../../Components/Common/Container";
import Input from "../../Components/Common/Input";
import { ListaItem } from "./Components/ListItem";
import * as S from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { getRealm } from "../../Database/realm";
import { PAGE, SearchType } from "../../Consts";
import { useSaleStore } from "../../Store/SaleStore";
import { v4 as uuid } from "uuid";

export const Products = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const addItem = useSaleStore((state) => state.addItem);
  const [selected, setSelected] = useState(0);

  const { type } = route.params;

  async function fecthData() {
    let newData = [];
    const realm = await getRealm();

    const _data = realm
      .objects("Product")
      .filtered(`descricao contains[c] "${filter}"`)
      .toJSON();

    if (_data.length > 0) {
      newData = _data.map((el) => {
        return { ...el, quantidade: 0 };
      });
    }

    setData(newData);
  }

  useFocusEffect(
    useCallback(() => {
      fecthData();
    }, [filter])
  );

  function handleClick(id) {
    console.log(type);

    if (type === SearchType.SELECT) {
      setSelected(0);
      return;
    }

    setSelected((prev) => {
      if (prev === id) {
        return 0;
      } else return id;
    });
  }

  function handleButton() {
    if (type === SearchType.NORMAL) {
      navigation.push(PAGE.ADD_PRODUCT, { id: selected });
    } else {
      data
        .filter((item) => item.quantidade > 0)
        .forEach((element) => {
          addItem({
            product: element,
            quantidade: element.quantidade,
            valorTotal: element.quantidade * element.valor,
            _id: uuid(),
          });
        });

      navigation.pop();
    }
  }

  return (
    <Container>
      <S.Page>
        <Input placeholder="Nome do produto" text="Pesquisa" />
        <S.FlatListStyle
          data={data}
          renderItem={(data, index) => (
            <ListaItem
              key={index}
              item={data.item}
              type={type}
              onPress={() => handleClick(data.item._id)}
              selected={selected === data.item._id}
            />
          )}
        />
      </S.Page>
      <S.Footer>
        <Button
          text={
            type === SearchType.SELECT
              ? "Selecionar"
              : selected
              ? "Editar"
              : "Incluir"
          }
          h={50}
          onPress={handleButton}
        />
      </S.Footer>
    </Container>
  );
};
