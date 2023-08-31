import Text from "../../../../Components/Common/Text";
import { Page, Button } from "./styles";
import { VAlign, HAlign } from "../../../../Components/Common/styles";
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
      <HAlign jc="flex-start">
        <VAlign style={{ flex: 1 }}>
          <Text
            s={12}
            bold={true}
            text={`Código: ${String(item._id).padStart(5, "0")}`}
          />
          <Text s={24} bold={true} text={item.descricao} mb={20} />
          <Text
            bold={true}
            text={`EAN: ${item.cean === "" ? "SEM GTIN" : item.cean}`}
          />
          <Text bold={true} text={`Preço: R$ ${item.valor.toFixed(2)}`} />
        </VAlign>
        {type === SearchType.SELECT && (
          <View
            style={{ width: 2, height: "100%", backgroundColor: "black" }}
          />
        )}
        {type === SearchType.SELECT && <QuantityComp item={item} />}
      </HAlign>
    </Page>
  );
};
