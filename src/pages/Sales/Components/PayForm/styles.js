import styled from "styled-components";

export const Header = styled.View`
  padding: 5px;
  background-color: black;
  width: 100%;
  height: 50px;
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

export const Container = styled.View`
  flex: 1;
`;

export const Panel = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 60px;
  margin-top: 10px;
`;

export const Label = styled.Text`
  color: "black";
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Log = styled.Text`
  color: "black";
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;


export const Price = styled.Text`
  font-size: 48px;
  font-weight: bold;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  background-color: ${({ color }) => (color ? color : "#2E8A57")};
  border-radius: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const LabelButton = styled.Text`
  font-size: 18px;
  color: ${({ color }) => (color ? color : "black")};
`;
