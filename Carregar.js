import React from 'react';
import { SafeAreaView, ImageBackground, Image, ActivityIndicator } from 'react-native';
import Estilos from './Styles';

const Carregar = () => {
  return (
    <SafeAreaView style={Estilos.container}>
      <ImageBackground
        resizeMode="cover"
        style={Estilos.backgroundblack}
        source={{
          uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
        }}>
        <Image style={Estilos.logo} source={require('./logooriginal.png')} />
        <ActivityIndicator size="large" color="#FFBD59" />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Carregar;
