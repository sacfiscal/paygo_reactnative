import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import CNPJ from "./src/pages/CNPJ";
import Menu from "./src/pages/Menu";
import { Clients } from "./src/pages/Clients";
import { Products } from "./src/pages/Products";
import { Units } from "./src/pages/Units";
import { Pay } from "./src/pages/PaymentTypes";
import AddClientForm from "./src/pages/Clients/Components/AddForm";
import AddProductForm from "./src/pages/Products/Components/AddForm";
import AddSalesForm from "./src/pages/Sales/Components/AddForm";
import AddInutilizationForm from "./src/pages/Inutilization/Components/AddForm";
import { Sales } from "./src/pages/Sales";
import { IdentClient } from "./src/pages/Sales/Components/IdentClient";
import { Teste } from "./src/pages/Teste";
import Config from "./src/pages/Config";
import { PayForm } from "./src/pages/Sales/Components/PayForm";
import { Inutilization } from "./src/pages/Inutilization";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_bottom",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white", justifyContent: "center" },
          headerStyle: { backgroundColor: "black", color: "white" },
        }}
      >
        {/* <Stack.Screen name="TESTE" component={Teste} /> */}
        <Stack.Screen name="CNPJ" component={CNPJ} />
        <Stack.Screen
          name="MENU"
          component={Menu}
          options={{
            headerShown: true,
            headerTitle: "Menu de Opções",
          }}
        />
        <Stack.Screen
          name="CLIENTS"
          component={Clients}
          options={{
            headerShown: true,
            headerTitle: "Clientes",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
          initialParams={{ type: "NORMAL" }}
        />
        <Stack.Screen
          name="PRODUCTS"
          component={Products}
          options={{
            headerShown: true,
            headerTitle: "Produtos",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
          initialParams={{ type: "NORMAL" }}
        />
        <Stack.Screen
          name="SALES"
          component={Sales}
          options={{
            headerShown: true,
            headerTitle: "Vendas",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CONFIG" component={Config} />
        <Stack.Screen
          name="UNITS"
          component={Units}
          options={{
            headerShown: true,
            headerTitle: "Unidades",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="PAY"
          component={Pay}
          options={{
            headerShown: true,
            headerTitle: "Formas de Pagamento",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="INUTILIZATION"
          component={Inutilization}
          options={{
            headerShown: true,
            headerTitle: "Inutilizar sequência de NFC-e",
            animation: "slide_from_right",
            headerBackVisible: "true",
            headerBackTitle: "Voltar",
            headerTintColor: "white",
          }}
        />

        <Stack.Screen name="AddClient" component={AddClientForm} />
        <Stack.Screen name="AddProduct" component={AddProductForm} />
        <Stack.Screen name="AddSales" component={AddSalesForm} />
        <Stack.Screen
          name="AddInutilization"
          component={AddInutilizationForm}
        />
        <Stack.Screen name="PayForm" component={PayForm} />
        <Stack.Screen
          name="IDENT_CLIENT"
          component={IdentClient}
          options={{
            presentation: "transparentModal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
