import styled from "styled-components/native";
import MaskInput from "react-native-mask-input";
import { Line } from "./styles";

const CPF_MASK = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const CNPJ_MASK = [
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const CEP_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
const FONE_MASK = [
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

function getMask(mask) {
  if (mask === "cep") return CEP_MASK;
  if (mask === "cnpj") return CNPJ_MASK;
  if (mask === "cpf") return CPF_MASK;
  if (mask === "fone") return FONE_MASK;
  if (mask === "") return CNPJ_MASK;
}

export default InputMask = (props) => {
  return (
    <InputHolder simple={props.simple}>
      <InputText>{props.text}</InputText>
      <InputStyle
        {...props}
        mask={getMask(props.mask)}
        keyboardType="numeric"
      />
      {props.simple && <Line mt={0} />}
    </InputHolder>
  );
};

export const InputText = styled.Text``;

export const InputStyle = styled(MaskInput)`
  width: 100%;
  height: 40px;
  color: black;
  margin-bottom: ${({ simple }) => (simple ? "0px" : "5px")};
  font-size: 20px;
`;

export const InputHolder = styled.View`
  border-width: ${({ simple }) => (simple ? "0px" : "1px")};
  border-radius: 10px;
  height: 70px;
  width: 100%;
  border-color: #bebebe;
  padding: 10px;
  margin-bottom: ${({ simple }) => (simple ? "0px" : "10px")};
`;
