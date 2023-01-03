import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth } from "../firebase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";

function App() {
  const [isLoggin, setIsLoggin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const refreshUser = async () => {
    await updateCurrentUser(auth, auth.currentUser);
    setUserObj(auth.currentUser);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggin(true); // user is signed in
        setUserObj(user);
      } else {
        setIsLoggin(false); // User is sign out
        setUserObj(null);
      }
    });
  }, []);

  return (
    <AppRouter
      refreshUser={refreshUser}
      isLoggin={isLoggin}
      userObj={userObj}
    />
  );
}

export default App;
