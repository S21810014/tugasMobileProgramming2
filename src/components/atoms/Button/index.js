//Timothy Merfry Tiwow / 105021810004, 2021

import React, { useRef } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'

const Button = ({label, color, onPress, isDisabled}) => {
    const buttonSizeAnim = useRef(new Animated.Value(90)).current

    const ButtonClickHandler = () => {
        //jalankan depe animasi kong pangge tu handler onPress
        //kalo flag isDisabled itu false.
        if(!isDisabled)
            //ada pake Animated.sequence for mo bekeng depe bounce
            //
            //sengaja pake ini gegara ta suka mo tweak sendiri
            //tiap-tiap keyframe (ato kalo jujur, ta nintau cara
            //                    ganti depe easing jadi 'bounce').
            Animated.sequence([
                Animated.timing(buttonSizeAnim, {
                    toValue: 80,
                    duration: 50,
                    useNativeDriver: false
                }),
                Animated.timing(buttonSizeAnim, {
                    toValue: 100,
                    duration: 80,
                    useNativeDriver: false
                }),
                Animated.timing(buttonSizeAnim, {
                    toValue: 90,
                    duration: 100,
                    useNativeDriver: false
                }),
            ]).start(
                ({finished}) =>
                    finished &&     // so finish ? io
                    onPress &&      //  onPress bukang undefined ? io
                    onPress()       //   ohh gass, pangge pa onPress
            )           
    }
    
    return (
        <TouchableOpacity   style={styles.buttonContainer}
                            onPress={ButtonClickHandler}
                            //activeOpacity 1 supaya nda ada efek cahaya
                            //pas tekan tu tombol, coba tes se ilang ini
                            //props kalo suka lia depe efek.
                            activeOpacity={1}>
            <Animated.View   style={{
                        ...styles.buttonStyle,
                        width: buttonSizeAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['60%', '100%']    //kita sama skli nda sangka
                                                            //react native boleh bekeng
                                                            //hal semacam ini.
                        }),
                        height: buttonSizeAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']     //hal yang sama rupa di atas
                        }),
                        //kalo flag isDisabled itu true, ator depe warna button jadi mirip
                        //warna background mar ada ba gelap sadiki,
                        //kalo misal isDisabled false, pake warna dari props color.
                        backgroundColor: isDisabled ? 'hsla(0, 0%, 0%, 0.15)' : color
                    }}>
                <Text>{label}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    }
})

export default Button