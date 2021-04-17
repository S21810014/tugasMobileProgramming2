//Timothy Merfry Tiwow / 105021810004, 2021

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Card from '../../atoms/Card'
const chroma = require('chroma-js') //ini chroma-js sakti skali

const Header = ({firstName, lastName, backgroundColor}) => {
    return (
        <View style={[styles.header, backgroundColor]}>
            <Text style={{
                fontSize: 24, 
                paddingVertical: 20,
                //ta pake chroma-js for mo tentukan apakah itu warna termasuk
                //warna gelap? kalo misal warna gelap berarti ta pe teks mesti warna putih,
                //sebaliknya kalo dia terang berarti ta pe teks warna hitam.
                color: chroma(backgroundColor.backgroundColor).luminance() < 0.5 ? 'white' : 'black'
            }}>{lastName}, {firstName}</Text>
        </View>
    )
}

const Body = ({email}) => {
    return (
        <View style={styles.body}>
            <Text style={[styles.bodyText, {fontWeight: 'bold'}]}>
                email: 
            </Text>
            <Text style={[styles.bodyText]}>
                {email}
            </Text>
        </View>
    )
}

const UserCard = ({firstName, lastName, email, color}) => {
    const backgroundColor = {
        backgroundColor: color
    }
    
    return (
        <View style={{
            flex: 1,
            padding: 25
        }}>
            <Card>
                <View style={styles.cardContainer}>
                    <Header firstName={firstName} lastName={lastName} backgroundColor={backgroundColor}/>
                    <Body email={email}/>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 125
    },
    header: {
        justifyContent: 'center',
        paddingLeft: 15,
    },
    body: {
        flex: 1,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyText: {
        marginVertical: 5,
        marginHorizontal: 2,
    }
})

export default UserCard