//Timothy Merfry Tiwow / 105021810004, 2021

import axios from 'axios';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Overlay from './src/components/molecules/Overlay'
import RegistrationPage from './src/components/pages/RegistrationPage'
import UsersListPage from './src/components/pages/UsersListPage'

const App = () => {
  StatusBar.setBarStyle('dark-content')
  const shrinkTransition = useRef(new Animated.Value(0)).current    //for depe sidebar
  const shrinkTransition2 = useRef(new Animated.Value(0)).current   //for depe page preview
  
  const [shrinkState, setShrinkState] = useState(1)
  const [currPage, setCurrPage] = useState('regis')
  const [apiData, setApiData] = useState([])

  const fetchApiData = () => {
    axios.get('http://10.0.2.2:3000/users').then(({data}) => setApiData(data))
  }

  const postToApi = data => {
    axios.post('http://10.0.2.2:3000/users', data).then(() => fetchApiData())
  }

  const menuOptions = [
    {
      label: 'Registration',
      onPress: () => setCurrPage('regis')
    },
    {
      label: 'Users List',
      onPress: () => setCurrPage('ulist')
    },
  ]

  const pages = {
    'regis' : <RegistrationPage postToApi={postToApi}/>,
    'ulist' : <UsersListPage fetchApiData={fetchApiData} apiData={apiData}/>
  }

  const shrinkToggleHandler = () => {
    if(shrinkState != 0) {
      Animated.timing(shrinkTransition2, {
        toValue: 1.0,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(shrinkTransition, {
        toValue: 1.0,
        duration: 500,
        useNativeDriver: true
      }).start(({finished}) => finished && setShrinkState(0))
    } else if (shrinkState != 1) {
      Animated.timing(shrinkTransition2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(shrinkTransition, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(({finished}) => finished && setShrinkState(1))
    }
  }

  const shrinkTransform = {
    transform:[
      {translateX: shrinkTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width/5.5, 0]
      })}, 
      {translateY: shrinkTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width/7.5, 0]
      })},
      {scale: shrinkTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 1.0]
      })}
    ],
    height: '100%',
  }
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor='transparent'/>
      <Animated.View style={shrinkTransform}>
        <Animated.View style={{
          borderRadius: shrinkTransition2.interpolate({
            inputRange: [0, 1],
            outputRange: [25, 0]
          }),
          flex: 1,
          elevation: shrinkTransition2.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 0]
          }),
          backgroundColor: shrinkTransition2.interpolate({
            inputRange: [0, 1],
            outputRange: ['hsla(0, 0%, 100%, 1.0)', 'hsla(0, 0%, 100%, 0.0)']
          }),
          overflow: 'hidden'
          }}>
        {
          pages[currPage]
        }
        </Animated.View>
      </Animated.View>
      <Overlay  menuOptions={menuOptions} 
                shrinkState={shrinkState} 
                setShrinkState={setShrinkState}
                shrinkTransition={shrinkTransition}
                shrinkToggleHandler={shrinkToggleHandler}/>
    </SafeAreaView>
  );
};


export default App;
