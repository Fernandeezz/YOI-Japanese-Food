import React, { useState } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity, Text, Linking, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const Pagamento = ({ route }) => {
  const navigation = useNavigation();
  const [formaPagamento, setFormaPagamento] = useState('Dinheiro');
  const [mostrarFinal, setMostrarFinal] = useState(false);
  const [finalEmAndamento, setFinalEmAndamento] = useState(false);
  const {total} = route.params;

  const totalMais5 = total + 5;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFinalizarPedido = () => {
  // Salvar o método de pagamento escolhido
  AsyncStorage.setItem('metodoPagamento', formaPagamento)
    .then(() => {
      setMostrarFinal(true);
    })
    .catch(error => {
      console.error('Erro ao salvar o método de pagamento:', error);
    });
};

  const confirmarFinal = () => {
    setMostrarFinal(false);
    setFinalEmAndamento(true);
    // Aqui você pode adicionar a lógica para finalizar o pedido
    setTimeout(() => {
      setFinalEmAndamento(false);
      Alert.alert('Pedido Concluído', 'O seu pedido foi concluído com sucesso.', [
        { text: 'OK', onPress: () => navigation.replace('PedidoRealizado') }
      ]);
    }, 2000); // Simulação de carregamento de 2 segundos
  };

  const cancelarFinal = () => {
    setMostrarFinal(false);
  };

  return (
    <SafeAreaView style={Estilos.containerLogado}>
      <View style={Estilos.topBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{
            uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
          }}>
          <View style={Estilos.imagesSpace}>
            <Image
              style={Estilos.logoSmall}
              source={require('./logosimples.png')}
            />
              <Image
                style={Estilos.carrinho}
                source={require('./carrinho.png')}
              />
          </View>
        </ImageBackground>
      </View>

      {!mostrarFinal && !finalEmAndamento && (
      <View style={Estilos.conteinerRight}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={{ color: '#FFBD59', fontSize: 20, fontFamily: 'Katibeh', marginBottom: 5 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
      )}

      {!mostrarFinal && !finalEmAndamento && (
      <View style={{ alignItems: 'center'}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Informações sobre a Entrega:</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Taxa de Entrega:</Text><Text> R$ 5,00</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tempo de Espera:</Text><Text> 30-40 minutos</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 20 }}>Pagamento na entrega:</Text>

          {/* Botões de rádio para seleção de forma de pagamento */}
          <TouchableOpacity
            onPress={() => setFormaPagamento('Dinheiro')}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                backgroundColor: formaPagamento === 'Dinheiro' ? '#000' : '#FFF',
              }}
            />
            <Text style={{ fontSize: 16 }}>Dinheiro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFormaPagamento('Crédito')}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                backgroundColor: formaPagamento === 'Crédito' ? '#000' : '#FFF',
              }}
            />
            <Text style={{ fontSize: 16 }}>Cartão de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFormaPagamento('Débito')}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                backgroundColor: formaPagamento === 'Débito' ? '#000' : '#FFF',
              }}
            />
            <Text style={{ fontSize: 16 }}>Cartão de Débito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFormaPagamento('Pix')}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                backgroundColor: formaPagamento === 'Pix' ? '#000' : '#FFF',
              }}
            />
            <Text style={{ fontSize: 16 }}>PIX</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}

      {!mostrarFinal && !finalEmAndamento && (
      <View>
      <View style={{ alignItems: 'center'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Total: R${totalMais5}</Text>
      </View>      
        <TouchableOpacity onPress={handleFinalizarPedido}>
          <View style={Estilos.buttonblack}>
            <Text style={{
              color: '#FFBD59',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Finalizar</Text>
          </View>
        </TouchableOpacity>
      </View>
      )}

      {mostrarFinal && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Deseja finalizar o pedido?</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={confirmarFinal} style={{ marginRight: 20 }}>
              <View style={Estilos.buttonblack}>
                <Text style={{ color: '#FFBD59', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Sim</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelarFinal}>
              <View style={Estilos.buttonblack}>
                <Text style={{ color: '#FFBD59', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Não</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {finalEmAndamento && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="#FFBD59" />
          <Text style={{ marginTop: 10 }}>Finalizando o pedido...</Text>
        </View>
      )}

      <View style={Estilos.bottomBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{
            uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
          }}>
          <View style={Estilos.center}>
            <View style={Estilos.imagesSpace}>
              <TouchableOpacity onPress={() => navigation.navigate('Logado')}>
                <Image style={Estilos.home} source={require('./home.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
                <Image style={Estilos.ajuste} source={require('./Ajuste.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Pagamento;










