import React from 'react';
import {View,Text, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import AttemptedTabScreen from './Test/attempted';
import AllTabScreen from './Test/all';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
const Tab = createMaterialTopTabNavigator();



function TestsScreen() {
  return (
    <View style={{flex:1}}>
      <Header pagename="Test"/>
        <Tab.Navigator initialRouteName="ALL" 
          screenOptions={{
            tabBarActiveTintColor:colorPrimary,
            tabBarLabelStyle:{fontSize:16},
            tabBarIndicatorStyle:{backgroundColor:colorPrimary}
          }}
        >
          <Tab.Screen name="ALL" component={AllTabScreen}/>
          <Tab.Screen name="ATTEMPTED" component={AttemptedTabScreen}/>
        </Tab.Navigator>
    </View>
  );
}

export default TestsScreen;