import Text from "../../../../Components/Common/Text";
import { Page } from "./styles";
import moment from "moment";

export const ListaItem = ({ item, onPress, selected }) => {
  return (
    <Page onPress={onPress} selected={selected}>
      <Text
        s={12}
        bold={true}
        text={`NF: ${String(item._id).padStart(10, "0")}`}
      />
      <Text bold={true} text={`Status: ${item.status}`} s={12} />
      <Text
        bold={true}
        text={`Data  : ${moment(item.data).format("DD/MM/YYYY hh:mm")}`}
        s={12}
      />

      <Text
        s={20}
        bold={true}
        text={item.cliente ? item.cliente.razao_social : "NÃO IDENTIFICADO"}
        mb={20}
      />
      <Text bold={true} text={`CPF/CNPJ: ${item.cpfcnpj}`} s={14} />
      <Text
        bold={true}
        text={`Valor Total: R$ ${item.valorTotal?.toFixed(2)}`}
        s={14}
      />
    </Page>
  );
};
