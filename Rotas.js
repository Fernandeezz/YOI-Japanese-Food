import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Carregamento from './Carregamento';
import TelaInicial from './TelaInicial';
import Entrar from './Entrar';
import Login from './Login';
import Cadastro from './Cadastro';
import RecuperarSenha from './RecuperarSenha';
import Logado from './Logado';
import Configurar from './Configurar';
import Carrinho from './Carrinho';
import DadosPessoais from './DadosPessoais';
import EnderecoEntrega from './EnderecoEntrega';
import PedidosAnteriores from './PedidosAnteriores';
import AlterarSenha from './AlterarSenha';
import Ajuda from './Ajuda';
import RevisaoEndereco from './RevisaoEndereco';
import Pagamento from './Pagamento';
import PedidoRealizado from './PedidoRealizado';
import CardapioDeslogado from './CardapioDeslogado';

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tela" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Carregamento" component={Carregamento} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CardapioDeslogado" component={CardapioDeslogado} />
        <Stack.Screen name="Entrar" component={Entrar} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen name="Logado" component={Logado} />
        <Stack.Screen name="Configurar" component={Configurar} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
        <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
        <Stack.Screen name="EnderecoEntrega" component={EnderecoEntrega} />
        <Stack.Screen name="PedidosAnteriores" component={PedidosAnteriores} />
        <Stack.Screen name="AlterarSenha" component={AlterarSenha} />
        <Stack.Screen name="Ajuda" component={Ajuda} />
        <Stack.Screen name="RevisaoEndereco" component={RevisaoEndereco} />
        <Stack.Screen name="Pagamento" component={Pagamento} />
        <Stack.Screen name="PedidoRealizado" component={PedidoRealizado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;