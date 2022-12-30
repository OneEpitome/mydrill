import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "../routes/Auth";
import Home from "../routes/Home";
import SignUp from "../routes/SignUp";

const AppRouter = ({ isLoggin, userObj }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggin ? (
          <Route
            exact
            path="/"
            element={<Home isLoggin={isLoggin} userObj={userObj} />}
          ></Route>
        ) : (
          <Route exact path="/" element={<Authentication />}></Route>
        )}
        <Route exact path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
