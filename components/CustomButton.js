import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import '../global'

const CustomButton = ({ onPress, text, type }) => {
    return (
        <View>
            <Pressable
                style={[styles.button, styles[`button_${type}`]]}
                onPress={onPress}>
                <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 12,
        borderRadius: 5
    },

    text: {
        fontWeight: '600',
        fontSize: 21
    },

    button_PRIMARY: {
        backgroundColor: GOLDEN_ORANGE,
    },

    text_PRIMARY: {

    },

    button_SECONDARY: {
        borderColor: GOLDEN_ORANGE,
        borderWidth: 2,
    },

    text_SECONDARY: {
        color: GOLDEN_ORANGE,
    }


})

export default CustomButton