import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import ItemList from '../components/ItemList';
import '../global';




const MainScreen = () => {
  
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
  }];
  const [selectedSize, setSelectedSize] = useState(undefined);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [inventory, setInventory] = useState([
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
      ammount: 0,
      inOrder: false,
    },]
  );
  const [extraInventory, setExtraInventory] = useState([
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
    }
  ]);
  const [order, setOrder] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    updatePrice();

  }, [order, selectedSize, extraInventory]);

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

  //puts selected juices into order state
  function updateOrder() {
    const inOrderJuices = inventory.filter((juice => juice.inOrder));
    setOrder(inOrderJuices);
  };

  //handles toggling inOrder property of juices and extras and calls updateOrder()
  function toggleInOrder(value, item, type) {

    //juices
    if (type === 'basic') {
      const updatedInv = [...inventory];
      const juice = updatedInv.find(juice => juice.text === item.text);
      juice.inOrder = value;
      setInventory(updatedInv);
      updateOrder();
      
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

    if ((inOrderExtras.length < 1 && order.length < 1) || selectedSize === undefined) {
      setPrice(0);
    }

    else {
      let result = 0;

      //calculate price of selected juices
      const quotient = (selectedSize * 10) / order.length;
      order.forEach((juice) => {
        result += quotient * juice.price;
      })

      //calculate price of selected extras
      if (order.length >= 1) {
        if (selectedSize === 0.25) {
          result += inOrderExtras.length * EXTRA_PRICE;
        }
        else {
          result += inOrderExtras.length * EXTRA_PRICE * 2;
        }
      }

      setPrice(Math.round(result));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.controlContainer}>
        <View style={styles.radioContainer}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout='row' />
        </View>
        <View style={styles.allListContainer}>
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
        </View>
      </View>
      <View style={styles.priceConatiner}>
        <Text style={styles.priceText}>Fizetendő: {price} Ft</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  mainContainer: {
    width: '100%',
    height: '100%',
    padding: 16
  },

  itemListContainer: {
    //borderColor: 'blue',
    //borderWidth: 2,
    margin: 3
  },

  radioContainer: {
    marginVertical: 12,
    //borderColor: 'green',
    // borderWidth: 2,
    alignItems: 'flex-end'
  },

  priceConatiner: {
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    //borderColor: 'orange',
    //borderWidth: 2,
    margin: 6,
    padding: 6,
  },

  priceText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  controlContainer: {
    //borderColor: 'red',
    //borderWidth: 2,
    flex: 1,
    padding: 6,
  },

  allListContainer: {
    //borderColor: 'black',
    //borderWidth: 2,
    padding: 6,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',

  },
  titleContainer: {
    borderBottomColor: GOLDEN_ORANGE,
    borderBottomWidth: 2,
    marginBottom: 4
  }
});

export default MainScreen