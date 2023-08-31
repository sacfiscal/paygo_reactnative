import { NativeModules } from "react-native";

var GertecGPOS700 = NativeModules.GertecGPOS700;

export function printDanfe(data) {
  var arr = data.split("\n");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes("https")) {
      GertecGPOS700.imprimeBarCode(arr[i], 280, 280, "QR_CODE");
    } else {
      GertecGPOS700.imprimeTexto(
        arr[i],
        "DEFAULT",
        20,
        false,
        false,
        false,
        "LEFT"
      );
    }
  }

  GertecGPOS700.avancaLinha(150);
  GertecGPOS700.fimImpressao();
}

export function printCartao(data) {
  GertecGPOS700.imprimeTexto(data, "DEFAULT", 20, false, false, false, "LEFT");
  GertecGPOS700.avancaLinha(150);
  GertecGPOS700.fimImpressao();
}
