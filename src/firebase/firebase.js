import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import fireBaseConfig from './config';

/* 
  Initializes firebase authentication and firestore db in a class.  
  Class also contains methods that contain firebase user auth functionality 
  Entire class is exported and made available to the app via react context
*/

class Firebase {
  constructor() {
    app.initializeApp(fireBaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password, additionalData) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const userRef = this.db.doc(`users/${user.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName: name,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error creating user', error.message);
      }
    }
    return user.updateProfile({
      displayName: name,
    });
  }

  async login(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async createNewWatchList(newList, userId) {
    await this.db.doc(`users/${userId}`).collection('lists').add(newList);
  }

  async editWatchList(list, userId) {
    const listRef = this.db
      .doc(`users/${userId}`)
      .collection('lists')
      .doc(list.id);

    await listRef.get().then((doc) => {
      if (doc.exists) {
        listRef.update(list);
      }
    });
  }

  async getMoviesInWatchList(userId, listId, snapshot) {
    return this.db
      .doc(`users/${userId}`)
      .collection('lists')
      .doc(`/${listId}`)
      .collection('movies')
      .onSnapshot(snapshot);
  }
}

const firebase = new Firebase();

export default firebase;
