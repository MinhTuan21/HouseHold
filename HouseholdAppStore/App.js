import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './assi/Login';
import RegisterScreen from './assi/Register';
import HomeScreen from './assi/HomeScreen';
import ProductDetailScreen from "./assi/ProductDetailScreen";
import AddProductScreen from "./assi/AddProductScreen";
import HomeTabs from './assi/HomeTab';
import PaymentScreen from "./assi/Screens/Payment"
import ForgotPasswordScreen from './assi/ForgotPassWord';
import EditProfileScreen from './assi/Screens/EditFrofile';
import ResetPasswordScreen from './assi/ResetPassWord';
import { UserProvider } from "./assi/Screens/UserContext";
import SettingsScreen from "./assi/Screens/Setting";
import MomoPaymentScreen from './assi/Screens/MomoPaymentScreen';
import BankPaymentScreen from './assi/Screens/BankPaymentScreen';
import InstallmentPaymentScreen from './assi/Screens/InstallmentPaymentScreen';
import InformationScreen from './assi/Screens/Infor';
import NotificationsScreen from './assi/Screens/Notification';
import HistoryScreen from './assi/Screens/History';



const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) setIsLoggedIn(true);
    };
    checkLogin();
  }, []);

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Tab": "Login"}>
        <Stack.Screen name="Tab" component={HomeTabs} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown:false}}/>
        <Stack.Screen name="EditFrofile" component={EditProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassWord" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassWord" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="MomoPayment" component={MomoPaymentScreen} options={{ title: "Momo Payment" }} />
        <Stack.Screen name="BankPayment" component={BankPaymentScreen} options={{ title: "Bank Payment" }} />
        <Stack.Screen name="InstallmentPayment" component={InstallmentPaymentScreen} options={{ title: "Installment" }} />
        <Stack.Screen name="Information" component={InformationScreen} options={{ title: "Informatioon" }} />
        <Stack.Screen name="Notification" component={NotificationsScreen} options={{ title: "Notification" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "purchase history" }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
