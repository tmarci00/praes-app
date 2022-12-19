import { View, StyleSheet, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Badge, Button, Flex, HStack, IconButton, Provider, Surface, Text } from '@react-native-material/core';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CustomInput from '../components/CustomInput';
import React, { useCallback, useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import '../global';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'




const MainScreen = ({ route }) => {
  const radioButtonsData = [{

    id: '0,25',
    label: '0,25l',
    value: '0.25',
    size: RADIO_BUTTON_SIZE,
    borderColor: GOLDEN_ORANGE,
    color: 'black'
  },

  {
    id: '0,5',
    label: '0,5l',
    value: '0.5',
    size: RADIO_BUTTON_SIZE,
    borderColor: GOLDEN_ORANGE,
    color: 'black'
  }
  ];
  const initialInventory = [
    {
      text: 'Almalé',
      price: 230,
      ammount: 1,
      inOrder: false,
    },
    {
      text: 'Répalé',
      price: 290,
      ammount: 100,
      inOrder: false,
    },
    {
      text: "Céklalé",
      price: 290,
      ammount: 100,
      inOrder: false,
    },
    {
      text: "Zellerlé",
      price: 430,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Narancslé',
      price: 380,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Grapfruitlé',
      price: 420,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Citromlé',
      price: 500,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Ananászlé',
      price: 500,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Gyömbéres Almalé',
      price: 270,
      ammount: 100,
      inOrder: false,
    },
    {
      text: 'Uborkalé',
      price: 430,
      ammount: 100,
      inOrder: false,
    }
  ];
  const initialExtraInventory = [
    {
      text: 'Petrezselyem',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Spenót',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Menta',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Kardamom',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Fahély',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Tökmagolaj',
      ammount: 100,
      inOrder: false
    },
    {
      text: 'Gyömbér',
      ammount: 100,
      inOrder: false
    },
  ];

  const [selectedSize, setSelectedSize] = useState(undefined);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [inventory, setInventory] = useState(initialInventory);
  const [extraInventory, setExtraInventory] = useState(initialExtraInventory);
  const [orderedJuices, setOrderedJuices] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [wantGlass, setWantGlass] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const navigation = useNavigation();
  const [updateDone, setUpdateDone] = useState(false);

  useEffect(() => {
    reset({
      name: '',
      email: '',
    });
  }, [shoppingCart])

  useEffect(() => {
    updatePrice();
  }, [orderedJuices, selectedSize, wantGlass, extraInventory]);

  useEffect(() => {
    updateOrder();
  }, [price]);

  //get updated shoppingcart
  const updateShoppingCart = useCallback(() => {
    const updatedShoppingCart = route.params.shoppingCart;
    setShoppingCart(updatedShoppingCart);
  }, [route.params.shoppingCart])

  useEffect(() => {
    if (route.params?.shoppingCart) {
      updateShoppingCart();
    }
  }, [route.params?.shoppingCart]);

  //handles putting bottle size into selected state
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    let selectedButton = {};
    radioButtons.forEach(button => {
      if (button.selected) {
        selectedButton = { ...button };
      };
    })
    setSelectedSize(parseFloat(selectedButton.value));
  };

  //puts selected juices into orderedJuices state
  function updateOrderedJuices() {
    const inOrderJuices = inventory.filter((juice => juice.inOrder));
    setOrderedJuices(inOrderJuices);
  };

  //handles toggling inOrder property of juices and extras and calls updateOrder()
  function toggleInOrder(value, item, type) {

    //juices
    if (type === 'basic') {
      const updatedInv = [...inventory];
      const juice = updatedInv.find(juice => juice.text === item.text);
      juice.inOrder = value;
      setInventory(updatedInv);
      updateOrderedJuices();

      //adjust ammount in inventory
      //  !!! SHOULD BE MOVED TO CLICKING ORDER FINALIZE BUTTON!!!
      //  If we have 3 kinds of juices we only need 1/3 unit of each
      // I dont think it should be done here,  playing with the order i.e. taking things in and out makes the calculation needlessly complicated
      {/*if (juice.inOrder) {
        juice.ammount -=  1 / (order.length > 0 ? order.length : 1);
      }
      else {
        juice.ammount += 1 / (order.length > 0 ? order.length : 1);
      }*/}


    }
    //extras
    else {
      const updatedExtraInv = [...extraInventory];
      const extra = updatedExtraInv.find(extra => extra.text === item.text);
      extra.inOrder = value;

      setExtraInventory(updatedExtraInv);
    }
  };

  //handles updateing price state
  function updatePrice() {
    const inOrderExtras = extraInventory.filter(extra => extra.inOrder);

    if ((inOrderExtras.length < 1 && orderedJuices.length < 1) || selectedSize === undefined) {
      setPrice(0);
    }

    else {
      let result = 0;

      //calculate price of selected juices
      const quotient = (selectedSize * 10) / orderedJuices.length;
      orderedJuices.forEach((juice) => {
        result += quotient * juice.price;
      })

      //calculate price of selected extras
      if (orderedJuices.length >= 1) {
        if (selectedSize === 0.25) {
          result += inOrderExtras.length * EXTRA_PRICE;
          if (wantGlass) {
            result += 200;
          }
        }
        else {
          result += inOrderExtras.length * EXTRA_PRICE * 2;
          if (wantGlass) {
            result += 250;
          }
        }
      }

      setPrice(Math.round(result));
    }
  };

  //toggles wantGlass state
  function toggleWantGlass(value) {
    setWantGlass(value);
  };


  function updateOrder() {
    const inOrderJuices = inventory.filter((juice => juice.inOrder)).map(juice => juice.text);
    const inOrderExtras = extraInventory.filter((extra => extra.inOrder)).map(juice => juice.text);
    setCurrentOrder([[...inOrderJuices, ...inOrderExtras, [getValues().name, getValues().email], [wantGlass, selectedSize, price]]]);
  };

  function onSubmitPressed(data) {
    setShoppingCart((currentCart => [...currentCart, ...currentOrder]));
    setCurrentOrder([]);
    //reset buttons, later should be api call not just reset to initial state
    setInventory(initialInventory);
    setExtraInventory(initialExtraInventory);
    setOrderedJuices([]);
    setWantGlass(false);
  };

  useEffect(() => {
    updateOrder();
  }, [getValues().name, getValues().email])

  return (
    <Provider>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.scroll}>
          <View style={styles.controlContainer}>
            <Surface style={styles.formContainer} elevation={6}>

              <View style={styles.inputContainer} >
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Vásárló adatai:</Text>
                </View>
                <CustomInput
                  name='name'
                  placeholder={'Teljes Nev'}
                  control={control}
                  rules={{ required: 'A név megadása kötelező' }}
                />
                <CustomInput
                  name='email'
                  placeholder={'E-Mail'}
                  control={control}
                  rules={{ required: 'Az e-mail cim megadása kötelező' }}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Üveget szeretne?</Text>
                <Switch
                  value={wantGlass}
                  onValueChange={toggleWantGlass}
                  trackColor={{ false: GREY, true: GOLDEN_ORANGE }}
                  ios_backgroundColor={GREY}
                  thumbColor={'white'} />
              </View>
              <View style={styles.sizeContainer}>
                <View >
                  <Text style={styles.title}>Méret:</Text>
                </View>
                <View style={styles.radioButtonsContainer}>
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                    layout='row' />
                </View>
              </View>
            </Surface>
            <Surface style={styles.allListContainer} elevation={6}>
              <View style={styles.itemListContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Alapízek</Text>
                </View>
                <ItemList inventory={inventory} onValueChange={toggleInOrder} type='basic' />
              </View>
              <View style={styles.itemListContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Extrák</Text>
                </View>
                <ItemList inventory={extraInventory} onValueChange={toggleInOrder} type='extra' />
              </View>
            </Surface>

          </View>
        </ScrollView>

        <Flex ph={3} w={'100%'} h={'6%'} direction={'row'} justify='between'  style={styles.footer}>
          <Flex direction='row' items='center' content='center'>
            <Button title={'Kosárba'} color={GOLDEN_ORANGE} onPress={handleSubmit(onSubmitPressed)} tintColor={'white'} titleStyle={{color: 'black'}}/>

              <IconButton icon={props => <Icon name='cart' {...props} />} color={GOLDEN_ORANGE} onPress={() => { navigation.navigate('Shopping Cart', { shoppingCart }) }} />
          </Flex>
          <Flex items='center' justify='center' mr={12}>
            <Text>Fizetendő: {price} ft</Text>
          </Flex>
        </Flex>
      </SafeAreaView>
    </Provider>
  )
};

const styles = StyleSheet.create({

  mainContainer: {
    width: '100%',
    height: '100%',
    padding: 32,
    backgroundColor: 'white',

  },

  itemListContainer: {
    //borderColor: 'blue',
    //borderWidth: 2,
    margin: 8
  },

  sizeContainer: {
    marginVertical: 12,
    //borderColor: 'green',
    //borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: GOLDEN_ORANGE,
    borderBottomWidth: 2,
  },

  footer: {
    
  },

  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GOLDEN_ORANGE,
  },

  controlContainer: {
    //borderColor: 'red',
    //borderWidth: 2,
    flex: 1,
    padding: 6,
  },

  allListContainer: {
    padding: 6,

    margin: 6,
    borderColor: 'black',
    borderWidth: 2.2,
    borderRadius: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',

  },
  titleContainer: {
    borderBottomColor: GOLDEN_ORANGE,
    borderBottomWidth: 2,
    marginBottom: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  glassContainer: {
    flexDirection: 'row',
    //borderColor: 'brown',
    //borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 16,
  },
  glassText: {
    fontSize: 24,
    fontWeight: 'bold',

  },

  formContainer: {
    borderColor: 'black',
    borderWidth: 2.2,
    borderRadius: 24,
    padding: 20,
    margin: 6,
    marginVertical: 24,
  },
  inputContainer: {

    marginVertical: 12
  }
});

export default MainScreen