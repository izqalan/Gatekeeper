import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../util/constants";
import { Button, Text } from 'react-native-paper';

// get current user firebase
export default function MainScreen({ navigation }) {
  useEffect(() => {
    // fetchUser();
  }, []);
  const [user, setUser] = useState('Loading...');


  // const fetchUser = async () => {
  //   const user = await firebase.auth().currentUser;
  //   console.log('user', user);
  //   return user;
  // }

  return (
    <View style={GlobalStyles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginBottom: 20
      }}>
        {/* {!user.firstname && <Text style={GlobalStyles.headerText}>Hello</Text>}
        {user.firstname && <Text style={GlobalStyles.headerText}>Hello, {user.firstname}</Text>} */}
        <Text style={GlobalStyles.headerText}>Hello, test user</Text>
      </View>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 5,
      }}>

        <Text style={{ fontSize: 12 }}>
          Main screen
        </Text>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}
