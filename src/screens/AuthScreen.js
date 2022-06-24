// noinspection JSValidateTypes
import React, { useState } from 'react'
import { View, Platform } from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalStyles } from '../util/constants';
import { registerForPushNotificationsAsync } from '../util/pushNotification';
import { firebase } from '../util/firebase';

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUpLoading, setSignUpLoading] = useState(Boolean(false))
  const [signInLoading, setSignInLoading] = useState(Boolean(false))
  const [googleSingInLoading, setGoogleSingInLoading] = useState(Boolean(false));

  const handlesMetadata = async (userId, payload) => {
    try {
      
      // update user metatdata
      await firebase.firestore().collection('Users').doc(userId).set(payload);
    } catch (error) {
      console.error('error', error);
    }
  }

  const handleLogin = async (type, email, password) => {
    // firebase login
    const token = await registerForPushNotificationsAsync(Device, Notifications, Platform);
    if (type === 'LOGIN') {
      setSignInLoading(true)
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        const payload = {
          deviceToken: token,
        }
        handlesMetadata(user.uid, payload);

      } catch (error) {
        console.error('error', error);
      }
      setSignInLoading(false);
    } else if (type === 'SIGNUP') {
      setSignUpLoading(true)
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const payload = {
          deviceToken: token,
          email: email,
          imageUploaded: false,
        }
        handlesMetadata(user.uid, payload);

        setSignUpLoading(false)
      } catch (error) {
        console.error('error', error);
      }
    }

    setSignInLoading(false)
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={GlobalStyles.headerText}>Gatekeeper</Text>
        <Text style={{ marginBottom: 15 }}>Get notify how is entering your home</Text>
        <Text style={GlobalStyles.subHeaderText}>Login or create a new account</Text>
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="george@fakeblock.com"
          left={<TextInput.Icon name="email" />}
        />
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Password"
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={[GlobalStyles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          mode="contained"
          disabled={signInLoading}
          loading={signInLoading}
          onPress={() => handleLogin('LOGIN', email, password)}
        >
          Sign in
        </Button>
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <Button
          mode="contained"
          disabled={signUpLoading}
          loading={signUpLoading}
          onPress={() => handleLogin('SIGNUP', email, password)}
        >
          Sign up
        </Button>
      </View>
      {/* <View style={[GlobalStyles.verticallySpaced]}>
        <Button
          mode="contained"
          color="#4285f4"
          disabled={googleSingInLoading}
          loading={googleSingInLoading}
          onPress={() => signInWithProvider('google')}
        >
          Sign in with Google
        </Button>
      </View> */}
    </View>
  )
}