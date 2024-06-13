import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';
import ModalMenuDeslogado from './ModalMenuDeslogado';
import AppIntroSlider from 'react-native-app-intro-slider';
import TiposPratos from './Arrays'; 

const DATA = [
  {
    opcao: 'Entrada',
  },
  {
    opcao: 'Principal',
  },
  {
    opcao: 'Sobremesa',
  },
  {
    opcao: 'Bebida',
  },
];

const CardapioDeslogado = () => {
  const navigation = useNavigation();
  const [storedCep, setStoredCep] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activity, setActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchStoredCep = async () => {
      try {
        const cep = await AsyncStorage.getItem('cep');
        if (cep) {
          setStoredCep(cep);
        }
      } catch (error) {
        console.error('Erro ao recuperar o CEP:', error);
      }
    };

    fetchStoredCep();
  }, []);

  const fecharModal = () => {
    setActivity(false);
    setModalVisible(false);
  };

  const handleItemPress = (produto) => {
    setProdutoSelecionado(produto);
    setActivity(true);
    setModalVisible(true);
  };

 
const handleLoginPress = () => {
    navigation.navigate('Entrar');
    fecharModal();
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0] !== undefined) {
      setActiveBanner(viewableItems[0]?.index);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  const IrParaLogin = () => {
        alert("Você precisa realizar login para continuar");
        navigation.navigate('Entrar');
    
    
    }
  function renderSlides({ item, index }) {
    return (
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <FlatList
          data={item.pratos}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handleItemPress(item)}>
              <View flexDirection="row" style={{ marginTop: 25 }}>
                <Image
                  style={{ marginLeft: 20, height: 97, width: 97 }}
                  source={{ uri: item.image }}
                />
                <View flexDirection="column">
                  <Text
                    style={{
                      marginTop: 8,
                      marginLeft: 5,
                      fontSize: 25,
                      color: 'Black',
                      fontStyle: 'bold',
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{ marginTop: 8, marginLeft: 5, fontSize: 16 }}>
                    {item.desc}
                  </Text>
                  <Text style={{ marginTop: 8, marginLeft: 5, fontSize: 23 }}>
                    R${item.valor}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
  
  
  return (
    <SafeAreaView style={Estilos.containerLogado}>
      <View style={Estilos.topBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{
            uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
          }}>
          <View style={Estilos.imagesSpace}>
            <Image
              style={Estilos.logoSmall}
              source={require('./logosimples.png')}
            />
          
            <TouchableOpacity onPress={IrParaLogin}>
              <Image 
                style={Estilos.carrinho}
                source={require('./carrinho.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {storedCep ? (
          <Text style={{ color: 'black', textAlign: 'center' }}>
            Entregar em: {storedCep}
          </Text>
        ) : null}
      </View>

      <View height="500" width="100%" backgroundColor="white">
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <View>
              <Text
                style={{
                  color: activeBanner === index ? '#FFBD59' : 'black',
                  fontSize: 17,
                  margin: 7,
                  marginTop: 10,
                }}>
                {item.opcao}
              </Text>
            </View>
          )}
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          scrollEnabled={false}
          horizontal
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      <ModalMenuDeslogado
        visible={modalVisible}
        onClose={fecharModal}
        onLoginPress={handleLoginPress}
      />

      

      <AppIntroSlider
        renderItem={renderSlides}
        data={TiposPratos}
        renderDoneButton={() => { }}
        renderPrevButton={() => { }}
        renderNextButton={() => { }}
        dotStyle={{ color: 'white' }}
        activeDotStyle={{ color: 'white' }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />

      <View style={Estilos.bottomBlackBackground}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}
          source={{
            uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600',
          }}>
          <View style={Estilos.center}>
            <View style={Estilos.imagesSpace}>
              <TouchableOpacity onPress={IrParaLogin}>
                <Image style={Estilos.home} source={require('./home.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={IrParaLogin}>
                <Image
                  style={Estilos.ajuste}
                  source={require('./Ajuste.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default CardapioDeslogado;
