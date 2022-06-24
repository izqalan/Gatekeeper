import { firebase } from '../util/firebase';

export const fetchCurrentUser = async () => {
  // firebase currentuser
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return user;
    }
    return null;
  }).catch(error => {
    console.log('error', error);
  });
}