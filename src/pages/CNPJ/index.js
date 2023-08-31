import Button from "../../Components/Common/Button";
import { Container } from "../../Components/Common/Container";
import { AllLogos } from "../../Components/Common/Logos";
import Text from "../../Components/Common/Text";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { HAlign } from "../../Components/Common/styles";
import MaskInput from "../../Components/Common/MaskInput";
import { getRealm } from "../../Database/realm";
import { getCompany, getToken } from "../../Services";
import { Alert } from "react-native";
import { useConfigStore } from "../../Store/ConfigStore";

async function loadUnits() {
  const realm = await getRealm();

  realm.write(() => {
    realm.delete(realm.objects("Unit"));

    realm.create("Unit", {
      _id: 1,
      unidade: "UN",
    });
    realm.create("Unit", {
      _id: 2,
      unidade: "CX",
    });
    realm.create("Unit", {
      _id: 3,
      unidade: "L",
    });
    realm.create("Unit", {
      _id: 4,
      unidade: "KG",
    });
    realm.create("Unit", {
      _id: 5,
      unidade: "M",
    });
    realm.create("Unit", {
      _id: 6,
      unidade: "CJ",
    });
    realm.create("Unit", {
      _id: 7,
      unidade: "GR",
    });
    realm.create("Unit", {
      _id: 8,
      unidade: "M2",
    });
    realm.create("Unit", {
      _id: 9,
      unidade: "M3",
    });
    realm.create("Unit", {
      _id: 10,
      unidade: "TON",
    });
  });

  realm.close();
}

async function loadPay() {
  const realm = await getRealm();

  realm.write(() => {
    realm.delete(realm.objects("Pay"));

    realm.create("Pay", {
      _id: 1,
      codSefaz: "01",
      descricao: "DINHEIRO",
    });

    realm.create("Pay", {
      _id: 2,
      codSefaz: "02",
      descricao: "CHEQUE",
    });

    realm.create("Pay", {
      _id: 3,
      codSefaz: "03",
      descricao: "CARTÃO DE CRÉDITO",
    });
    realm.create("Pay", {
      _id: 4,
      codSefaz: "04",
      descricao: "CARTÃO DE DÉBITO",
    });
    realm.create("Pay", {
      _id: 5,
      codSefaz: "05",
      descricao: "CRÉDITO DE LOJA",
    });

    realm.create("Pay", {
      _id: 6,
      codSefaz: "10",
      descricao: "VALE ALIMENTAÇÃO",
    });
    realm.create("Pay", {
      _id: 7,
      codSefaz: "11",
      descricao: "VALE REFEIÇÃO",
    });
    realm.create("Pay", {
      _id: 8,
      codSefaz: "12",
      descricao: "VALE PRESENTE",
    });

    realm.create("Pay", {
      _id: 9,
      codSefaz: "13",
      descricao: "VALE COMBUSTÍVEL",
    });
    realm.create("Pay", {
      _id: 10,
      codSefaz: "14",
      descricao: "DUPLICATA MERCANTIL",
    });
    realm.create("Pay", {
      _id: 11,
      codSefaz: "15",
      descricao: "BOLETO  BANCÁRIO",
    });
    realm.create("Pay", {
      _id: 12,
      codSefaz: "16",
      descricao: "DEPÓSITO  BANCÁRIO",
    });
    realm.create("Pay", {
      _id: 13,
      codSefaz: "17",
      descricao: "PIX",
    });
    realm.create("Pay", {
      _id: 14,
      codSefaz: "18",
      descricao: "TRANSF. BANCÁRIA",
    });
    realm.create("Pay", {
      _id: 15,
      codSefaz: "19",
      descricao: "CRÉDITO VIRTUAL",
    });
    realm.create("Pay", {
      _id: 16,
      codSefaz: "90",
      descricao: "SEM PAGAMENTO",
    });
    realm.create("Pay", {
      _id: 17,
      codSefaz: "99",
      descricao: "OUTROS",
    });
  });

  realm.close();
}

async function saveCompany(data) {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.create(
        "Company",
        {
          ...data,
          _id: 1,
          endereco: { ...data.endereco, _id: 1 },
        },
        "modified"
      );
    });
  } catch (error) {
    console.log(error);
  }
  realm.close;
}

export default CNPJ = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const addCompany = useConfigStore((state) => state.addCompany);

  async function companyExists() {
    const realm = await getRealm();

    const company = await realm.objectForPrimaryKey("Company", 1);

    if (company) {
      navigation.push("Login");
    }
  }

  useEffect(() => {
    companyExists();
  }, []);

  async function handleRegister() {
    //loadUnits();
    //loadPay();
    //deleteSales();
    //navigation.push("Login");
    if (value === "") {
      Alert.alert("Erro", "Informe o CNPJ habilitado no Nuvem Fiscal!");
      return;
    }

    setLoading(true);

    await getToken();
    const resp = await getCompany(value);

    if (resp.status === 200) {
      saveCompany(resp.data);
      addCompany(resp.data.cpf_cnpj);
      loadUnits();
      navigation.push("Login");
      console.log("==>", resp.data);
    } else {
      Alert.alert("Erro", resp.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <S.Page>
        <HAlign jc="flex-start">
          <Text
            text={"Olá,"}
            mb={40}
            s={24}
            bold={true}
            onPress={() => console.log("sim")}
          />
        </HAlign>
        <Text
          text={
            "Para iniciar o uso do aplicativo é necessário informar o CNPJ da empresa cadastrada na AP do Nuvem Fiscal"
          }
          mb={40}
          s={24}
          bold={true}
          onPress={() => console.log("sim")}
        />
        <MaskInput
          text={"CNPJ"}
          placeholder={"00.000.000/0000-00"}
          value={value}
          onChangeText={setValue}
        />
        <Button
          text={"Iniciar"}
          h={50}
          onPress={handleRegister}
          disabled={loading}
        />
        <Text text={"Ainda não possui cadastro?"} mt={10} s={18} bold={true} />
        <Text text={"Entre em contato com o link abaixo"} s={18} />
        <Text
          text={"http://www.nuvemfiscal.com.br"}
          s={18}
          link={true}
          bold={true}
        />

        <AllLogos />
      </S.Page>
    </Container>
  );
};
