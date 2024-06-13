import React, { useState } from 'react';
import { SafeAreaView, View, ImageBackground, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { validaLogin } from './ValidaLogin'; 
import Estilos from './Styles'; 

const Stack = createStackNavigator();

const MENSAGEM_EMAIL = "Digite o seu e-mail.";
const MENSAGEM_SENHA = "Digite a sua senha.";
const EMAIL = "";
const SENHA = "";

const Login = ({ navigation }) => {
  
    const [usuario, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [status, setStatus] = useState('');
    const [activity, setActivity] = useState(false);

    return (
        <SafeAreaView style={Estilos.container}>
            <ImageBackground
                resizeMode="cover"
                style={Estilos.backgroundblack}
                imageStyle={{ opacity: 0.3 }}
                source={{ uri: 'https://www.colorbook.io/imagecreator.php?hex=000000&width=800&height=600' }}
            >
                <Image style={Estilos.logo} source={require('./logooriginal.png')} />

                <Text style={Estilos.textWhite}>E-mail:</Text>
                <TextInput
                    autoCorrect={false}
                    placeholder={MENSAGEM_EMAIL}
                    placeholderTextColor="grey"
                    style={Estilos.textInput}
                    clearButtonMode="always"
                    defaultValue={EMAIL}
                    onChangeText={(value) => setUser(value)}
                />
                <Text style={Estilos.textWhite}>Senha:</Text>
                <TextInput
                    autoCorrect={false}
                    placeholder={MENSAGEM_SENHA}
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    style={Estilos.textInput}
                    clearButtonMode="always"
                    defaultValue={SENHA}
                    onChangeText={(value) => setSenha(value)}
                />
                <View style={Estilos.rowContainer}>
                    <TouchableOpacity 
                        style={Estilos.button} 
                        onPress={() => validaLogin(usuario, senha, setStatus, setActivity, navigation)}
                    >
                        <Text style={Estilos.textButton}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('Entrar')}>
                        <Text style={Estilos.textButton}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={Estilos.linksenha} onPress={() => navigation.navigate('RecuperarSenha')}>
                    <Text style={Estilos.textLinkAmbar}>Esqueci Minha Senha?</Text>
                </TouchableOpacity>

                <ActivityIndicator size="large" animating={activity} />

                <Text style={Estilos.textWhite}>{status}</Text>

            </ImageBackground>
        </SafeAreaView>
    )
};

export default Login;
