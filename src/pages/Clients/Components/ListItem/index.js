import Text from "../../../../Components/Common/Text";
import { Page } from "./styles";

export const ListaItem = ({ item, selected, onPress }) => {
  return (
    <Page selected={selected} onPress={onPress}>
      <Text
        s={12}
        bold={true}
        text={`Código: ${String(item._id).padStart(5, "0")}`}
      />
      <Text s={24} bold={true} text={item.razao_social} mb={20} />
      <Text bold={true} text={`CPF/CNPJ: ${item.cnpj_cpf}`} />
      <Text bold={true} text={`contato: ${item.fone}`} />
      <Text bold={true} text={`email: ${item.email}`} />
    </Page>
  );
};
