import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const AlterarSenha = () => {
  const navigation = useNavigation();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const salvarNovaSenha = async () => {
    try {
      const senhaSalva = await AsyncStorage.getItem('senha');

      if (senhaSalva !== senhaAtual) {
        Alert.alert('Erro', 'Senha atual incorreta.');
        return;
      }

      if (novaSenha !== confirmarSenha) {
        Alert.alert('Erro', 'As novas senhas não coincidem.');
        return;
      }

      await AsyncStorage.setItem('senha', novaSenha);
      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
      navigation.navigate('Configurar');
    } catch (e) {
      console.error("Erro ao salvar nova senha no AsyncStorage:", e);
      Alert.alert('Erro', 'Ocorreu um erro ao alterar a senha.');
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

      <View style={Estilos.columnContainer}>
        <Text style={Estilos.textOptionNavegationWhite}>Senha Atual:</Text>
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='*********'
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />
        <Text style={Estilos.textOptionNavegationWhite}>Nova Senha:</Text>
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='*********'
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
        <Text style={Estilos.textOptionNavegationWhite}>Digite novamente a Senha:</Text>
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='*********'
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>
      
      <View style={Estilos.line} />

      <View style={Estilos.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
          <Text style={Estilos.textOptionNavegationWhite}> Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={salvarNovaSenha}>
          <Text style={Estilos.textOptionNavegationWhite}> Salvar</Text>
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

export default AlterarSenha;
