import logo_fiscal from "../../../assets/logo_fiscal.png";
import logo_paygo from "../../../assets/logo_paygo.png";
import logo_sac from "../../../assets/logo_sacfiscal.png";
import { ImagemStyle, HAlign } from "./styles";

export const LogoPaygo = () => {
  return <ImagemStyle source={logo_paygo} resizeMode="contain" />;
};

export const LogoFiscal = () => {
  return <ImagemStyle source={logo_fiscal} resizeMode="contain" />;
};

export const LogoSac = () => {
  return <ImagemStyle source={logo_sac} resizeMode="contain" />;
};

export const AllLogos = () => {
  return (
    <HAlign mt={5}>
      <LogoSac />
      <LogoPaygo />
      <LogoFiscal />
    </HAlign>
  );
};
