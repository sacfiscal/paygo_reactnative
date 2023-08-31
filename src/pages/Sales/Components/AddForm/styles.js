import styled from "styled-components/native";

export const Page = styled.View`
  padding: 5px;
  flex: 1;
`;

export const Header = styled.View`
  padding: 10px;
  background-color: #292929;
  width: 100%;
  height: auto;
  justify-content: center;
  padding: 10px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
  flex: 1;
  height: auto;
  font-weight: bold;
`;

export const Label = styled.Text`
  color: ${({ color }) => (color ? color : "white")};
  font-size: ${({ size }) => (size ? `${size}px` : "14px")};
`;

export const Footer = styled.View`
  width: 100%;
  height: auto;
  background-color: #292929;
  padding: 10px;
`;

export const BasicButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
export const ConfirmButton = styled.TouchableOpacity`
  height: 50px;
  width: 100px;
  background-color: ${({ disabled }) => (disabled ? "#646464" : "#efda70")};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
export const AddButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background-color: ${({ exclude }) => (exclude ? "red" : "#f4f4f4")};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const PrintPage = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const PrintInfo = styled.View`
  width: 100%;
  height: 80px;
  background-color: #efda70;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
