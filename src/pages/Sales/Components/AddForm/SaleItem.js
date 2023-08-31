import styled from "styled-components/native";
import Text from "../../../../Components/Common/Text";

export const SaleItem = ({ item, onPress, selected }) => {
  return (
    <Card onPress={onPress} selected={selected}>
      <Text
        text={`Código: ${String(item.product._id).padStart(5, "0")}`}
        s={12}
      />
      <Text text={item.product.descricao} mb={16} />
      <Text
        text={`EAN: ${
          item.product.cean === "" ? "SEM GTIN" : item.product.cean
        }`}
        s={12}
      />
      <Text
        text={`Qtde. x Preço: ${item.quantidade.toFixed(
          2
        )} x R$ ${item.product.valor.toFixed(2)}`}
        s={12}
      />
      <Text text={`Valor Total: R$ ${item.valorTotal.toFixed(2)}`} s={12} />
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  background-color: red;
  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #bebebe;
  background-color: ${({ selected }) => (selected ? "orange" : "#f4f4f4")};
  margin-bottom: 5px;
`;
