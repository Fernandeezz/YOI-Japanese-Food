import AsyncStorage from '@react-native-async-storage/async-storage';

export const validaLogin = async (email, senha, setStatus, setActivity, navigation) => {
    const MENSAGEM_EMAIL = "Digite o seu e-mail.";
    const MENSAGEM_SENHA = "Digite a sua senha.";

    console.log("Email recebido:", email);
    console.log("Senha recebida:", senha);

    if (email.trim().length === 0) {
        setStatus(MENSAGEM_EMAIL);
        return;
    }

    if (senha.trim().length === 0) {
        setStatus(MENSAGEM_SENHA);
        return;
    }

    setActivity(true);

    let storedEmail;
    let storedSenha;

    try {
        storedEmail = await AsyncStorage.getItem('email');
        storedSenha = await AsyncStorage.getItem('senha');
    } catch (e) {
        console.error("Erro ao buscar dados do AsyncStorage:", e);
        setStatus("Erro ao validar usuário. Tente novamente.");
        setActivity(false);
        return;
    }

    if (email === storedEmail && senha === storedSenha) {
        setStatus("Usuário autenticado com sucesso.");
        alert("Bem Vindo!");
        navigation.navigate('Logado');
    } else {
        setStatus("Usuário ou senha inválidos.");
    }

    setActivity(false);
};