import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigation = useNavigation();

  const handleCPFChange = (text) => {
    const formattedCPF = text.replace(/[^0-9]/g, '');
    setCPF(formattedCPF);
  };

  const camposPreenchidos = () => {
    return nome.trim() !== '' && cpf.trim() !== '' && email.trim() !== '' && confirmarEmail.trim() !== '' && senha.trim() !== '' && confirmarSenha.trim() !== '' && telefone.trim() !== '';
  };

  const Cadastrar = async () => {
    try {
      if (camposPreenchidos()) {
        if (email !== confirmarEmail) {
          Alert.alert('Atenção', 'Os e-mails não coincidem.');
          return;
        }
        if (senha !== confirmarSenha) {
          Alert.alert('Atenção', 'As senhas não coincidem.');
          return;
        }

        await AsyncStorage.setItem('nome', nome);
        await AsyncStorage.setItem('cpf', cpf);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('senha', senha);
        await AsyncStorage.setItem('telefone', telefone);
        navigation.navigate('Entrar', { 
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senha,
          telefone: telefone
        }); 
      } else {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <SafeAreaView style={Estilos.container}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={Estilos.backgroundblack}
          imageStyle={{ opacity: 0.3 }}
          source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
        >
          <Image style={Estilos.logo} source={require('./logooriginal.png')} />

          <Text style={Estilos.textAmbar}>Nome:</Text>
          <TextInput style={Estilos.textInput} value={nome} onChangeText={setNome}/>
          <Text style={Estilos.textAmbar}>CPF:</Text>
          <TextInput style={Estilos.textInput} value={cpf} onChangeText={handleCPFChange} keyboardType='numeric' />
          <Text style={Estilos.textAmbar}>E-mail:</Text>
          <TextInput style={Estilos.textInput} value={email} onChangeText={setEmail}/>
          <Text style={Estilos.textAmbar}>Digite Novamente o E-mail:</Text>
          <TextInput style={Estilos.textInput} value={confirmarEmail} onChangeText={setConfirmarEmail}/>
          <Text style={Estilos.textAmbar}>Telefone:</Text>
          <TextInput style={Estilos.textInput} value={telefone} onChangeText={setTelefone}/>
          <Text style={Estilos.textAmbar}>Senha:</Text>
          <TextInput style={Estilos.textInput} placeholder='*********' secureTextEntry value={senha} onChangeText={setSenha} />
          <Text style={Estilos.textAmbar}>Digite Novamente a Senha:</Text>
          <TextInput style={Estilos.textInput} placeholder='*********' secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

          <View style={Estilos.rowContainer}>
            <TouchableOpacity style={Estilos.button} onPress={Cadastrar}>
              <Text style={{ color: 'white' }}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('Entrar')}>
              <Text style={{ color: 'white' }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;
