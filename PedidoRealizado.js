import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity, Text, Linking, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const PedidoRealizado = () => {
  const navigation = useNavigation();
  const [numeroPedido, setNumeroPedido] = useState('');
  const [previsaoEntrega, setPrevisaoEntrega] = useState('');
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [cancelamentoEmAndamento, setCancelamentoEmAndamento] = useState(false);
  const [metodoPagamentoSalvo, setMetodoPagamentoSalvo] = useState('');
  const dataAtual = new Date().toISOString();
  const horaAtualFormatada = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });


  


  useEffect(() => {
  // Recuperar o método de pagamento salvo
  AsyncStorage.getItem('metodoPagamento')
    .then(value => {
      if (value !== null) {
        setMetodoPagamentoSalvo(value);
      }
    })
    .catch(error => {
      console.error('Erro ao recuperar o método de pagamento:', error);
    });
}, []);

  // Simulando a obtenção do número do pedido e a previsão de entrega
  useEffect(() => {
    // Simulação do número do pedido (gerado aleatoriamente)
    const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
    setNumeroPedido(numeroAleatorio.toString());

    // Simulação da previsão de entrega (acrescenta 40 minutos ao horário atual)
    const horaAtual = new Date();
    const horaEntrega = new Date(horaAtual.getTime() + 40 * 60000); // Adiciona 40 minutos em milissegundos
    const horaEntregaFormatada = horaEntrega.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setPrevisaoEntrega(horaEntregaFormatada);

    //Salva os dados do pedido para pedidos anteriores
    const pedido = {
      numeroPedido,
      previsaoEntrega: horaEntregaFormatada,
      data: dataAtual,
      hora: horaAtualFormatada,
      metodoPagamento: metodoPagamentoSalvo
    };
    AsyncStorage.setItem('pedido', JSON.stringify(pedido))
      .then(() => console.log('Detalhes do pedido salvos com sucesso no AsyncStorage'))
      .catch(error => console.error('Erro ao salvar os detalhes do pedido:', error));
  }, []);

  

  const handleCancelarPedido = () => {
    setMostrarConfirmacao(true);
  };

  const confirmarCancelamento = () => {
    setMostrarConfirmacao(false);
    setCancelamentoEmAndamento(true);
    // Aqui você pode adicionar a lógica para cancelar o pedido
    setTimeout(() => {
      setCancelamentoEmAndamento(false);
      Alert.alert('Cancelamento Concluído', 'O cancelamento foi concluído com sucesso.', [
        { text: 'OK', onPress: () => navigation.replace('Logado') }
      ]);
    }, 2000); // Simulação de carregamento de 2 segundos
  };

  const cancelarCancelamento = () => {
    setMostrarConfirmacao(false);
  };

  const handleLigarLoja = () => {
    // Aqui você pode adicionar a lógica para ligar para a loja
    Linking.openURL('tel:+seu_numero_de_telefone_da_loja');
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

      {!mostrarConfirmacao && !cancelamentoEmAndamento && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pedido Realizado</Text>
          <Text style={{ marginTop: 20 }}>Número do Pedido: {numeroPedido}</Text>
          <Text>Status do Pedido: Em preparo</Text>
          <Text>Método de Pagamento: {metodoPagamentoSalvo}</Text>
          <Text>Previsão de Entrega: {previsaoEntrega}</Text>
        </View>
      )}

      {!mostrarConfirmacao && !cancelamentoEmAndamento && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#00000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Precisa de ajuda?</Text>
          <TouchableOpacity onPress={handleLigarLoja} style={{ marginTop: 10 }}>
            <View>
              <Text style={{ color: '#FFBD59', fontSize: 18, fontFamily: 'Katibeh', textAlign: 'center'  }}>Ligue para a loja</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleCancelarPedido}>
            <View style={Estilos.buttonblack}>
              <Text style={{ color: '#FFBD59', fontSize: 18, fontWeight: 'bold', textAlign: 'center', }}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {mostrarConfirmacao && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Deseja continuar com o cancelamento?</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={confirmarCancelamento} style={{ marginRight: 20 }}>
              <View style={Estilos.buttonblack}>
                <Text style={{ color: '#FFBD59', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Sim</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelarCancelamento}>
              <View style={Estilos.buttonblack}>
                <Text style={{ color: '#FFBD59', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Não</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {cancelamentoEmAndamento && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="#FFBD59" />
          <Text style={{ marginTop: 10 }}>Cancelando pedido...</Text>
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

export default PedidoRealizado;
