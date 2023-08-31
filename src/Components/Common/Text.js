import { TextStyle } from "./styles";

export default Text = ({
  text,
  mb,
  s,
  mt,
  bold,
  ml,
  mr,
  link,
  color,
  onPress,
  align,
}) => {
  return (
    <TextStyle
      color={color}
      mb={mb}
      mt={mt}
      s={s}
      bold={bold}
      ml={ml}
      mr={mr}
      onPress={onPress}
      link={link}
      align={align}
    >
      {text}
    </TextStyle>
  );
};
