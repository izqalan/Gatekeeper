export const FIREBASE_API_KEY = process.env.REACT_NATIVE_FIREBASE_API_KEY || ''
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_NATIVE_FIREBASE_AUTH_DOMAIN || ''
export const FIREBASE_PROJECT_ID = process.env.REACT_NATIVE_FIREBASE_PROJECT_ID || ''
export const FIREBASE_STORAGE_BUCKET = process.env.REACT_NATIVE_FIREBASE_STORAGE_BUCKET || ''
export const FIREBASE_MESSAGING_ID = process.env.REACT_NATIVE_FIREBASE_MESSAGING_ID || ''
export const FIREBASE_APP_ID = process.env.REACT_NATIVE_FIREBASE_APP_ID || ''

export const Styles = {
  fontNormal: 20,
  fontMedium: 28,
  fontLarge: 34,
  fontExtraLarge: 40,
  colorPrimary: 'black',
  spacing: 12,
}

export const GlobalStyles = {
  container: {
    // marginTop: 15,
    padding: Styles.spacing,
    backgroundColor: 'white',
    height: '100%'
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Helvetica",
    marginTop: 24,
    marginBottom: 10,
    fontWeight: "600"
  },
  subHeaderText: {
    fontSize: 18,
    fontFamily: "Helvetica",
    marginTop: 10,
    marginBottom: 10
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    marginHorizontal: 5
  }
}