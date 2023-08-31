import styled from "styled-components/native";
import { ImageBackground } from "react-native";

export const Line = styled.View`
  width: 100%;
  border-color: #bebebe;
  border-width: 1px;
  background-color: "#bebebe";
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "5px")};
`;

export const ButtonStyle = styled.TouchableOpacity`
  height: ${({ h }) => (h ? `${h}px` : "40px")};
  width: ${({ w }) => (w ? `${w}px` : "100%")};
  background-color: ${({ cancel }) => (cancel ? "#fd8089" : "#eed96f")};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0px")};
`;

export const TextStyle = styled.Text`
  color: ${({ link, color }) => (link ? "#3939B8" : color ? color : "#232323")};
  font-weight: ${({ bold }) => (bold ? "bold" : "400")};
  font-size: ${({ s }) => (s ? `${s}px` : "16px")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0px")};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0px")};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : "0px")};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : "0px")};
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const ContainerStyle = styled(ImageBackground)`
  background-image: url("../../../assets/fundo.jpg");
  background-repeat: repeat;
  flex: 1;
`;

export const ImagemStyle = styled.Image`
  width: 80px;
  height: 60px;
  margin: 10px;
`;

export const HAlign = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: ${({ ac }) => (ac ? ac : "center")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  width: 100%;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0px")};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0px")};
`;

export const VAlign = styled.View`
  width: 100%;
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  align-content: ${({ ac }) => (ac ? ac : "center")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  flex-direction: column;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0px")};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0px")};
`;
