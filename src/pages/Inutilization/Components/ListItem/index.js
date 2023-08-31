import Text from "../../../../Components/Common/Text";
import { Page, Button } from "./styles";
import { VAlign, HAlign, Line } from "../../../../Components/Common/styles";
import { View } from "react-native";
import { useState } from "react";
import { SearchType } from "../../../../Consts";

const QuantityComp = ({ item }) => {
  const [quant, setQuant] = useState(item.quantidade);

  function handleButtonPlus() {
    item.quantidade += 1;
    setQuant((prev) => prev + 1);
  }

  function handleButtonMinus() {
    if (item.quantidade > 0) {
      item.quantidade -= 1;
      setQuant((prev) => prev - 1);
    }
  }

  return (
    <VAlign
      style={{
        width: 90,
        height: "100%",
        margin: 5,
      }}
      jc="flex-start"
      ac="center"
      ai="flex-end"
    >
      <Text text="Qtde." mt="10" />
      <Text text={`${item.quantidade},00`} mt="10" bold={true} s="19" />
      <HAlign>
        <Button onPress={handleButtonMinus}>
          <Text text="-" s="20" />
        </Button>
        <Button onPress={handleButtonPlus}>
          <Text text="+" s="20" />
        </Button>
      </HAlign>
    </VAlign>
  );
};

export const ListaItem = ({ item, type, onPress, selected }) => {
  return (
    <Page onPress={onPress} selected={selected}>
      <VAlign jc="flex-start">
        <Text text={`Ano: ${item.ano}      Série: ${item.serie}`}></Text>
        <Text
          bold={true}
          text={`Inicio: ${item.numero_inicial}      Fim: ${item.numero_final}`}
        ></Text>
        <Text mt={10} text="Justificativa"></Text>
        <Line />
        <Text text={item.justificativa}></Text>
      </VAlign>
    </Page>
  );
};
