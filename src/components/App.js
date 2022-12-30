import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggin, setIsLoggin] = useState(false);
  const [userObj, setUserObj] = useState(null);
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

  return <AppRouter isLoggin={isLoggin} userObj={userObj} />;
}

export default App;
