import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, ImageBackground, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Estilos from './Styles';

const MENSAGEM_EMAIL = "Digite o seu e-mail";

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const enviarLink = () => {
    if (email.trim() === '') {
      Alert.alert("Erro", "Por favor, digite o seu e-mail.");
      return;
    }

    Alert.alert(
      "Recuperação de Senha",
      "Um link para criar uma nova senha foi enviado para o seu e-mail.",
      [{ text: "OK", onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <SafeAreaView style={Estilos.container}>
      <ImageBackground
        resizeMode="cover"
        style={Estilos.backgroundblack}
        imageStyle={{ opacity: 0.3 }}
        source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
      >
        <Image style={Estilos.logo} source={require('./logooriginal.png')} />
        <Text style={Estilos.textWhite}>Você receberá um link para criar uma nova senha</Text>
        <TextInput
          style={Estilos.textInput}
          placeholder={MENSAGEM_EMAIL}
          value={email}
          onChangeText={setEmail}
        />
        <View style={Estilos.rowContainer}>
          <TouchableOpacity style={Estilos.button} onPress={enviarLink}>
            <Text style={{ color: 'white' }}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RecuperarSenha;
