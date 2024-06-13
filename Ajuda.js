import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação do AsyncStorage

import Estilos from './Styles';

const Stack = createStackNavigator();

const Ajuda = () => {
  const navigation = useNavigation();
  const [nomeAjuda, setNomeAjuda] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [descricao, setDescricao] = useState('');

  const camposPreenchidos = () => {
    return nomeAjuda.trim() !== '' && telefone.trim() !== '' && email.trim() !== '' && descricao.trim() !== '';
  };

  const EnviarSolicitacao = async () => {
    try {
      if (camposPreenchidos()) {
        await AsyncStorage.setItem('nomeAjuda', nomeAjuda);
        await AsyncStorage.setItem('telefone', telefone);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('descricao', descricao);
        Alert.alert("Sucesso", "Dados enviados com sucesso! Você receberá um retorno por e-mail.");
        
        navigation.navigate('Configurar', { 
          nomeAjuda: nomeAjuda,
          telefone: telefone,
          email: email,
          descricao: descricao,
        });
      } else {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

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

      <TextInput style={Estilos.textInputCenter} placeholder='nomeAjuda' value={nomeAjuda} onChangeText={setNomeAjuda} />
      <TextInput style={Estilos.textInputCenter} placeholder='Telefone' value={telefone} onChangeText={setTelefone} />
      <TextInput style={Estilos.textInputCenter} placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput style={Estilos.textInputLarger} placeholder='Descrição da solicitação' multiline={true} textAlignVertical='top' value={descricao} onChangeText={setDescricao} />
      
      <View style={Estilos.line} />

      <View style={Estilos.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
          <Text style={Estilos.textOptionNavegationWhite}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={EnviarSolicitacao}>
          <Text style={Estilos.textOptionNavegationWhite}>Salvar</Text>
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

export default Ajuda;
