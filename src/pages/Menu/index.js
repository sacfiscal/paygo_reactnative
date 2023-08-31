import Button from "../../Components/Common/Button";
import Text from "../../Components/Common/Text";
import { Container } from "../../Components/Common/Container";
import { AllLogos } from "../../Components/Common/Logos";
import * as S from "./styles";
import { HAlign, Line } from "../../Components/Common/styles";
import { MenuData } from "../../Data";
import { MenuItem } from "./Components/MenuItem";

export default Menu = ({ navigation }) => {
  return (
    <Container>
      <S.Page>
        <HAlign jc="flex-start">
          <Text text={"Olá, admin"} bold={true} s={27} />
        </HAlign>
        <Line />

        {MenuData.map((menu, index) => (
          <MenuItem key={index} item={menu} />
        ))}

        <AllLogos />
        <Button h={46} text={"Sair"} onPress={() => navigation.pop()} />
      </S.Page>
    </Container>
  );
};
