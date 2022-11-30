import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import '../global'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'

const LogInScreen = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [code, setCode] = useState('');
    const navigation = useNavigation();


    function onLogInPress(data) {
        //authenticate!!
        console.log(data);
        navigation.navigate('Main');
    }

    function onCodeChange(value) {
        setCode(value);
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Kérem adja meg a belépő kódját!</Text>
            </View>
            <CustomInput
                control={control}
                name='code'
                placeholder={'Belépő kód'}
                type={'LOGIN'} 
                rules={{required: 'A kód megadása kötelező'}}/>

            <CustomButton text={'Belépés'} type={'PRIMARY'} onPress={handleSubmit(onLogInPress)} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: '600',
        fontSize: 20,

    },
    titleContainer: {
        borderBottomColor: GREY,
        borderBottomWidth: 1,
        padding: 6,
        marginBottom: 6
    }
})

export default LogInScreen