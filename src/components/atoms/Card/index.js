//Timothy Merfry Tiwow / 105021810004, 2021

import React from 'react'
import { View } from 'react-native'

const Card = ({children, backgroundColor, borderRadius, elevation, fullFlex, opacity}) => {
    return (
        <View style={{
            opacity: opacity != undefined ? opacity : 1,
            flex: fullFlex != undefined ? 1 : null,
            backgroundColor: backgroundColor != undefined ? backgroundColor : 'white',
            overflow: 'hidden',
            borderRadius: borderRadius != undefined ? borderRadius : 25,
            elevation: elevation != undefined ? elevation : 8,
        }}>
            {children}
        </View>
    )
}

export default Card