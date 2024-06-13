import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Carregar from './Carregar';
import TelaInicial from './TelaInicial';

const Stack = createStackNavigator();

const Carregamento = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando um carregamento assíncrono, substitua isso com suas próprias lógicas de carregamento
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tempo de espera de 3 segundos
  }, []);

  return (
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen
          name="Loading"
          component={Carregar}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Carregamento;
