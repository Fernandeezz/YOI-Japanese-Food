
import React, { useState } from 'react';
import { Modal, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Estilos from './Styles';



const ModalMenu = ({ visible, onClose, produtoSelecionado, quantidade, aumentarQuantidade, diminuirQuantidade, adicionarAoCarrinho }) => {
//*adiocnei-as-fuçõe-que-mande-pro-logado

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={Estilos.centeredView}>
        <View style={Estilos.modalView}>
          <Text style={Estilos.modalText}>Dados do produto:</Text>
          {produtoSelecionado && (
            <>
            <View flexDirection="row">
            <Image
                  style={{height:110, width: 120, marginRight: 25}}
                  source={{ uri: produtoSelecionado.image }}
             />
             <View flexDirection="column">
              <Text style={Estilos.modalText}>{produtoSelecionado.name}</Text>
              <Text style={Estilos.modalText}>Quantidade:</Text>
              <View style={Estilos.rowContainer}>
              <TouchableOpacity style={Estilos.buttonModal} onPress={diminuirQuantidade}>
              <Text style={Estilos.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={{fontSize:30}}>    {quantidade}    </Text>
              <TouchableOpacity style={Estilos.buttonModal} onPress={aumentarQuantidade}>
              <Text style={Estilos.textButton}>+</Text>
              </TouchableOpacity>
              </View>
              </View>
              </View>
            </>
          )}
          <View style={Estilos.rowContainer}>
        <TouchableOpacity style={Estilos.button} onPress={onClose}>
          <Text style={Estilos.textButton}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Estilos.button} onPress={() => adicionarAoCarrinho(produtoSelecionado, quantidade)}>
          <Text style={Estilos.textButton}>Adicionar</Text>
        </TouchableOpacity>


          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMenu;
