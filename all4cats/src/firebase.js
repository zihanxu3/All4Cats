import firebase from 'firebase'
import "firebase/auth"
import "firebase/database"


var firebaseConfig = {
  apiKey: "AIzaSyBvF7AZ4KnlVxXjlWivsMlS6WjcHBfTTu4",
  authDomain: "all4cats-cs411.firebaseapp.com",
  databaseURL: "https://all4cats-cs411.firebaseio.com",
  projectId: "all4cats-cs411",
  storageBucket: "all4cats-cs411.appspot.com",
  messagingSenderId: "890772440877",
  appId: "1:890772440877:web:8b9eab9693bf19d276b5a4",
  measurementId: "G-6RBYNXCNB7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const fb = firebase.database();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, display_email) => {
  if (!user) {
    return;
  }
  const userRef = fb.ref(`users/${user.uid}`);


  var { email, displayName } = user;

  if (!displayName) {
    displayName = display_email;
  }

  try {
    await userRef.set({
      displayName,
      email,
      favorite_house: [],
    });
  } catch (error) {
    console.error("Error creating user document", error);
  }

  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  console.log("Inside getUserDoc");
  if (!uid) return null;
  try {
    const userDocument = await fb.ref(`users/${uid}`).once('value');
    console.log(userDocument.val());
    return {
      uid,
      ...userDocument.val(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const addFavoriteHouse = async (user, houseId) => {
  if (!user) {
    return;
  }
  const userRef = fb.ref(`users/${user.uid}/favoriteHouse`);
  var newFavRef = userRef.push();

  try {
    await newFavRef.set({
      houseId,
    });
  } catch (error) {
    console.error("Error adding favorite house", error);
  }

  return getUserDocument(user.uid);
};

export const addFavoriteLayoutAndType = async (user, bedrooms, bathrooms, lowerPrice, upperPrice) => {
  if (!user) {
    return;
  }
  const layOutRef = fb.ref(`users/${user.uid}/favoriteLayout`);
  const priceRef = fb.ref(`users/${user.uid}/favoritePrice`);

  try {
    await layOutRef.set({
      bedrooms,
      bathrooms,
    });

    await priceRef.set({
      lowerPrice,
      upperPrice,
    });
  } catch (error) {
    console.error("Error adding favorite layout", error);
  }

  return getUserDocument(user.uid);
};

export const deleteFavoriteHouse = async (user, houseId) => {
  if (!user) {
    return false;
  }
  var query = fb.ref(`users/${user.uid}/favoriteHouse`).orderByKey();
  try {
    await query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var pkey = childSnapshot.key; 
        var chval = childSnapshot.val();
        //check if remove this child
        if(chval.houseId == houseId){
          fb.ref(`users/${user.uid}/favoriteHouse/${pkey}`).remove();
          getUserDocument(user.uid)
          return true;
        }

      });
    });
  } catch (error) {
    console.error("Error adding favorite house", error);
  }
  return false;
};