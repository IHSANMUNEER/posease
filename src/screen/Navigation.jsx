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


import Table1 from './Table.jsx';
import Settings from './Settings.jsx';
import Notification from './Notification.jsx';
import CreditCardInputScreen from './Payment.jsx';

const MainStack = createStackNavigator();

const Stack1 = () => (
  <NavigationContainer>
    <MainStack.Navigator>
     
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
          headerShown: true,
          headerBackTitleVisible: true,
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
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
        }}
      />

      <MainStack.Screen
        name="Table1"
        component={Table1}
        options={{headerShown: true,
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
);

const Stack2 = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      
   
       
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
        options={{headerShown: true,
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />

      <MainStack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          headerBackTitleVisible: true,
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
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
    
        }}
      />

      <MainStack.Screen
        name="Table1"
        component={Table1}
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="test"
        component={test}
        options={{headerShown: true,
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
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}
        }
      />
       <MainStack.Screen
        name="Support"
        component={Support}
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
       <MainStack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.secondary, 
          }}}
      />
       <MainStack.Screen
        name="Report"
        component={Report}
        options={{headerShown: true,
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
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }}}
      />
      <MainStack.Screen
        name="DoctorDetail"
        component={DoctorDetail}
        options={{headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#eeeeee', 
          }
          
          }}
      />
      <MainStack.Screen
        name="NotiDetail"
        component={NotiDetail}
        options={{headerShown: true,
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
    </MainStack.Navigator>
  </NavigationContainer>
);

export {Stack1, Stack2};
