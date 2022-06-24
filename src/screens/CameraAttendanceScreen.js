import React, { useState, useEffect, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import AWS from 'aws-sdk';
import config from '../util/aws-config';
import Toast from 'react-native-toast-message';
import { Buffer } from "buffer"
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { firebase } from '../util/firebase';

export default function CameraAttendanceScreen({ route, navigation }) {

  const { eventId } = route.params;
  console.log(eventId);
  // const [currentImage, setCurrentImage] = useState(null);

  AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    showModal();
    if (cameraRef) {
      const options = { quality: 0.1, base64: true, aspect: [4, 3] };
      const data = await cameraRef.current.takePictureAsync(options);
      // setCurrentImage(`data:img/jpg;base64,${data.base64}`);
      const buffer = new Buffer.from(data.base64, 'base64');

      try {
        if (eventId !== null || eventId !== undefined) {
          const rekognition = new AWS.Rekognition();
          // index faces

          const response = await rekognition.searchFacesByImage({
            CollectionId: 'ukm-attendance',
            MaxFaces: 1,
            FaceMatchThreshold: 70,
            Image: {
              Bytes: buffer
            },
          }).promise();

          if (response.FaceMatches.length > 0) {
            console.log(response);
            const detectedUserId = response.FaceMatches[0].Face.ExternalImageId;
            //get user data
            firebase.firestore().collection('Users').doc(detectedUserId).get().then((user) => {
              if (user.exists) {
                const userData = user.data();
                console.log(userData);
                // add user to event
                firebase.firestore().collection('Events').doc(eventId).collection('Attendees').doc(detectedUserId).set({
                  userId: detectedUserId,
                  email: userData.email,
                  createdAt: new Date(),
                }).then(() => {
                  Toast.show({
                    type: "success",
                    text1: 'Successful!',
                    text2: "Attendance successfully recorded",
                    duration: 3000,
                  });
                }).catch((error) => {
                  Toast.show({
                    type: "error",
                    text1: 'Uh oh!',
                    text2: "Error taking attendance",
                    duration: 3000,
                  });
                })
              }
            }).catch((error) => {
              Toast.show({
                type: "error",
                text1: 'User not registered',
                text2: "Download the app to register",
                duration: 3000,
              });
              console.log(error);
            });
          }
          hideModal();
        }
      } catch (error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Uh oh!',
          text2: 'Something went wrong!',
        });
        hideModal();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        ratio="4:3"
        type={Camera.Constants.Type.front}>
        <Toast />
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              dismissable={false}
              contentContainerStyle={containerStyle}>
              {/* <Image style={{width: 120, height: 120}} source={{uri: currentImage}} /> */}
              <Text>Recognizing...</Text>
            </Modal>
          </Portal>
        </Provider>
        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={visible} onPress={() => takePicture()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Take Attendance </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );

}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
