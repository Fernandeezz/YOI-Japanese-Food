import React from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={Estilos.container}>
      <View style={Estilos.topBlackBackground}>
        {/* Conteúdo da parte superior do fundo preto */}
        <ImageBackground
          resizeMode="cover"
          style={Estilos.appImage}
          imageStyle={{ opacity: 0.3 }}
          source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
        >
        
          <View style={Estilos.blackBackground}>
          <View style={Estilos.imagesContainer}>
            <Image style={Estilos.logo} source={require('./logosimples.png')} /><Image style={Estilos.carrinho} source={require('./carrinho.png')} />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={Estilos.bottomBlackBackground}>
        {/* Conteúdo da parte inferior do fundo preto */}
        <ImageBackground
          resizeMode="cover"
          style={Estilos.appImage}
          imageStyle={{ opacity: 0.3 }}
          source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
        >
          <View style={Estilos.blackBackground}>
            <View style={Estilos.imagesContainer}>
              <Image style={Estilos.home} source={require('./home.png')} />
              <Image style={Estilos.ajuste} source={require('./Ajuste.png')} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}
const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  topBlackBackground: {
    height: 100,
    backgroundColor: 'black',
    borderBottomRightRadius: 30
  },
  appImage: {
    flex: 1,
    backgroundColor: 'black',
    borderBottomRightRadius: 30
  },
  bottomBlackBackground: {
    height: 80,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  blackBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    alignItems: 'center', 
  },
  logo: {
    width: 100,
    height: 100
  },
  home: {
    width: 40,
    height: 40,
    marginLeft: 50
  },
  ajuste: {
    width: 40,
    height: 40,
    marginRight: 50
  },
  carrinho: {
    width: 40,
    height: 40,
    marginRight: 1
  }
});

export default App;
