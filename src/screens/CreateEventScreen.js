import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper'
import { GlobalStyles } from "../util/constants";
import { firebase } from '../util/firebase';
import { fetchCurrentUser } from "../lib/firebase";

export default function CreateEventScreen({ navigation, route }) {

  const { user } = route.params;

  const [eventTitle, setEventTitle] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false)

  const createEvent = async (eventTitle, eventDetails) => {
    setLoading(true);

    const payload = {
      name: eventTitle,
      details: eventDetails,
      createdBy: user.uid,
      creatorName: user.email,
      createdAt: new Date(),
    }

    try {
      await firebase.firestore().collection('Events').add(payload)
        .then(() => {
          Alert.alert('Success', 'Event created successfully');
        }).catch((error) => {
          Alert.alert('Error', error.message);
        });
        setEventTitle(null);
        setEventDetails(null);
    } catch (error) {
      Alert.alert('Error', error);
    }
    setLoading(false)
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={GlobalStyles.subHeaderText}>Create an event</Text>
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Event Title"
          mode="outlined"
          onChangeText={(text) => setEventTitle(text)}
          value={eventTitle}
          placeholder="Google I/O Extended KL"
        />
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Event details"
          multiline
          mode="outlined"
          onChangeText={(text) => setEventDetails(text)}
          value={eventDetails}
          secureTextEntry={true}
          placeholder="Autoscale your team's productivity with Google Cloud Platform"
        />
      </View>
      <View style={{
        marginHorizontal: 5,
        marginTop: 10
      }}>
        <Button
          mode="contained"
          disabled={loading}
          loading={loading}
          onPress={() => createEvent(eventTitle, eventDetails)}
        >
          Create Event
        </Button>
      </View>
    </View>
  );
}