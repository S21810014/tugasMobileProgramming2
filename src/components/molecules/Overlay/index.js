//Timothy Merfry Tiwow / 105021810004, 2021

import React from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../../atoms/Button'

const Overlay = ({menuOptions, shrinkTransition, shrinkToggleHandler}) => {
  StatusBar.setBarStyle('dark-content')

  //styling for sidebar yang baba sorong ka kiri ka kanan
  const slideTransform = {
    transform: [
      {translateX: shrinkTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -150]
      })}
    ]
  }

  return (
    <View style={styles.overlay} pointerEvents='box-none'>
        <Animated.View style={[styles.sidebar,slideTransform]}>
            {
            menuOptions.map((el, idx) =>
                <View key={idx} style={{height: 50}}>
                <Button label={el.label} color='#eee' onPress={el.onPress}/>
                </View>
            )
            }
        </Animated.View>
        <TouchableOpacity style={styles.actionButton}
                            onPressIn={() => shrinkToggleHandler()}>
            <Text style={{fontSize: 24}}>Ξ</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    width: 130,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 0%, 0.05)',
    margin: 5,
    borderRadius: 25
  },
  actionButton: {
    transform: [
      {translateX: 15},
      {translateY: 25},
    ],
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'white',
    elevation: 8
  },
  sidebar: {
    position: 'absolute', 
    backgroundColor: 'white',
    elevation: 5, 
    height: Dimensions.get('window').height,
    paddingTop: 100,
    width: 130
  },
  overlay: {
    position: 'absolute', 
    width: 200, 
    height: Dimensions.get('window').height
  }
})

export default Overlay;
