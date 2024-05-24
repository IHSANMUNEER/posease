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
import Userdashboard from './Userdashboard.jsx';
import test from './test.js';
import Tabs from '../components/TabBar.jsx';
import Results from './ShowResults.jsx';
import EditProfile from './EditProfile.jsx';
import Privacy from './Privacy.jsx';
import Support from './HelpSupport.jsx';
import Terms from './TermsAndConditions.jsx';
import Report from './ReportProblem.jsx';
import PaymentSuccess from './PaymentSuccess.jsx';
import TipsDetail from './TipsDetail.jsx';
import DoctorDetail from '../components/DoctorDetail.jsx';
import NotiDetail from '../components/NotificationDtails.jsx';
import ChatScreen from './Chat.jsx';
import Records from './Records.jsx';
import ChatBot from './ChatBot.js';
import testing from './testing.js'
import Quiz from './Quiz.jsx';
import AllDoctors from '../components/AllDoctors.jsx';
import Table1 from './Table.jsx';
import Settings from './Settings.jsx';
import Notification from './Notification.jsx';
import CreditCardInputScreen from './Payment.jsx';
import MyComponent from '../components/test.jsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DoctorRegistration from "../components/doctoradd.jsx"

import { GlobalProvider } from '../components/GlobalContext.js';

import VideoPlayer from '../components/Video.jsx';
import LogOut from '../components/ConfirmLogOut.jsx';

const MainStack = createStackNavigator();




const Stack1 = () => (
  
 <GlobalProvider>
  <NavigationContainer>
    <MainStack.Navigator>
   
      {console.log('in stack 1')}
    <MainStack.Screen
        name="Onboarding"
        component={OnBoardingScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="Userdashboard"
        component={Userdashboard}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 50,
            backgroundColor: colors.primary,
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
        name="profileScreen"
        component={profileScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
        }}
      />
      <MainStack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
    
      />

      <MainStack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
        }}
      />

      <MainStack.Screen
        name="Table1"
        component={Table1}
        options={{headerShown: false,
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />

      <MainStack.Screen
        name="test"
        component={test}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  </NavigationContainer>
  </GlobalProvider>
);

const Stack2 = () => (
  <GlobalProvider>
  <NavigationContainer>
  {console.log('in stack 2')}
    <MainStack.Navigator>

    {/* <MainStack.Screen
        name="Results"
        component={Results}
         options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
   
      /> */}
    
    {/* <MainStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 50,
            backgroundColor: colors.primary,
            elevation: 100,
          },
        }}
      /> */}
   
    
      <MainStack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />

      
      <MainStack.Screen
        name="Userdashboard"
        component={Userdashboard}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            height: 50,
            backgroundColor: colors.primary,
            elevation: 100,
          },
        }}
      />

      <MainStack.Screen
        name="profileScreen"
        component={profileScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false,
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
       <MainStack.Screen
        name="LogOut"
        component={LogOut}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle:'',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
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
            backgroundColor: '#eeeeee', 
          }
        }}
      />

      <MainStack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
       <MainStack.Screen
        name="CreditCardInputScreen"
        component={CreditCardInputScreen}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
    
        }}
      />

      <MainStack.Screen
        name="Table1"
        component={Table1}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="test"
        component={test}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
      <MainStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      
    <MainStack.Screen
        name="Results"
        component={Results}
         options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
   
      />
    <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
    
      />
        <MainStack.Screen
          name="Privacy"
        component={Privacy}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}
        }
      />
       <MainStack.Screen
        name="Support"
        component={Support}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
       <MainStack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
       <MainStack.Screen
        name="Report"
        component={Report}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
      <MainStack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
    
      />
      <MainStack.Screen
        name="TipsDetail"
        component={TipsDetail}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="DoctorDetail"
        component={DoctorDetail}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
          
          }}
      />
      <MainStack.Screen
        name="NotiDetail"
        component={NotiDetail}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
       <MainStack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.primary, 
           
          }}}
      />
       <MainStack.Screen
        name="Quiz"
        component={Quiz}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.primary, 
           
          }}}
      />
      <MainStack.Screen
        name="Records"
        component={Records}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      
      <MainStack.Screen
        name="AllDoctors"
        component={AllDoctors}
        options={{headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
    </MainStack.Navigator>
  </NavigationContainer>
  </GlobalProvider>
);

export {Stack1, Stack2};
