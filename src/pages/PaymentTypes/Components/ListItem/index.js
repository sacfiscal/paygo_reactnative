import { Line } from "../../../../Components/Common/styles";
import Text from "../../../../Components/Common/Text";
import { Page } from "./styles";

export const ListaItem = ({ item }) => {
  return (
    <Page>
      <Text s={12} bold={true} text={`Cód: Sefaz: ${item.codSefaz}`} />
      <Text s={28} bold={true} text={item.descricao} />
      <Line />
    </Page>
  );
};
