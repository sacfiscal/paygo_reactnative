import { ContainerStyle } from "./styles";
import image from "../../../assets/fundo.jpg";

export const Container = (props) => {
  return (
    <ContainerStyle source={image} resizeMode="cover">
      {props.children}
    </ContainerStyle>
  );
};
