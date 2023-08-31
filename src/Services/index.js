import axios from "axios";
import qs from "qs";
import instante, { setClientToken } from "../Connection";
import { getRealm } from "../Database/realm";
import { useSaleStore } from "../Store/SaleStore";

export async function getToken() {
  console.log("Pegando Token");

  const data = {
    grant_type: "client_credentials",
    client_id: "ClaloOc8Sd8eVxUgytk7",
    client_secret: "aPg9W29s0R0T0jlbHc3wvbMM9MoCGPO8LnIirufb",
    scope: "empresa cep cnpj nfe nfce nfse cte mdfe",
  };

  const resp = await axios.post(
    "https://auth.nuvemfiscal.com.br/oauth/token",
    qs.stringify(data),
    { headers: { "content-type": "application/x-www-form-urlencoded" } }
  );

  setClientToken(resp.data.access_token);
}

export async function getCompany(cnpj) {
  let resp;
  try {
    resp = await instante.get(`/empresas/${cnpj}`);
  } catch (error) {
    console.log("Error: ", JSON.stringify(error));
    return error;
  }

  return resp;
}

export async function cancelNCFe(id) {
  let resp;
  try {
    resp = await instante.post(`/nfce/${id}/cancelamento`, {
      justificativa: "Cancelamento manual!",
    });
  } catch (error) {
    console.log("Error: ", JSON.stringify(error));
    return error;
  }

  return resp;
}

export async function sendNFCE(nota) {
  console.log("Enviando Nota");

  try {
    const resp = await instante.post("/nfce", nota);

    return resp.data;
  } catch (error) {
    console.log("erro ->", JSON.stringify(error.response));
  }
}

export async function getDanfe(id) {
  console.log("Recuperando Danfe");

  try {
    const resp = await instante.get(
      `/nfce/${id}/escpos?modelo=0&colunas=40&qrcode_lateral=false`,
      { headers: { "Content-type": "text/plain" } }
    );

    return resp;
  } catch (error) {
    console.log("erro ->", JSON.stringify(error.response));
  }
}

export async function inutiliza(dados) {
  console.log("Inutilizanto");
  try {
    const resp = await instante.post(`/nfce/inutilizacoes`, dados);

    return resp;
  } catch (error) {
    console.log("erro ->", JSON.stringify(error.response));
    return error.response;
  }
}

export async function makeNFCE(payType) {
  const realm = await getRealm();
  let totalImposto = 0;
  let totalNF = 0;

  const company = realm.objectForPrimaryKey("Company", 1);
  const config = realm.objectForPrimaryKey("Config", 1);

  console.log("numero nota", config);

  const itens = useSaleStore.getState().itens;

  const nfceItems = itens.map((item, index) => {
    totalImposto += item.valorTotal * 0.34;
    totalNF += item.valorTotal;

    return {
      nItem: index + 1,
      prod: {
        cProd: String(item.product._id),
        cEAN: item.product.cbarra !== "" ? item.product.cbarra : "SEM GTIN",
        xProd: item.product.descricao,
        NCM: item.product.ncm,
        CEST: item.product.cest,
        CFOP: 5102,
        uCom: item.product.unidade,
        qCom: item.quantidade,
        vUnCom: item.product.valor,
        vProd: item.product.valor * item.quantidade,
        cEANTrib: "SEM GTIN",
        uTrib: "UN",
        qTrib: item.quantidade,
        vUnTrib: item.product.valor,
        indTot: 1,
      },
      imposto: {
        vTotTrib: item.valorTotal * 0.34,
        ICMS: {
          ICMSSN102: {
            orig: 0,
            CSOSN: 102,
          },
        },
      },
    };
  });

  if (company) {
    return {
      ambiente: "homologacao",
      infNFe: {
        versao: "4.00",
        ide: {
          cUF: +company.endereco.codigo_municipio.substr(0, 2),
          cNF: String(config.nextNfce + 1).padEnd(8, "0"),
          natOp: "VENDA",
          mod: 65,
          serie: config.serieNfce,
          nNF: config.nextNfce,
          dhEmi: new Date(),
          dhSaiEnt: new Date(),
          tpNF: 1,
          idDest: 1,
          cMunFG: company.endereco.codigo_municipio,
          tpImp: 4,
          tpEmis: 1,
          cDV: 0,
          tpAmb: 2,
          finNFe: 1,
          indFinal: 1,
          indPres: 1,
          indIntermed: 0,
          procEmi: 0,
          verProc: "ACBrNFe",
        },
        emit: {
          CNPJ: company.cpf_cnpj,
          xNome: company.nome_razao_social,
          xFant: company.nome_fantasia,
          enderEmit: {
            xLgr: company.endereco.logradouro,
            nro: company.endereco.numero,
            xCpl: company.endereco.complemento
              ? company.endereco.complemento
              : null,
            xBairro: company.endereco.bairro,
            cMun: company.endereco.codigo_municipio,
            xMun: company.endereco.cidade,
            UF: company.endereco.uf,
            CEP: company.endereco.cep,
            cPais: +company.endereco.codigo_pais,
            xPais: "BRASIL",
          },
          IE: company.inscricao_estadual.replace("/", "").replace("-", ""),
          CRT: 1,
        },
        det: nfceItems,
        total: {
          ICMSTot: {
            vBC: 0,
            vICMS: 0,
            vICMSDeson: 0,
            vFCPUFDest: 0,
            vICMSUFDest: 0,
            vICMSUFRemet: 0,
            vFCP: 0,
            vBCST: 0,
            vST: 0,
            vFCPST: 0,
            vFCPSTRet: 0,
            vProd: totalNF,
            vFrete: 0,
            vSeg: 0,
            vDesc: 0,
            vII: 0,
            vIPI: 0,
            vIPIDevol: 0,
            vPIS: 0,
            vCOFINS: 0,
            vOutro: 0,
            vNF: totalNF,
            vTotTrib: totalImposto,
          },
        },
        transp: {
          modFrete: 9,
        },
        pag: {
          detPag: [
            {
              tPag:
                payType === "DINHEIRO"
                  ? "01"
                  : payType === "CARTAO_CREDITO"
                  ? "03"
                  : "04",
              vPag: totalNF,
            },
          ],
          vTroco: 0,
        },
        infAdic: {
          infCpl: "Federal R$ 0,16 ;Estadual R$ 0,18 ;Municipal R$ 0,00",
        },
      },
    };
  }
}
