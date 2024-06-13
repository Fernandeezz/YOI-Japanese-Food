import React, { useState, useEffect } from 'react';
import { View, TextInput, ImageBackground, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importante adicionar AsyncStorage
import Estilos from './Styles';

const Stack = createStackNavigator();

const PedidosAnteriores = () => {
  const navigation = useNavigation(); 
  const [numeroPedido, setNumeroPedido] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');

  useEffect(() => {
    const fetchPedidosAnteriores = async () => {
      try {
        const pedidoString = await AsyncStorage.getItem('pedido'); // Alterado para 'pedido' conforme salvo em PedidoRealizado
        if (pedidoString) {
          const pedido = JSON.parse(pedidoString);
          setNumeroPedido(pedido.numeroPedido);
          setData(pedido.data);
          setHora(pedido.hora);
          setMetodoPagamento(pedido.metodoPagamento);
        }
      } catch (error) {
        console.error('Erro ao recuperar pedidos anteriores:', error);
      }
    };

    fetchPedidosAnteriores();
  }, []);

 return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1, justifyContent: 'space-between' }}>
      <View style={Estilos.topBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
        >
          <View style={Estilos.imagesSpace}>
            <Image style={Estilos.logoSmall} source={require('./logosimples.png')} />
          </View>
        </ImageBackground>
      </View>

      <TextInput
        style={Estilos.textWhite} // Adicione o estilo para o texto
        placeholder='Número do Pedido'
        value={numeroPedido}
        editable={false} // Torna o TextInput apenas para exibição
      />
      
      <TextInput
        style={Estilos.textWhite} // Adicione o estilo para o texto
        placeholder='Data'
        value={data}
        editable={false} // Torna o TextInput apenas para exibição
      />
      <TextInput
        style={Estilos.textWhite} // Adicione o estilo para o texto
        placeholder='Hora'
        value={hora}
        editable={false} // Torna o TextInput apenas para exibição
      />
      <TextInput
        style={Estilos.textWhite} // Adicione o estilo para o texto
        placeholder='Forma  de Pagamento'
        value={metodoPagamento}
        editable={false} // Torna o TextInput apenas para exibição
      />

      <View style={Estilos.line} />

      <View style={Estilos.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
          <Text style={Estilos.textOptionNavegationWhite}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
          <Text style={Estilos.textOptionNavegationWhite}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      <View style={Estilos.bottomBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
        >
          <View style={Estilos.imagesSpace}>
            <TouchableOpacity onPress={() => navigation.navigate('Logado')}>
              <Image style={Estilos.home} source={require('./home.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
              <Image style={Estilos.ajuste} source={require('./Ajuste.png')} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PedidosAnteriores;
