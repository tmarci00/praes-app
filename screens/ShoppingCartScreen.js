import { View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import React, { useEffect, useState } from 'react';
import '../global';
import { Text, Button, Surface } from '@react-native-material/core';



const ShoppingCartScreen = ({ route, navigation }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [updatedShoppingCart, setUpdatedShoppingCart] = useState(route.params.shoppingCart);



  function getTotalPrice(shoppingCart) {
    const infoArrays = shoppingCart.map(order => {
      return order[order.length - 1]
    });
    const prices = infoArrays.map(order => {
      return order[order.length - 1]
    });

    let result = 0;
    prices.forEach(price => {
      result += price;
    })
    return result;
  }

  const handleRemoveItem = (index) => {
    const newShoppingCart = [...updatedShoppingCart];
    newShoppingCart.splice(index, 1);
    setUpdatedShoppingCart(newShoppingCart);
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice(updatedShoppingCart));
  }, [updatedShoppingCart]);

  //listens to go back gesture
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      goBack();
    });
    return unsubscribe;
  });

  const handleClearCart = () => {
    navigation.setParams({ shoppingCart: [] });
  };

  const handleCheckout = () => {
    // Perform checkout actions
    navigation.setParams({ shoppingCart: [] });
  };

  const goBack = () => {
    navigation.navigate({
      name: 'Main',
      params: {
        shoppingCart: updatedShoppingCart,
        cartPrice: totalPrice,
      }
    }
    );

  }

  const handleBackPress = () => {
    goBack();
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.scroll}>
        {updatedShoppingCart.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Nincs semmi a kosarban</Text>
          </View>
        ) : (<View style={styles.mainContent}>
          {updatedShoppingCart.map((order, index) => (
            <Surface key={index} style={styles.card} elevation={6}>
              <View style={styles.imageContainer}>
                <Image source={require('../assets/AppleLookingJuices/PNTN-20220902-015_50.jpg')} resizeMode='cover' style={styles.image} />
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.itemContainer}>
                  <View style={styles.juicesContainer}>
                    <Text style={[styles.baseText, styles.title]}>Ízek: </Text>
                    {order.filter(item => typeof item === 'string').map(name => (
                      <Text style={styles.itemNameText} key={name}>-{name}</Text>
                    ))}
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={[styles.baseText, styles.title]}>Részletek: </Text>
                    {/*individual item price*/}
                    <Text style={[styles.baseText, styles.itemPriceText]}>Ár: {order[order.length - 1][2]} Ft</Text>
                    <Text style={styles.baseText}>Méret: {order[order.length - 1][1]}l</Text>
                    {order[order.length - 1][0] ? <Text style={styles.baseText}>Uveg rendelve</Text> : <></>}

                    <Text style={styles.baseText}>Név:{order[order.length - 2][0]}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.baseText}>{order[order.length - 2][1]}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.removeButtonContainer}>
                  <Button color={GOLDEN_ORANGE} title='Eltávolít' onPress={handleRemoveItem} variant={'outlined'}/>

                </View>
              </View>
            </Surface>
          ))}
        </View>)}

      </ScrollView>
      <View style={styles.footer}>
        {/* <CustomButton text={'Vissza'} type={'SECONDARY'} onPress={handleBackPress} /> */}
        <Button title='Vissza' color={GOLDEN_ORANGE} onPress={handleBackPress} />
        <Text style={[styles.baseText, styles.totalPriceText]}>Teljes ár: {totalPrice} Ft</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 6,

  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 7,
    marginBottom: 12,

    elevation: 1,
  },
  juicesContainer: {
    //borderColor: 'green',
    //borderWidth: 2,
    margin: 6,
  },
  itemNameText: {
    fontSize: 16,

  },
  infoContainer: {
    //borderColor: 'blue',
    //borderWidth: 2,

  },
  itemPriceText: {

  },
  mainContent: {
    alignItems: 'center',
    maxWidth: '100%',

  },
  footer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 6
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailText: {
    flexShrink: 1

  },
  imageContainer: {
    width: '100%',
    maxHeight: 250

  },
  image: {
    width: '100%',
    height: '100%',

  },
  baseText: {


  },
  title: {
    fontSize: 30,
  },
  bottomContainer: {
    padding: 6,
  },
  totalPriceText: {
    fontSize: 24,

  },
  scroll: {
    marginBottom: 64,

  }

});

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//   },
//   scroll: {
//     padding: 16,
//   },
//   mainContent: {
//     marginTop: 24,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     elevation: 1,
//   },
//   imageContainer: {
//     marginRight: 16,

//   },
//   image: {
//     width:86,
//     height:'100%',
//     borderRadius: 8,
//   },
//   bottomContainer: {
//     flex: 1,
//   },
//   itemContainer: {
//     marginTop: 8,
//   },
//   juicesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   itemNameText: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   infoContainer: {
//     marginTop: 8,
//   },
//   title: {
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   itemPriceText: {
//     fontWeight: 'bold',
//   },
//   baseText: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   button: {
//     marginTop: 24,
//     backgroundColor: '#2196f3',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     elevation: 1,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
// });

export default ShoppingCartScreen;



