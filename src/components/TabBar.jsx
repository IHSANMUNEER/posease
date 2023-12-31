import React, {useEffect} from 'react';
import {
  createBottomTabNavigator,
  tabBarOptions,
  tabBarLabelStyle
} from '@react-navigation/bottom-tabs';
import Profile from '../screen/ProfileScreen';
import Subscribe from '../screen/Subscribe';
import Setting from '../screen/Settings'
import Home from '../screen/Userdashboard';
import Records from '../screen/Table'
import Notification from '../screen/Notification'

import test from '../screen/test'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();



const TabNavigator = () => {
    useEffect(()=>{},)
    console.log('TabBar')
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Userdashboard"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (rn === 'Notification') {
            iconName = focused ? 'bell' : 'bell';
          } else if(rn === 'Setting'){
            iconName = focused ? 'cog' : 'cog';
          }else if(rn === 'Home'){
            iconName = focused ? 'home' : 'home';
          }else if(rn === 'Records'){
            iconName = focused ? 'file-alt' : 'file-alt';
          }
          
          return <Icon name={iconName} size={21} color={color} />;
        },
        tabBarActiveTintColor: '#404040',
        tabBarInactiveTintColor: '#B9BCBE',
        tabBarStyle: { backgroundColor: '#2E7A87',marginBottom: 0, height: 65 , marginHorizontal: 0 , borderRadius : 0 },
        tabBarLabelStyle: { marginBottom: 15 },
        tabBarIconStyle: { marginBottom: -5 }
      })}>
       <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Records"
        component={Records}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
     
      
     
    </Tab.Navigator>
  );

  // return (
  //   <NavigationContainer  style={{ backgroundColor: 'red' }}>
  //     <TabNavigator  />
  //   </NavigationContainer>
  // );
};

export default TabNavigator;
