# Gatekeeper
IOT project for Data Communication class project

## Pre-requisite
- [Expo go](https://expo.dev/client) mobile App
- NodeJs >= v14
- yarn (optional)

## Environment Variable
create `.env` file at root of the project folder with environment variables below

```
REACT_NATIVE_FIREBASE_API_KEY=xxxx
REACT_NATIVE_FIREBASE_AUTH_DOMAIN=xxxx
REACT_NATIVE_FIREBASE_PROJECT_ID=xxxx
REACT_NATIVE_FIREBASE_STORAGE_BUCKET=xxxx
REACT_NATIVE_FIREBASE_MESSAGING_ID=xxxx
REACT_NATIVE_FIREBASE_APP_ID=xxxx
```

## Getting Started (with Expo)
If you are using Expo Cli, clone the repo and run "expo start" in the root folder of the project:
```
git clone https://github.com/izqalan/Gatekeeper.git
cd Gatekeeper
npm install
expo start
```

## Getting Started (without Expo)
If you prefer using React Native CLI, you'll need to eject from Expo first:
```
git clone https://github.com/izqalan/Gatekeeper.git
cd Gatekeeper
expo eject
npm install
react-native run-android // react-native run-ios
```
This React Native Firebase starter ([e2c3b6098d Tree](https://github.com/izqalan/Gatekeeper/tree/e2c3b6098dffae79b3c30178458a9540bc37a786)) is built with Firebase Web SDK, which makes it compatible with both Expo CLI and React Native CLI.
