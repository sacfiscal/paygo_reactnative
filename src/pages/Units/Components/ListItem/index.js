import { Line } from "../../../../Components/Common/styles";
import Text from "../../../../Components/Common/Text";
import { Page } from "./styles";

export const ListaItem = ({ item, onPress }) => {
  return (
    <Page onPress={() => onPress(item.unidade)}>
      <Text s={32} bold={true} text={item.unidade} />
      <Line />
    </Page>
  );
};
