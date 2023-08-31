import { HAlign, Line } from "../../../../Components/Common/styles";
import { FontAwesome } from "@expo/vector-icons";
import { Page, TextItem, IconView } from "./styles";
import { useNavigation } from "@react-navigation/native";

export const MenuItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Page
      jc="flex-start"
      ac="flex-start"
      onPress={() => navigation.push(item.MENU)}
    >
      <HAlign jc="flex-start" ac="center">
        <IconView>
          <FontAwesome name={item.icon} size={30} color="#515151" />
        </IconView>
        <TextItem
          text={item.name}
          ml={10}
          s={20}
          bold={true}
          color={"#868080"}
        />
      </HAlign>
      <Line />
    </Page>
  );
};
