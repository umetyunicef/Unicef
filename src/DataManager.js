import app from 'firebase/compat/app';
import 'firebase/compat/database';

const config = {
  apiKey: "AIzaSyB1bjWm3FV06EzaONxURAPOxcd34Fzp0W0",
  authDomain: "unicef-e6d80.firebaseapp.com",
  databaseURL: "https://unicef-e6d80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unicef-e6d80",
  storageBucket: "unicef-e6d80.appspot.com",
  messagingSenderId: "745647732927",
  appId: "1:745647732927:web:a7bde58a2d527fdae3ae0a",
  measurementId: "G-MNT48P4Z7X"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }

  async getData() {
    try {
      const ref = this.db.ref("/UNICEF");
      const data = await ref.once("value");
      console.log("data = ", data.val());
      return data.val();
    } catch (err) {
      console.log(err);
    }
  }

  async setData(sample) {
    try {
      // The app only has access as defined in the Security Rules
      const ref = this.db.ref("/UNICEF");
      const newRef = ref.push();
      await newRef.set(sample);
    } catch (err) {
      console.log("hey err", err);
      console.log(err);
    }

  }
}

export const firebase = new Firebase();
