import Button from "../../../../Components/Common/Button";
import Text from "../../../../Components/Common/Text";
import * as S from "./styles";
import MaskInput from "../../../../Components/Common/MaskInput";
import { useState } from "react";
import { useSaleStore } from "../../../../Store/SaleStore";

export const IdentClient = ({ navigation }) => {
  const [value, setValue] = useState("");
  const setCPF = useSaleStore((state) => state.setCPF);

  function onHandleCPF() {
    setCPF(value);
    navigation.pop();
  }

  return (
    <S.Page>
      <S.Main>
        <Text text="Informe o CPF do Cliente" bold="true" mb="5" />
        <MaskInput
          text={"CPF"}
          placeholder={"000.000.000-00"}
          value={value}
          onChangeText={setValue}
        />

        <Button text="Confirmar" fontSize={16} mb="5" onPress={onHandleCPF} />
        <Button text="Consultar Cliente" fontSize={16} mb="5" />
        <Button
          text="Cancelar"
          fontSize={16}
          mb="5"
          cancel={true}
          onPress={() => navigation.pop()}
        />
      </S.Main>
    </S.Page>
  );
};
