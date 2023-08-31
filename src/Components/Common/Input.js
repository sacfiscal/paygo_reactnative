import styled from "styled-components/native";
import { TextInput } from "react-native";
import { HAlign, Line } from "./styles";
import { AntDesign } from "@expo/vector-icons";

// const Color = {
//   GRAY: {
//     100: "#232323",
//     80: "#373737",
//     70: "#868080",
//     50: "#BEBEBE",
//     10: "#F4F4F4",
//   },
//   YELLOW: {
//     100: "#FFD500",
//     80: "#FFE561",
//     50: "#FFF1AA",
//     10: "#FFF7CD",
//   },
// };

export default Input = (props) => {
  return (
    <InputHolder simple={props.simple} s={props.s}>
      <InputText>{props.text}</InputText>
      <HAlign style={{ paddingLeft: 20 }}>
        <InputStyle {...props} autoCapitalize="characters" />
        {props.onSearch && (
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
            onPress={props.onSearch}
          />
        )}
      </HAlign>
      {props.simple && <Line mb={0} />}
    </InputHolder>
  );
};

export const InputText = styled.Text``;

export const InputStyle = styled(TextInput)`
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
  width: ${({ s }) => (s ? `${s}` : "100%")};
  border-color: #bebebe;
  padding: 10px;
  margin-bottom: ${({ simple }) => (simple ? "0px" : "10px")};
`;
