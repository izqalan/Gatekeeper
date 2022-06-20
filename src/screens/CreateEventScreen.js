import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper'
import { GlobalStyles } from "../util/constants";
import { firebase } from '../util/firebase';
import { fetchCurrentUser } from "../lib/firebase";

export default function CreateEventScreen({ navigation, route }) {
  
  const { user } = route.params;

  const createEvent = async (payload) => {
    try {
      await firebase.firestore().collection('Events').add(payload);

    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <View style={GlobalStyles.container}>
      
    </View>
  );
}