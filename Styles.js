import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogado: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerBlack: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  backgroundblack: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Katibeh',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 5
  },
  logo: {
    width: 450,
    height: 450,
    alignSelf: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    height: 40,
    width: 250,
    marginTop: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Katibeh'
  },
  buttonModal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 5
  },
  textWhite: {
    color: 'white',
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLinkAmbar: {
    color: '#FFBD59',
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textAmbar: {
    fontFamily: 'Katibeh',
    color: '#FFBD59',
    fontSize: 15,
    marginHorizontal: 90,
    fontWeight: 'bold',
    textAlign: 'Left',
    opacity: 0.7
  },
  gmaillogo: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
  },
  containerJustify: {
    flex: 1,
    justifyContent: 'space-between'
  },
  topBlackBackground: {
    height: 80,
    backgroundColor: 'black',
    borderBottomRightRadius: 30
  },
 
  bottomBlackBackground: {
    height: 60,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },  
  imagesSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoSmall: {
    width: 80,
    height: 80,
  },
  home: {
    width: 40,
    height: 40,
    marginLeft: 50,
    marginTop: 10,
    opacity: 0.7
  },
  ajuste: {
    width: 40,
    height: 40,
    marginTop: 5,
    marginRight: 50,
    opacity: 0.7
  },
  carrinho: {
    width: 30,
    height: 30,
    marginRight: 1,
    opacity: 0.7
  },
  overlayImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  line: {
    height: 1,
    backgroundColor: '#FFBD59',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10
  },
  textOption: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Katibeh',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textUser: {
    flexDirection: 'row-reverse',
    fontSize: 25,
    fontFamily: 'Katibeh',
    fontWeight: 'bold',
    color: '#FFBD59',
    marginTop: 25,
  right: 20,
  },
  rodalogo: {
    width: 80,
    height: 80,
    opacity: 0.5
  },
  conteinerCenter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 50,
    width: 300
  },
  textOptionAmbar: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Katibeh',
    textAlign: 'center',
    marginHorizontal: 50
  },
  textOptionNavegationWhite: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Katibeh',
    textAlign: 'center',
    marginHorizontal: 50
  },
  textInputCenter: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    height: 40,
    width: 300,
    marginTop: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  conteinerCenterInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
   textInputCurt: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    height: 40,
    width: 115,
    marginTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInputLarger: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    height: 150,
    width: 300,
    marginTop: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  },
  buttonblack:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 5
  },
  conteinerRight: {
  position: 'absolute',
  top: 80, 
  right: 20, 
},
  errorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default Estilos;