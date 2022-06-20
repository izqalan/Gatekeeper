import React, {useState, useEffect, useRef} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {decode, encode} from 'base-64'
import * as Notifications from 'expo-notifications';
import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { UserContextProvider, useUser } from './src/util/userContextProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AuthScreen from './src/screens/AuthScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import CameraScreen from './src/screens/CameraScreen';
import CameraAttendanceScreen from './src/screens/CameraAttendanceScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#845ee3',
    accent: '#4C2F96',
    text: '#444444',
  },
};

function LoggedInTabs() {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: theme.colors.primary }}
      shifting="true"
    >
      <Tab.Screen
        name="To Do"
        component={MainScreen}
        options={{
          tabBarLabel: 'Face Index',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Container = () => {
  const { user } = useUser();
  return user ? <LoggedInTabs /> : <AuthScreen />
}

export default function App() {
  
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener();
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <UserContextProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={"AI Attendece"}
              component={Container}
            />
            <Stack.Screen 
              name="AttendanceScreen" 
              component={AttendanceScreen} 
              options={{
                title: 'Attendance',
                headerTintColor: '#000000',
              }}
            />
            <Stack.Screen
              name={"CameraScreen"}
              component={CameraScreen}
              options={{
                title: 'Indexing Faces',
                headerTintColor: '#000000',
              }}
            />
            <Stack.Screen
              name={"CameraAttendanceScreen"}
              component={CameraAttendanceScreen}
              options={{
                title: 'Taking Attendance',
                headerTintColor: '#000000',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserContextProvider>
  )
}
