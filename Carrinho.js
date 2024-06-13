import React, { useState } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const Carrinho = ({ route }) => {
  const navigation = useNavigation();
  const { carrinho } = route.params;
  const [carrinhoItens, setCarrinhoItens] = useState(carrinho);

  // Calcular o total do carrinho usando .reduce()
  const total = carrinhoItens.reduce((acc, itemNoCarrinho) => {
    const valor = parseFloat(itemNoCarrinho.item.valor);
    const quantidade = parseInt(itemNoCarrinho.quantidade, 10);

    // Verificar se valor ou quantidade são NaN
    if (isNaN(valor) || isNaN(quantidade)) {
      console.error('Valor ou quantidade inválidos:', valor, quantidade);
      return acc;
    }

    return acc + valor * quantidade;
  }, 0);



  const avancarParaRevisao = () => {
    if (carrinhoItens.length === 0) {
      Alert.alert(
        'Carrinho Vazio',
        'Ops! Seu carrinho está vazio. Adicione itens para continuar.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Logado'), // Navegar de volta para Logado
          },
        ]
      );
    } else {
      navigation.navigate('RevisaoEndereco', { carrinho: carrinhoItens, total: total });
    }
  };

  const incrementarQuantidade = (index) => {
    const novosItens = [...carrinhoItens];
    novosItens[index].quantidade += 1;
    setCarrinhoItens(novosItens);
  };

  const decrementarQuantidade = (index) => {
    const novosItens = [...carrinhoItens];
    if (novosItens[index].quantidade > 1) {
      novosItens[index].quantidade -= 1;
      setCarrinhoItens(novosItens);
    } else {
      // Se a quantidade é 1, remover o item do carrinho
      novosItens.splice(index, 1);
      setCarrinhoItens(novosItens);
    }
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



      <View style={{alignItems: 'center'}}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Carrinho</Text>
        {carrinhoItens.length === 0 ? (
          <Text style={{ marginTop: 10 }}>Ops! Seu carrinho está vazio.</Text>
        ) : (
          carrinhoItens.map((itemNoCarrinho, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
             <Image
                  style={{ marginRight: 20, height: 97, width: 97 }}
                  source={{ uri: itemNoCarrinho.item.image }}
                />
              <View style={{ flexDirection: 'column'}}>
                <Text style={{ marginRight: 10, marginBottom: 10, fontSize: 25, fontWeight: 'bold' }}>{itemNoCarrinho.item.name}</Text>
                <Text style={{ marginRight: 10, marginBottom: 10, fontSize: 20 }}>Quantidade: {itemNoCarrinho.quantidade}</Text>
                <Text style={{ marginRight: 10, marginBottom: 10, fontSize: 20 }}>Valor: {itemNoCarrinho.item.valor}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => incrementarQuantidade(index)}>
                  <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#FFBD59' }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => decrementarQuantidade(index)} style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#FFBD59' }}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

      <View style={{ marginTop: 60 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Total: R$ {total.toFixed(2)}</Text>
      </View>
      </View>

      <View>
        <TouchableOpacity onPress={avancarParaRevisao}>
          <View style={Estilos.buttonblack}>
            <Text style={{
              color: '#FFBD59',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Avançar</Text>
          </View>
        </TouchableOpacity>
      </View>

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

export default Carrinho;
