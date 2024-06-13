import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity, Text, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const RevisaoEndereco = ({route}) => {
  const navigation = useNavigation();

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const { total } = route.params;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem('endereco');
        if (savedAddress !== null) {
          const parsedAddress = JSON.parse(savedAddress);
          setCep(parsedAddress.cep);
          setLogradouro(parsedAddress.logradouro);
          setNumero(parsedAddress.numero);
          setComplemento(parsedAddress.complemento);
          setReferencia(parsedAddress.referencia);
          setBairro(parsedAddress.bairro);
          setCidade(parsedAddress.cidade);
          setEstado(parsedAddress.estado);
          setEditMode(true);
        } else {
          // Limpar campos se o endereço não estiver salvo
          setCep('');
          setLogradouro('');
          setNumero('');
          setComplemento('');
          setReferencia('');
          setBairro('');
          setCidade('');
          setEstado('');
        }
      } catch (error) {
        console.error('Erro ao carregar o endereço:', error);
      }
    };

    loadAddress();
  }, []);

  const isAddressComplete = () => {
    return cep.trim() !== '' && logradouro.trim() !== '' && numero.trim() !== '' && bairro.trim() !== '' && cidade.trim() !== '' && estado.trim() !== '';
  };

  const saveAddress = async () => {
    if (isAddressComplete()) {
      const address = {
        cep,
        logradouro,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
      };
      try {
        await AsyncStorage.setItem('endereco', JSON.stringify(address));
      } catch (error) {
        console.error('Erro ao salvar o endereço:', error);
      }
    } else {
      // Se o endereço não estiver completo, remover o item de AsyncStorage
      try {
        await AsyncStorage.removeItem('endereco');
      } catch (error) {
        console.error('Erro ao remover o endereço:', error);
      }
    }
  };

  const handleGoBack = () => {
    saveAddress(); // Salvar o endereço antes de voltar
    navigation.goBack();
  };

  const handleAvancar = () => {
    if (!isAddressComplete()) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios para continuar.');
      return; // Campos obrigatórios não preenchidos, não avança
    }
    saveAddress(); // Salvar o endereço antes de avançar
    navigation.navigate('Pagamento', { total: total });
  };

  const handleEditar = () => {
    setEditMode(!editMode);
  };

  return (
    <SafeAreaView style={Estilos.containerLogado}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
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
                <Image
                  style={Estilos.carrinho}
                  source={require('./carrinho.png')}
                />
            </View>
          </ImageBackground>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
          <View>
            {!editMode && (
              <TouchableOpacity onPress={handleEditar}>
                <Text style={{ color: '#FFBD59', fontSize: 20, fontFamily: 'Katibeh' }}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={{ color: 'transparent', fontSize: 20, fontFamily: 'Katibeh' }}>Voltar</Text>

          {editMode && (
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={{ color: '#FFBD59', fontSize: 20, fontFamily: 'Katibeh' }}>Voltar</Text>
            </TouchableOpacity>
          )}

          {!editMode && (
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={{ color: '#FFBD59', fontSize: 20, fontFamily: 'Katibeh' }}>Voltar</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1, justifyContent: 'center', marginBottom: keyboardActive ? 0 : 30 }}>
          <View style={Estilos.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20 }}>Endereço de Entrega</Text>

            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='CEP *'
              value={cep}
              onChangeText={setCep}
              editable={editMode}
            />
            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='Logradouro *'
              value={logradouro}
              onChangeText={setLogradouro}
              editable={editMode}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <TextInput
                style={[Estilos.textInput, Estilos.textInputCurt, editMode ? null : Estilos.disabledTextInput]}
                placeholder='Número *'
                value={numero}
                onChangeText={setNumero}
                editable={editMode}
              />
              <TextInput
                style={[Estilos.textInput, Estilos.textInputCurt, editMode ? null : Estilos.disabledTextInput, { marginLeft: 10 }]}
                placeholder='Complemento'
                value={complemento}
                onChangeText={setComplemento}
                editable={editMode}
              />
            </View>
            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='Referência'
              value={referencia}
              onChangeText={setReferencia}
              editable={editMode}
            />
            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='Bairro *'
              value={bairro}
              onChangeText={setBairro}
              editable={editMode}
            />
            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='Cidade *'
              value={cidade}
              onChangeText={setCidade}
              editable={editMode}
            />
            <TextInput
              style={[Estilos.textInput, editMode ? null : Estilos.disabledTextInput]}
              placeholder='Estado *'
              value={estado}
              onChangeText={setEstado}
              editable={editMode}
            />
          </View>
        </View>

        {!keyboardActive && (
          <View style={{ alignItems: 'center', marginBottom: 3 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Taxa de entrega R$ 5,00 </Text>
          </View>
        )}

          <TouchableOpacity onPress={handleAvancar}>
            <View style={[Estilos.buttonblack, { marginBottom: 15 }]}>
              <Text style={{
                color: '#FFBD59',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>Avançar</Text>
            </View>
          </TouchableOpacity>

      </KeyboardAvoidingView>
      
      {!keyboardActive && (
        <View style={Estilos.bottomBlackBackground}>
          <ImageBackground
            resizeMode="cover"
            imageStyle={{ opacity: 0.3 }}
            source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
          >
            <View style={Estilos.center}>
              <View style={Estilos.imagesSpace}>
                <TouchableOpacity onPress={() => navigation.navigate('Logado')}>
                  <Image style={Estilos.home} source={require('./home.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
                  <Image style={Estilos.ajuste} source={require('./Ajuste.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}

    </SafeAreaView>
  );
};

export default RevisaoEndereco;
