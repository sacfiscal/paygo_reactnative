import Realm from "realm";
import { ClientSchema } from "./Schemas/ClientSchema";
import { AddressSchema, CompanySchema } from "./Schemas/CompanySchema";
import { ConfigSchema } from "./Schemas/ConfigSchema";
import { InutilizationSchema } from "./Schemas/InutilizationSchema";
import { PaySchema } from "./Schemas/PaySchema";
import { ProductSchema } from "./Schemas/ProductSchema";
import { SaleItemsSchema, SaleSchema } from "./Schemas/SaleSchema";
import { UnitSchema } from "./Schemas/UnitSchema";

export const getRealm = async () =>
  await Realm.open({
    //path: "realm-files/myrealm",
    schema: [
      ClientSchema,
      ConfigSchema,
      PaySchema,
      ProductSchema,
      UnitSchema,
      SaleSchema,
      SaleItemsSchema,
      CompanySchema,
      AddressSchema,
      InutilizationSchema,
    ],
    schemaVersion: 24,
  });
