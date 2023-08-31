import styled from "styled-components/native";
import Text from "../../../../Components/Common/Text";

export const Page = styled.TouchableOpacity`
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 10px;
`;

export const TextItem = styled(Text)`
  color: red;
`;

export const IconView = styled.View`
  height: 32px;
  width: 32px;
  align-items: center;
`;
