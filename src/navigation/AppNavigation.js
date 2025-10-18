import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilterThro from '../screens/FilterThro';
import JoinUs from '../screens/signup/JoinUs';
import OTPVerify from '../screens/OTPVerify';
import SignIn from '../screens/SignIn';
import Splash from '../screens/Splash';
import BottomNavHost from './bottomNav/BottomNavHost';
import CreateThroComplete from './bottomNav/createThro/CreateThroComplete';
import WhatAThro from './bottomNav/createThro/WhatAThro';
import Dashboard from './bottomNav/Dashboard';
import PersonalDetails from '../screens/signup/PersonalDetails';
import ProfileSetup from '../screens/signup/ProfileSetup';
import ChooseInterests from '../screens/signup/ChooseInterests';
import ThroDetails from '../screens/ThroDetails';
import {
  ROUTE_BOTTOM_NAVIGATION_HOST,
  ROUTE_CHOOSE_INTERESTS,
  ROUTE_CREATE_THRO_COMPLETE,
  ROUTE_DASHBOARD,
  ROUTE_FILTER_THRO,
  ROUTE_GROUP_CHAT,
  ROUTE_JOIN_US,
  ROUTE_PERSONAL_DETAILS,
  ROUTE_PROFILE_SETUP,
  ROUTE_SIGN_IN,
  ROUTE_SPLASH,
  ROUTE_THRO_DETAILS,
  ROUTE_VERIFY_OTP,
  ROUTE_WEBVIEW,
  ROUTE_WHAT_A_THRO,
} from '../utils/Constants';
import WebViewPage from '../screens/WebviewScreen';
import WebViewScreen from '../screens/WebviewScreen';
import GroupChatScreen from './bottomNav/ChatScreen';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1, marginTop: 0}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTE_SPLASH}
          screenOptions={{gestureDirection: 'horizontal'}}>
          <Stack.Screen
            name={ROUTE_SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_JOIN_US}
            component={JoinUs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_VERIFY_OTP}
            component={OTPVerify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_SIGN_IN}
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_PERSONAL_DETAILS}
            component={PersonalDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_PROFILE_SETUP}
            component={ProfileSetup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_CHOOSE_INTERESTS}
            component={ChooseInterests}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_DASHBOARD}
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_THRO_DETAILS}
            component={ThroDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_FILTER_THRO}
            component={FilterThro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_BOTTOM_NAVIGATION_HOST}
            component={BottomNavHost}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={ROUTE_CREATE_THRO_COMPLETE}
            component={CreateThroComplete}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={ROUTE_WHAT_A_THRO}
            component={WhatAThro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_WEBVIEW}
            component={WebViewScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name={ROUTE_GROUP_CHAT}
            component={GroupChatScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigation;
