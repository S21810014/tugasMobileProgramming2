//Timothy Merfry Tiwow / 105021810004, 2021

import React, { useRef, useState } from 'react'
import { View, TextInput as Input, StyleSheet, Animated } from 'react-native'

const TextInput = ({placeholder, value, setValue, validation, filter}) => {
    const [isValid, setIsValid] = useState('')
    const fontSizeAnim = useRef(new Animated.Value(0)).current
    const [fontSizeAnimState, setFontSizeAnimState] = useState(0)

    const onChangeHandler = ({nativeEvent: {text: e}}) => { //object destructuring
                                                            //set nativeEvent.text
                                                            //menjadi 'e'
        if(validation == undefined)     //kalo nda ada fungsi validasi.
            validation = e => ''        //ganti jadi fungsi yang return string kosong.
        if(filter == undefined)         //kalo nda ada fungsi filter
            filter = e => e             //ganti jadi fungsi yang return ulang tu string.
        setIsValid(validation(e))       //fungsi validasi return string berisi kalo
                                        //ada error.
                                        //return string kosong kalo nda ada error.
        const filteredText = filter(e)  //filter isi dari input pake tu fungsi yang
                                        //da passing lewat props.
        setValue(filteredText)
    }

    if(!isValid && fontSizeAnimState != 1) {        //kalo variabel isValid kosong, berarti
                                                    //nda ada error, maka jalankan animasi
                                                    //mo se sembunyi tu teks error sampe kelar
                                                    //kong simpan depe state.
        Animated.timing(fontSizeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
        setFontSizeAnimState(1)
    } else if (isValid && fontSizeAnimState != 0) { //kalo variabel isValid nda kosong,
                                                    //berarti ada error, maka jalankan
                                                    //animasi mo se muncul tu teks error
                                                    //sampe kelar, kong simpan depe state.
        Animated.timing(fontSizeAnim, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: false
        }).start()
        setFontSizeAnimState(0)
    }

    const textInputBorderColor = isValid ? {borderColor: 'red'} : {}    //set jadi warna merah
                                                                        //kalo ada error
                                                                        //validasi.
    const textInputStyles = {
        ...styles.inputField,
        ...textInputBorderColor
    }

    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={{fontSize: fontSizeAnim}}>
                {isValid}
            </Animated.Text>
            <Input  style={textInputStyles}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        flex: 1
    },
    inputField: {
        flex: 1,
        borderColor: '#999999',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical:5,
    },
})

export default TextInput