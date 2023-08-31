import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Page = styled.View`
  flex: 1;
  padding: 10px;
`;

export const FlatListStyle = styled(FlatList)`
  flex: 1;
`;

export const Footer = styled.View`
  background-color: black;
  width: 100%;
  height: 65px;
  bottom: 0px;
  justify-content: center;
`;
