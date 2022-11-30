import { View, StyleSheet, TextInput, Text } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

const CustomInput = ({ control, name, placeholder, type, secureTextEntry, rules = {} }) => {
  return (

    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, styles[`container_${type}`]]}>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[styles.input, styles[`input_${type}`], { borderColor: error ? 'red' : GOLDEN_ORANGE }]}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={{color: 'red' , alignSelf:'center'}}>{error.message || 'Error'}</Text>}
        </>
      )}
    />

  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: GOLDEN_ORANGE,
    borderWidth: .5,
    borderRadius: 3,
    padding: 6,
    width: '80%',
    height: '100%'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,

  },

  container_LOGIN: {
    width: '90%',
    height: '10%',
    justifyContent: 'center'
  },

  input_LOGIN: {
  },
})

export default CustomInput