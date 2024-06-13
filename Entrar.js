import React from 'react';
import { SafeAreaView, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Estilos from './Styles'; 

const Stack = createStackNavigator();

const Entrar = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={Estilos.container}>
      <ImageBackground
        resizeMode="cover"
        style={Estilos.backgroundblack}
        imageStyle={{ opacity: 0.3 }}
        source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
      >
        <Image style={Estilos.logo} source={require('./logooriginal.png')} />
        <Text style={Estilos.text}>O que deseja fazer?</Text>
        <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('Login')}>
          <Text style={Estilos.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={Estilos.textButton}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('CardapioDeslogado')}>
          <Text style={Estilos.textButton}>Voltar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}


export default Entrar;
