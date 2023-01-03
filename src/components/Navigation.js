import { signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import Style from "../styles/NavigationStyle.module.css";

const Navigation = ({ userObj, isLoggin }) => {
  const onClick = async () => {
    try {
      await signOut(auth);
      Navigate("/");
    } catch (error) {}
  };
  return (
    <nav>
      <Link to="/" className={Style.HomeButton}>
        Home
      </Link>
      <span>
        {isLoggin ? (
          <>
            <span>안녕하세요!&nbsp;</span>
            <Link to="/profile" className={Style.HomeButton}>
              {userObj.displayName}
            </Link>
            <span>님</span>
          </>
        ) : null}
      </span>
      {isLoggin ? (
        <button onClick={onClick} className={Style.logOutButton}>
          로그아웃
        </button>
      ) : null}
    </nav>
  );
};

export default Navigation;
