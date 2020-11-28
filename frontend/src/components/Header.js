import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, onLogOut, email }) {
  let location = useLocation().pathname;
  const [linkLog, setLinkLog] = React.useState("/sign-in");
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    if (location === "/sign-up") {
      setLinkLog("/sign-in");
      setPosition("Войти");
    } else {
      setLinkLog("/sign-up");
      setPosition("Регистрация");
    }
  }, [location]);

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      {loggedIn ? (
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button className="header__button-logout" onClick={onLogOut}>
            Выйти
          </button>
        </div>
      ) : (
        <Link className="header__button-switch" to={linkLog}>
          {position}
        </Link>
      )}
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Header;
