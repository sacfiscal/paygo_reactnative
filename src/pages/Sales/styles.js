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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: black;
  width: 100%;
  height: auto;
  bottom: 0px;
  justify-content: center;
  padding: 10px;
`;
