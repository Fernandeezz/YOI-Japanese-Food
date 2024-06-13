import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from './Styles';

const EnderecoEntrega = () => {
  const navigation = useNavigation();

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);

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
        }
      } catch (error) {
        console.error('Erro ao carregar o endereço:', error);
      }
    };

    loadAddress();
  }, []);

  const handleSalvar = async () => {
    setSubmitted(true);
    if (cep.trim() === '' || logradouro.trim() === '' || numero.trim() === '' || bairro.trim() === '' || cidade.trim() === '' || estado.trim() === '') {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const endereco = {
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
      await AsyncStorage.setItem('endereco', JSON.stringify(endereco));
      Alert.alert('Sucesso', 'Endereço salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1, justifyContent: 'space-between', }}>
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
        <Text style={Estilos.textOptionNavegationWhite}>Endereço de Entrega</Text>

        <TextInput
          style={[Estilos.textInput, submitted && cep.trim() === '' ? Estilos.errorBorder : null]}
          placeholder='CEP *'
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={[Estilos.textInput, submitted && logradouro.trim() === '' ? Estilos.errorBorder : null]}
          placeholder='Logradouro *'
          value={logradouro}
          onChangeText={setLogradouro}
        />
        <View style={Estilos.conteinerCenterInput}>
          <TextInput
            style={[Estilos.textInputCurt, submitted && numero.trim() === '' ? Estilos.errorBorder : null]}
            placeholder='Número *'
            value={numero}
            onChangeText={setNumero}
          />
          <TextInput
            style={Estilos.textInputCurt}
            placeholder='Complemento'
            value={complemento}
            onChangeText={setComplemento}
          />
        </View>
        <TextInput
          style={Estilos.textInput}
          placeholder='Referência'
          value={referencia}
          onChangeText={setReferencia}
        />
        <TextInput
          style={[Estilos.textInput, submitted && bairro.trim() === '' ? Estilos.errorBorder : null]}
          placeholder='Bairro *'
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={[Estilos.textInput, submitted && cidade.trim() === '' ? Estilos.errorBorder : null]}
          placeholder='Cidade *'
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={[Estilos.textInput, submitted && estado.trim() === '' ? Estilos.errorBorder : null]}
          placeholder='Estado *'
          value={estado}
          onChangeText={setEstado}
        />
      </View>

      {errorMessage ? (
        <View style={Estilos.errorContainer}>
          <Text style={Estilos.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <View style={Estilos.line} />

      <View style={Estilos.rowContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Configurar')}>
          <Text style={Estilos.textOptionNavegationWhite}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSalvar}>
          <Text style={Estilos.textOptionNavegationWhite}>Salvar</Text>
        </TouchableOpacity>
      </View>

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

export default EnderecoEntrega;
