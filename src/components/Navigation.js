import "../styles/NavigationStyle.module.css";

const Navigation = ({ userObj, isLoggin }) => {
  return (
    <nav>
      <span>
        {isLoggin ? "안녕하세요! " + userObj.displayName + "님" : null}
      </span>
    </nav>
  );
};

export default Navigation;
