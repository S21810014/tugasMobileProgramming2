//Timothy Merfry Tiwow / 105021810004, 2021

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../../atoms/Button'
import Card from '../../atoms/Card'
import RegistrationInput from '../../molecules/RegistrationInput'
import * as uuid from 'react-native-uuid'

const RegistrationPage = ({postToApi}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const inputs = [
        {
            value: firstName,
            setValue: setFirstName,
            label: 'First Name',
            filter: text => text.replace(/\d/g, ''),
            validation: text => text.length > 0 ? '' : 'Input tidak boleh kosong',
            placeholder: 'Masukkan nama depan anda'
        },
        {
            value: lastName,
            setValue: setLastName,
            label: 'Last Name',
            filter: text => text.replace(/\d/g, ''),
            validation: text => text.length > 0 ? '' : 'Input tidak boleh kosong',
            placeholder: 'Masukkan nama belakang anda'
        },
        {
            value: email,
            setValue: setEmail,
            label: 'E-mail',
            validation: text => text.length > 0 ? '' : 'Input tidak boleh kosong',
            placeholder: 'Masukkan email anda'
        },
    ]

    const registerButtonHandler = () => {
        postToApi({
            id: uuid.default.v4(),
            firstName: firstName,
            lastName: lastName,
            email: email
        })
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{fontSize: 32}}>Registration</Text>
            </View>
            <View style={styles.body}>
                <Card fullFlex={1}>
                    <View style={{padding: 10}}>
                        {
                            inputs.map((el, idx) =>
                                <RegistrationInput  key={idx}
                                                    value={el.value} 
                                                    setValue={el.setValue} 
                                                    placeholder={el.placeholder}
                                                    label={el.label}
                                                    filter={el.filter}
                                                    validation={el.validation}
                                />
                            )
                        }
                        <View style={{height: 50, marginVertical: 30}}>
                            <Button label='Register' color='orange' onPress={registerButtonHandler}/>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 100, 
        justifyContent: 'center',
        paddingLeft: 80
    },
    body: {
        flex: 1,
        marginBottom: -50,
        padding: 5,
    }
})

export default RegistrationPage;
