import * as S from "./styles";

export default Button = ({
  text,
  onPress,
  h,
  fontSize,
  mb,
  cancel,
  disabled,
}) => {
  return (
    <S.ButtonStyle
      onPress={onPress}
      h={h}
      mb={mb}
      cancel={cancel}
      disabled={disabled}
    >
      <S.TextStyle s={fontSize ? fontSize : 22}>{text}</S.TextStyle>
    </S.ButtonStyle>
  );
};
