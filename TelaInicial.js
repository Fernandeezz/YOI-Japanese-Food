import React, { useState } from 'react';
import { SafeAreaView, ImageBackground, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const TelaInicial = () => {
  const [cep, setCep] = useState('');
  const navigation = useNavigation();

  const handleCepChange = (text) => {
    const formattedCep = text.replace(/[^0-9]/g, '');
    setCep(formattedCep);
  };

  const Entrar = async () => {
    if (!cep) {
      Alert.alert('Erro', 'Por favor, digite o CEP.');
      return;
    }

    if (cep.length !== 8) {
      Alert.alert('Erro', 'O CEP deve ter 8 dígitos.');
      return;
    }

    try {
      await AsyncStorage.setItem('cep', cep);
      navigation.navigate('CardapioDeslogado', { cep });
    } catch (error) {
      console.error('Erro ao salvar o CEP:', error);
    }
  };

  return (
    <SafeAreaView style={Estilos.container}>
      <ImageBackground
        resizeMode="cover"
        style={Estilos.backgroundblack}
        source={{
          uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
        }}>

        <Image style={Estilos.logo} source={require('./logooriginal.png')} />

        <TextInput
          style={Estilos.textInput}
          placeholder="Digite seu CEP"
          value={cep}
          onChangeText={handleCepChange}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={Estilos.button}
          onPress={Entrar}>
          <Text style={Estilos.textButton}>Consultar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TelaInicial;
