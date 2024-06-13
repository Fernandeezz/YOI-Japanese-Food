import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import Estilos from './Styles';
import ModalMenu from './ModalMenu';
import TiposPratos from './Arrays'; 
const Stack = createStackNavigator();


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


const Logado = () => {
  const navigation = useNavigation();
  const [storedCep, setStoredCep] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
   const [carrinho, setCarrinho] = useState([]);
   

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

    const fetchStoredCarrinho = async () => {
      try {
        const storedCarrinho = await AsyncStorage.getItem('carrinho');
        if (storedCarrinho) {
          setCarrinho(JSON.parse(storedCarrinho));
        }
      } catch (error) {
        console.error('Erro ao recuperar o carrinho:', error);
      }
    };

    fetchStoredCep();
    fetchStoredCarrinho(); // Recuperar o carrinho do AsyncStorage ao montar o componente
  }, []);

  const [quantidade, setQuantidade] = useState(1); 

  const aumentarQuantidade = () => { /*to roubando junto com a quantidade da tela do modal, precisa ficar nessa pra funcionar*/
    if (quantidade < 100) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => { /*idem*/
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };



  const adicionarAoCarrinho = (item, quantidade) => { //esse carrinho ai em cima, to usando pra guardar os itens
     
    const itemNoCarrinho = carrinho.find(c => c.item.name === item.name); /*pra ver se o item ja tem no carrinho*/

    if (itemNoCarrinho) { 
      //Se o item já estiver no carrinho, atualize apenas a quantidade
      const novoCarrinho = carrinho.map(c => {
        if (c.item.name === item.name) {
          return { item: c.item, quantidade: c.quantidade + quantidade };
        }
        return c;
      });
      setCarrinho(novoCarrinho);
    } else {
      //Se o item ainda não estiver no carrinho, adiciona
      setCarrinho([...carrinho, { item, quantidade }]);
    }
    fecharModal();
  };

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

  const [activeBanner, setActiveBanner] = useState(0);
  const [activity, setActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fecharModal = () => {
    setActivity(false);
    setModalVisible(false);
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

   const iniciaModal = (produto) => {
    setProdutoSelecionado(produto);
    setActivity(true);
    setModalVisible(true);
    setQuantidade(1); 
  };

  const irParaTelaDoCarrinho = () => { /*precisei colocar o navigation dentro de uma função pra funcionar*/
    navigation.navigate('Carrinho', {carrinho}); //Passando os dados do carrinho como parâmetro
  };

  function renderSlides({ item, index }) {
    return (
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <FlatList
          data={item.pratos}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => iniciaModal(item)}>
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

          
<TouchableOpacity onPress={() => irParaTelaDoCarrinho()}>
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

      <ModalMenu  /*adicionei as funções*/
        visible={modalVisible}
        onClose={fecharModal}
        produtoSelecionado={produtoSelecionado}
        quantidade={quantidade}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
        adicionarAoCarrinho={adicionarAoCarrinho}
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
              <TouchableOpacity onPress={() => navigation.navigate('Logado')}>
                <Image style={Estilos.home} source={require('./home.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Configurar')}>
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

export default Logado;