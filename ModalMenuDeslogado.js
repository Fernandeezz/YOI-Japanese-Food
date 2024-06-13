import React from 'react';
import { Modal, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Estilos from './Styles';

const ModalMenuDeslogado = ({ visible, onClose, produtoSelecionado, onLoginPress }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={Estilos.centeredView}>
        <View style={Estilos.modalView}>
          <Text style={Estilos.modalText}>Você precisa fazer Login para continuar</Text>
          {produtoSelecionado && (
            <>
              <Image
                style={{ height: 70, width: 70 }}
                source={{ uri: produtoSelecionado.image }}
              />
              <Text>{produtoSelecionado.name}</Text>
            </>
          )}
          
          <View style={Estilos.rowContainer}>
        <TouchableOpacity style={Estilos.button} onPress={onLoginPress}>
          <Text style={Estilos.textButton}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilos.button} onPress={onClose}>
          <Text style={Estilos.textButton}>Fechar</Text>
        </TouchableOpacity>
          </View>

           
        </View>
      </View>
    </Modal>
  );
};

export default ModalMenuDeslogado;
