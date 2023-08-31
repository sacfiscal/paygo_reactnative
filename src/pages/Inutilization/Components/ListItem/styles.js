import styled from "styled-components/native";

export const Page = styled.TouchableOpacity`
  border-radius: 10px;
  border-width: 2px;
  border-color: #bebebe;
  width: 100%;
  height: 150px;
  background-color: ${({ selected }) => (selected ? "orange" : "#f4f4f4")};
  margin-top: 10px;
  padding: 10px;
`;

export const Button = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-color: #bebebe;
  border-width: 1px;
  border-radius: 10px;
`;
