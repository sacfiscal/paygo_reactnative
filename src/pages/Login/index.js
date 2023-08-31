import { Switch } from "react-native";
import Button from "../../Components/Common/Button";
import { Container } from "../../Components/Common/Container";
import Input from "../../Components/Common/Input";
import { AllLogos } from "../../Components/Common/Logos";
import Text from "../../Components/Common/Text";
import * as S from "./styles";
import { HAlign } from "../../Components/Common/styles";
import { PAGE } from "../../Consts";

export default Login = ({ navigation }) => {
  return (
    <Container>
      <S.Page>
        <Text
          text={"Acessar Conta"}
          mb={40}
          s={24}
          onPress={() => console.log("sim")}
        />
        <Input text={"Usuário"} />
        <Input text={"Senha"} secureTextEntry={true} />
        <Button
          text={"Login"}
          h={50}
          onPress={() => navigation.push(PAGE.MENU)}
        />
        <HAlign mt={10} mb={10}>
          <Switch disabled={false} value={true} />
          <Text text={"Manter dados de login?"} />
        </HAlign>
        <Text text={"Ainda não possui Usuário?"} />
        <Text text={"Criar Usuário"} link={true} bold={true} mt={5} />

        <AllLogos />
      </S.Page>
    </Container>
  );
};
