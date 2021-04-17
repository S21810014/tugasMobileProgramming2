//Timothy Merfry Tiwow / 105021810004, 2021

import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import TextInput from '../../atoms/TextInput'

const RegistrationInput = ({label, placeholder, value, setValue, filter, validation}) => {
    return (
        <View style={{height: 70, marginVertical: 10}}>
            <Text>{label}</Text>
            <TextInput  value={value} 
                        setValue={setValue} 
                        placeholder={placeholder}
                        filter={filter}
                        validation={validation}/>
        </View>
    )
};

export default RegistrationInput;
