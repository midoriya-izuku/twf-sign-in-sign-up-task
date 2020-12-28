import React, { useContext, useState, useEffect } from "react";
import app, { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function addUser(name, email, userObj) {
    app
      .database()
      .ref("users")
      .child(userObj.user.uid)
      .set({ email: email, name: name })
      .then(() => {
        setCurrentUser({ ...currentUser, name: name, email: email });
      });
  }

  function getUserDetails() {
    if (currentUser && currentUser.uid) {
      app
        .database()
        .ref("users")
        .child(currentUser.uid)
        .once("value")
        .then((snapshot) => {
          var name = snapshot.val() && snapshot.val().name;
          setCurrentUser({ ...currentUser, name: name });
        });
    }
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    addUser,
    signin,
    signup,
    logout,
    resetPassword,
    getUserDetails,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
