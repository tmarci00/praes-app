import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import '../global'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFonts } from 'expo-font'; 

const CustomButton = ({ onPress, text, type, icon }) => {
    const [fontsLoaded] = useFonts({
        'Roboto-Slab': require('../assets/Fonts/RobotoSlab-VariableFont_wght.ttf')
      });

    return (
        <>
            <Pressable
                style={[styles.button, styles[`button_${type}`]]}
                onPress={onPress}>
                {icon && <FontAwesomeIcon icon={icon} style={styles.icon}/>}
                {text && <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>}
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 12,
        borderRadius: 5
    },

    text: {
        fontWeight: '600',
        fontSize: 21,
        fontFamily: 'Roboto-Slab',
    },

    button_PRIMARY: {
        backgroundColor: GOLDEN_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        margin:6
    },

    text_PRIMARY: {
        color: 'white',
        fontFamily: 'Roboto-Slab',
    },

    button_SECONDARY: {
        borderColor: GOLDEN_ORANGE,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6

    },

    text_SECONDARY: {
        color: GOLDEN_ORANGE,
        fontFamily: 'Roboto-Slab',
    },

    icon:{
        color: GOLDEN_ORANGE,
    },


})

export default CustomButton