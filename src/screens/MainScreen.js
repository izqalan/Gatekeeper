import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../util/constants";
import { Button, Text, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { firebase } from "../util/firebase";

// get current user firebase
export default function MainScreen({ navigation }) {
  const [events, setEvents] = useState(null);
  const [fabState, setFabState] = useState({ open: false });
  const [user, setUser] = useState(null);

  const onStateChange = ({ open }) => setFabState({ open });
  const { open } = fabState;

  useEffect(() => {
    // fetchUser();
    fetchEvents();
    fetchCurrentUser();
  }, []);
 


  // const fetchUser = async () => {
  //   const user = await firebase.auth().currentUser;
  //   console.log('user', user);
  //   return user;
  // }

  const fetchCurrentUser = async () => {
    // firebase currentuser
    console.log('fetchCurrentUser');
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser('No user logged in');
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  const fetchEvents = async () => {
    const events = await firebase.firestore().collection('Events').get().then(snapshot => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setEvents(data);
    }).catch(error => {
      console.log('error', error);
    });
  }

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
      </View>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 5,
      }}>

        <Button
          mode="contained"
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate('CameraScreen', { userId: user.uid })}>
          Upload selfie
        </Button>

        <ScrollView>
          {events !== null && events.map(event => (
            <Card key={event.id} style={{ marginVertical: 5, borderColor: '#4C2F96', borderWidth: 1 }}
              onPress={() => navigation.navigate('AttendanceScreen', { eventId: event.id, user: user })}>
              <Card.Title title={event.name} />
              <Card.Content>
                <Paragraph>{event.details}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

      </View>
      <FAB.Group
        open={open}
        icon={open ? 'plus' : 'calendar-today'}
        c
        actions={[
          { 
            icon: 'calendar', 
            label: 'Create Event',
            color: '#4C2F96',
            labelTextColor: '#4C2F96',
            onPress: () => navigation.navigate('CreateEventScreen', { user: user }) 
          }
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
