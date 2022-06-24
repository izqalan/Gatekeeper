import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../util/constants";
import { Button, Text, List } from 'react-native-paper';
import { firebase } from "../util/firebase";

// get current user firebase
export default function AttendanceScreen({ navigation, route }) {
  const { userId } = route.params;
  const { eventId } = route.params;
  const [attendees, setAttendees] = useState(null);
  useEffect(() => {
    // fetchUser();
    fetchAttendees();
  }, []);


  const [refreshing, setRefreshing] = React.useState(false);
 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAttendees().then(() => setRefreshing(false));
  }, []);

  const fetchAttendees = async () => {
    await firebase.firestore().collection('Events').doc(eventId).collection('Attendees').get().then(snapshot => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setAttendees(data.reverse());
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
        height: '100%',
      }}>

        <Text style={{ fontSize: 12 }}>
          {eventId}
        </Text>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {attendees != null && attendees.map(attendee => (
            <List.Item
              title={attendee.email}
              description={attendee.id}
              left={props => <List.Icon {...props} icon="account" />}
            />
          ))}

        </ScrollView>
      </View>
      <Button
        mode="contained"
        style={{
          right: 20,
          left: 20,
          position: 'absolute',
          bottom: 30,
        }}
        onPress={() => navigation.navigate('CameraAttendanceScreen', { eventId: eventId})}
      >
        Take Attendance
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}
