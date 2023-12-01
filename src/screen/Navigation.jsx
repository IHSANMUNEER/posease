import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from './ChangePassword.jsx';
import ConfirmPassword from './ConfirmPassword.jsx';
import ConfirmationCodeInput from './ConfirmationCode.jsx';
import profileScreen from './ProfileScreen';
import Subscribe from './Subscribe.jsx';
import OnBoardingScreen from './OnBoardingScreen';
import Login from './Login';
import Signup from './Signup';
import colors from '../components/colors.jsx';
import Loader from '../components/Loader.jsx';
const MainStack = createStackNavigator();


const Stack1 = () => (
  <NavigationContainer>
    <MainStack.Navigator>
    <MainStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
            backgroundColor: colors.secondary,
          },
        }}
      />
      <MainStack.Screen
        name="Onboarding"
        component={OnBoardingScreen}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="profileScreen"
        component={profileScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      

      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />

      <MainStack.Screen
        name="ConfirmationCodeInput"
        component={ConfirmationCodeInput}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      <MainStack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      <MainStack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />

      <MainStack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

const Stack2 = () => (
  <NavigationContainer>
    <MainStack.Navigator>
    <MainStack.Screen
        name="profileScreen"
        component={profileScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
    <MainStack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
   
      
      <MainStack.Screen
        name="ConfirmationCodeInput"
        component={ConfirmationCodeInput}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
       <MainStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      <MainStack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      
     
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
          },
        }}
      />
      <MainStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 40,
            backgroundColor: colors.secondary,
          },
        }}
      />

      <MainStack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          headerBackTitleVisible: false
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export {Stack1, Stack2};
