import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Estilos from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Configurar = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');



  useEffect(() => {
    if (nome.trim().length === 0) {
      const fetchDadosPessoais = async () => {
        try {
          const nome = await AsyncStorage.getItem('nome');
          if (nome) {
            setNome(nome);
          }
        } catch (error) {
          console.error('Erro ao recuperar dados pessoais:', error);
        }
      };

      fetchDadosPessoais();
    }
  });
 

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

      <View style={Estilos.textUser}>
        {/*<Image style={Estilos.rodalogo} source={require('./rodalogo.png')} */}
        <TextInput
          style={Estilos.textUser}
          placeholder='Nome'
          value={nome}
          onChangeText={setNome}
        />
      </View>


      <TouchableOpacity onPress={() => navigation.navigate('DadosPessoais')}><Text style={Estilos.textOption}> Dados Pessoais</Text></TouchableOpacity>
      <View style={Estilos.line} />
      <TouchableOpacity onPress={() => navigation.navigate('AlterarSenha')}><Text style={Estilos.textOption}> Alterar Senha</Text></TouchableOpacity>
      <View style={Estilos.line} />
      <TouchableOpacity onPress={() => navigation.navigate('EnderecoEntrega')}><Text style={Estilos.textOption}> Endereço de Entrega</Text></TouchableOpacity>
      <View style={Estilos.line} />
      <TouchableOpacity onPress={() => navigation.navigate('PedidosAnteriores')}><Text style={Estilos.textOption}> Pedidos Anteriores</Text></TouchableOpacity>
      <View style={Estilos.line} />
      <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}><Text style={Estilos.textOption}> Ajuda</Text></TouchableOpacity>
      <View style={Estilos.line} />
      <TouchableOpacity onPress={() => navigation.navigate('TelaInicial')}><Text style={Estilos.textOption}> Sair</Text></TouchableOpacity>

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
}

export default Configurar;
