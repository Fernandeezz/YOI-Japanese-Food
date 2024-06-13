import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const DadosPessoais = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCPFChange = (text) => {
    const formattedCPF = text.replace(/[^0-9]/g, '');
    setCPF(formattedCPF);
  };

  const salvarDados = async () => {
    try {
      if (email !== confirmarEmail) {
        Alert.alert('Atenção', 'Os e-mails não coincidem.');
        return;
      }

      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('cpf', cpf);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('telefone', telefone);

      navigation.navigate('Configurar', {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone
      }); 
    } catch (error) {
      console.error('Erro ao salvar dados pessoais:', error);
    }
  };

  useEffect(() => {
    const fetchDadosPessoais = async () => {
      try {
        const nome = await AsyncStorage.getItem('nome');
        const cpf = await AsyncStorage.getItem('cpf');
        const email = await AsyncStorage.getItem('email');
        const telefone = await AsyncStorage.getItem('telefone');

        if (nome) {
          setNome(nome);
        }
        if (cpf) {
          setCPF(cpf);
        }
        if (email) {
          setEmail(email);
        }
        if (telefone) {
          setTelefone(telefone);
        }
      } catch (error) {
        console.error('Erro ao recuperar dados pessoais:', error);
      }
    };

    fetchDadosPessoais();
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

      <View style={Estilos.columnContainer}>
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='Nome'
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='CPF'
          value={cpf}
          onChangeText={handleCPFChange}  // Use the handler that ensures CPF is numeric
        />
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='Confirme o Email'
          value={confirmarEmail}
          onChangeText={setConfirmarEmail}
        />
        <TextInput
          style={Estilos.textInputCenter}
          placeholder='Telefone'
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>

      <View style={Estilos.line} />

      <View style={Estilos.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Configurar')}><Text style={Estilos.textOptionNavegationWhite}> Cancelar</Text></TouchableOpacity>
        <TouchableOpacity onPress={salvarDados}><Text style={Estilos.textOptionNavegationWhite}> Salvar</Text></TouchableOpacity>
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
}

export default DadosPessoais;
