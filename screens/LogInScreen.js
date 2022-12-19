import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import '../global'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Button, Text } from '@react-native-material/core'

const LogInScreen = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [code, setCode] = useState('');
    const navigation = useNavigation();


    function onLogInPress(data) {
        //authenticate!!
        navigation.navigate('Main');
    }

    function onCodeChange(value) {
        setCode(value);
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={'padding'}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/Logos/Pras_png.png')}/>
            </View>
            <View style={styles.interactiveContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Kérem adja meg a belépő kódját!</Text>
                </View>
                <View style={styles.controlsContainer}>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            control={control}
                            name='code'
                            placeholder={'Belépő kód'}
                            type={'LOGIN'}
                            rules={{ required: 'A kód megadása kötelező' }} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button color={GOLDEN_ORANGE} title={'Belépés'} onPress={handleSubmit(onLogInPress)}/>
                        {/* <CustomButton text={'Belépés'} type={'PRIMARY'} onPress={handleSubmit(onLogInPress)} /> */}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
        padding: 12
        //borderColor: 'red',
       // borderWidth: 1
    },
    title: {
        fontWeight: '600',
        fontSize: 32,

    },
    titleContainer: {
        borderBottomColor: GREY,
        borderBottomWidth: 1,
        padding: 6,
        margin: 6,
       // borderColor: 'blue',
      //  borderWidth: 1
    },
    controlsContainer: {
       // borderColor: 'green',
        //borderWidth: 1,
        width: '100%',
        padding: 6
    },
    buttonContainer: {

    },
    inputContainer: {

    },
    logoContainer:{
        alignItems:'center',
       // borderColor: 'orange',
        //borderWidth:1,
        flex: 4

    },
    logo:{
        maxWidth:'100%',
        maxHeight: '100%',

    },
    interactiveContainer:{
        flex:3
    },
})

export default LogInScreen