//Timothy Merfry Tiwow / 105021810004, 2021

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const chroma = require('chroma-js')
const srand = require('seedrandom')

import UserCard from '../../molecules/UserCard'
import Button from '../../atoms/Button'

const UsersListPage = ({fetchApiData, apiData}) => {
    const rng = srand('nintauApa'); //random number generator mar pake seed yang konstan
                                    //jadi tiap kali dia ba generate, selalu depe rangkaian
                                    //angka itu sama.
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <View>
                    <Text style={{fontSize: 32}}>Users List</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 25, paddingLeft: 25, paddingRight: 25}}>
                    <Button label='Refresh List' 
                            color={chroma('white').darken().hex()}
                            onPress={fetchApiData}/>
                </View>
            </View>
            <ScrollView>
                {
                    apiData.map(el =>
                        <UserCard   key={el.id} 
                                    firstName={el.firstName} 
                                    lastName={el.lastName} 
                                    email={el.email} 
                                    color={chroma(parseInt(rng() * 255), parseInt(rng() * 255), parseInt(rng() * 255)).hex()}/>
                    )
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 100, 
        alignItems: 'center',
        paddingLeft: 80,
        flexDirection: 'row'
    },
})

export default UsersListPage;
